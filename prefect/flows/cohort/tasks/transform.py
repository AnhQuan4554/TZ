import json
from prefect import task, get_run_logger
from utils.platform import PlatformJob, get_raw_data
from utils.iso_datetime import TimeSpec


def transform_channel(channel_value, index, src_hash, time_spec: TimeSpec, job: PlatformJob):
    return {
        "meterKey": job.meter.key,
        "interval": job.meter.interval,
        "metricName": 'eRealPositiveKwh',
        "metricValue": channel_value,
        "isoDateTime": time_spec.start_ts_iso_string,
        "isoDateTimeHour": time_spec.start_hour_iso_string,
        "isoDateTimeDay": time_spec.start_day_iso_string,
        "isoDateTimeWeek": time_spec.start_week_iso_string,
        "isoDateTimeMonth": time_spec.start_month_iso_string,
        "sourceHash": src_hash,
        "tags": [f"{index}@{job.meter.key}"],
    }


def transform_wattwatchers_data(reading_data, src_hash, time_spec: TimeSpec, job: PlatformJob):
    channels = reading_data.get('eRealPositiveKwh', [])

    return [transform_channel(channel_value, index, src_hash, time_spec, job)
            for index, channel_value in enumerate(channels)]


def transform_carbon(transformed_energy_data, carbon_factor):
    energy_value = transformed_energy_data.get('metricValue', 0)
    return dict(
        transformed_energy_data,
        metricName='officialCarbon',
        metricValue=energy_value * carbon_factor
    )


def transform_solcast_data(reading_data, src_hash, time_spec: TimeSpec, job: PlatformJob):
    pv_estimate = reading_data.get('pv_estimate', 0)
    value = pv_estimate * 1000 * (time_spec.interval_seconds / 3600)

    generation = {
        "meterKey": job.meter.key,
        "interval": job.meter.interval,
        "metricName": 'generation',
        "metricValue": value,
        "isoDateTime": time_spec.start_ts_iso_string,
        "isoDateTimeHour": time_spec.start_hour_iso_string,
        "isoDateTimeDay": time_spec.start_day_iso_string,
        "isoDateTimeWeek": time_spec.start_week_iso_string,
        "isoDateTimeMonth": time_spec.start_month_iso_string,
        "tags": [job.meter.data_source],
        "sourceHash": src_hash,
    }

    if job.meter.carbon_factor > 0:
        carbon = {**generation,
                  "metricName": 'officialCarbon',
                  "metricValue": value * job.meter.carbon_factor,
                  }

        return [generation, carbon]

    else:
        return [generation]


@task(retries=3, retry_delay_seconds=30)
async def transform(time_spec: TimeSpec, job: PlatformJob):
    logger = get_run_logger()
    logger.info("Transforming raw data")
    content = await get_raw_data(
        'raw',
        time_spec.start_ts_iso_string,
        job.meter.key,
        job.meter.interval
    )

    raw_data = json.loads(content)

    src_hash = raw_data.get('hash')
    reading_data = raw_data.get('data', [])

    if src_hash is None:
        raise Exception('Falied loading raw data for transformation')

    result = []

    if job.meter.meter_type == 'wattwatchers':

        logger.info("Transforming Wattwatchers raw data")
        transformed_energy_data = [transform_wattwatchers_data(
            reading, src_hash, time_spec, job) for reading in reading_data]

        flatten_transformed_energy_data = [
            item for sublist in transformed_energy_data for item in sublist]

        logger.info("Calculating carbon metrics")
        carbon_data = [transform_carbon(energy_data, job.meter.carbon_factor)
                       for energy_data in flatten_transformed_energy_data]

        result = [*flatten_transformed_energy_data, *carbon_data]

    if job.meter.meter_type == 'solcast':
        logger.info("Transforming Solcast raw data")
        data = reading_data.get('estimated_actuals', [])
        matched_data = [
            reading for reading in data if time_spec.matches_end_ts(reading.get('period_end'))]

        transformed = [transform_solcast_data(data, src_hash, time_spec, job)
                       for data in matched_data]

        flattened_data = [item for sublist in transformed for item in sublist]

        result = flattened_data

    if len(result) == 0:
        raise Exception('Transformation ended with empty result')

    return result
