from prefect import task, get_run_logger
from utils.platform import PlatformJob, ingest_transformed_data
from utils.iso_datetime import TimeSpec


@task(retries=3, retry_delay_seconds=30)
async def load(transformed_data):
    logger = get_run_logger()
    logger.info("Ingesting into database")
    logger.info(transformed_data)
    result = await ingest_transformed_data(transformed_data)

    record_count = len(transformed_data)
    logger.info(f"Done ingesting into database: {record_count} records")

    if not result.get('success', False):
        raise Exception(result.get('error', 'Unknown error'))
