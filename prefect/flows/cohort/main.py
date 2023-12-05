import datetime
import pytz
from prefect import flow, context, get_run_logger
from utils.platform import get_job_by_id
from utils.iso_datetime import TimeSpecBuilder, subtract_seconds
from .mrv_flow import mrv_flow
from .data_flow import data_flow


@flow(name="cohort")
async def main(job_id):
    logger = get_run_logger()
    job = await get_job_by_id(job_id)

    if job == None:
        raise Exception('Unable to find job with given id')

    job_start_time = context.get_run_context().flow_run.expected_start_time
    now = datetime.datetime.now().astimezone(pytz.utc)
    job_time = job_start_time if job_start_time is not None else now
    delay = job.meter.delay_secs if job.meter.delay_secs > 0 else job.meter.interval
    if job.type == 'MRV':  # This is a workaround before job has a delay field
        delay = delay * 2

    start_ts = subtract_seconds(job_time, delay)

    time_spec = TimeSpecBuilder.create_timespec(
        start_ts=start_ts,
        interval_seconds=job.meter.interval,
        timezone=job.meter.timezone
    )

    logger.info(
        f"Starting main flow with for Job: {job.job_id}@{time_spec.start_ts_iso_string}")

    if job.is_paused:
        msg = 'Job is paused'
        logger.warning(msg)
        raise Exception(msg)

    elif job.type == 'DATA':
        logger.info('Starting subflow: Data')
        await data_flow(time_spec, job)

    elif job.type == 'MRV':
        logger.info('Starting subflow: MRV')
        await mrv_flow(time_spec, job)
    else:
        msg = 'Invalid job type. Valid job types include DATA and MRV'
        logger.error(msg)
        raise Exception(msg)
