import os
import asyncio
import importlib

CLIENT_NAME = os.environ.get('CLIENT_NAME', 'cohort')
JOB_ID = "bff18535-2330-40d8-8518-4856a9be7825"  # wattwatchers
# JOB_ID = "795c115c-d9c6-4d0b-a311-11edd864a3f0"  # MRV
# JOB_ID = "5ed8a72c-a69c-4437-9153-4138fcd36785"  # Solcast

if __name__ == "__main__":
    flow = importlib.import_module(f'flows.{CLIENT_NAME}.main')
    asyncio.run(flow.main(job_id=JOB_ID))
