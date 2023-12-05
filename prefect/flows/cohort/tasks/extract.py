from prefect import task, get_run_logger
from utils.platform import PlatformJob, get_raw_data_upload_url
from utils.iso_datetime import TimeSpec
from utils.provider_data import collect_wattwatcher_data, collect_solcast_data


@task(retries=3, retry_delay_seconds=30)
async def extract(time_spec: TimeSpec, job: PlatformJob):
    logger = get_run_logger()
    logger.info("Getting presigned url for storage")
    destination_url = await get_raw_data_upload_url('raw', time_spec.start_ts_iso_string, job.meter.key, job.meter.interval)

    if job.meter.meter_type == 'wattwatchers':
        logger.info("Wattwatchers meter type detected")
        data = await collect_wattwatcher_data(
            job.job_id, job.meter.data_source, job.meter.data_credentials, time_spec, destination_url)

        result = data.get('success', False)
        message = data.get('message', 'Unknown reasons')

        if result:
            logger.info("Meter data downloaded")
        else:
            logger.info(data)
            logger.error(f'Failed downloading meter data: {message}')
            raise Exception(f'Failed downloading meter data: {message}')

        return result

    elif job.meter.meter_type == 'solcast':
        logger.info("Solcast meter type detected")
        data = await collect_solcast_data(
            job.job_id, job.meter.data_source, job.meter.data_credentials, time_spec, destination_url)

        result = data.get('success', False)
        message = data.get('message', 'Unknown reasons')

        if result:
            logger.info("Meter data downloaded")
        else:
            logger.info(data)
            logger.error(f'Failed downloading meter data: {message}')
            raise Exception(f'Failed downloading meter data: {message}')

        return result

    else:
        logger.error("Unkwon meter type:", job.meter.meter_type)

    raise Exception(f'Unknown meter type: {job.meter.meter_type}')
