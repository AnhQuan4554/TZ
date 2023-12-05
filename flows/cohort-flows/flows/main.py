from unicodedata import name
from prefect import flow, get_run_logger


@flow(name="Cohort")
def main_flow():
    logger = get_run_logger()
    logger.info("INFO level log message.")
