from datetime import datetime
from prefect import flow, task, get_run_logger
from utils.iso_datetime import TimeSpec
from utils.platform import (
    PlatformJob,
    mrv_submit_historical,
    mrv_prepare,
    mrv_validate,
    mrv_send,
)


@task(retries=3, retry_delay_seconds=30)
async def submit_historical():
    logger = get_run_logger()
    logger.info("Submit historial MRVs to Guardian...")
    result = await mrv_submit_historical()
    success = result.get("success", False)

    if not success:
        raise Exception(result.get('message'))
    else:
        logger.info(result.get('message'))


@task(retries=3, retry_delay_seconds=30)
async def prepare(time_spec: TimeSpec, job: PlatformJob):
    logger = get_run_logger()
    logger.info("Preparing MRV record...")
    request_payload = {
        "isoDateTime": time_spec.start_ts_iso_string,
        "jobId": job.job_id
    }

    result = await mrv_prepare(request_payload)

    success = result.get("success", False)

    if not success:
        raise Exception(result.get('message'))
    else:
        logger.info(result.get('message'))
    return result


@task(retries=3, retry_delay_seconds=30)
async def validate(time_spec: TimeSpec, job: PlatformJob):
    logger = get_run_logger()
    logger.info("Validating MRV record...")
    request_payload = {
        "isoDateTime": time_spec.start_ts_iso_string,
        "jobId": job.job_id
    }

    result = await mrv_validate(request_payload)
    success = result.get("success", False)

    if not success:
        raise Exception(result.get('message'))
    else:
        logger.info(result.get('message'))

    return success


@task(retries=3, retry_delay_seconds=30)
async def send(time_spec: TimeSpec, job: PlatformJob):
    logger = get_run_logger()
    logger.info("Sending MRV record...")
    request_payload = {
        "isoDateTime": time_spec.start_ts_iso_string,
        "jobId": job.job_id
    }

    result = await mrv_send(request_payload)
    success = result.get("success", False)

    if not success:
        raise Exception(result.get('message'))
    else:
        logger.info(result.get('message'))

    return success


@flow(name="MRV Flow")
async def mrv_flow(time_spec: TimeSpec, job: PlatformJob):
    await prepare(time_spec, job)
    await validate(time_spec, job)
    await send(time_spec, job)
    await submit_historical()
