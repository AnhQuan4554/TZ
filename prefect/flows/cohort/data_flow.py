from datetime import datetime
from prefect import flow
from utils.platform import PlatformJob
from utils.iso_datetime import TimeSpec
from cohort.tasks.extract import extract
from cohort.tasks.transform import transform
from cohort.tasks.load import load


@flow(name="Data Flow")
async def data_flow(time_spec: TimeSpec, job: PlatformJob):

    await extract(time_spec, job)

    transformed = await transform(time_spec, job)

    await load(transformed)
