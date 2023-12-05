import nats
import json
import uuid
import os
from pydantic import BaseModel, Field

NAT_ADDRESS = os.environ.get('MQ_ADDRESS', 'localhost')


class PlatformRequest:
    def __init__(self, pattern, data):
        self.pattern = pattern
        self.data = data
        self.id = str(uuid.uuid4())

    def toJson(self):
        return json.dumps(vars(self)).encode()


async def send(req: PlatformRequest):
    nc = await nats.connect(NAT_ADDRESS)
    inbox = nc.new_inbox()
    sub = await nc.subscribe(inbox)
    await nc.publish(req.pattern, req.toJson(), reply=inbox)
    msg = await sub.next_msg(timeout=12)
    await nc.close()

    data = json.loads(msg.data.decode('utf-8'))
    response = data.get("response", '{}')

    return response


class PlatformMeter(BaseModel):
    meter_id: str = Field(alias="id")
    key: str
    data_source: str = Field(alias="dataSource")
    data_credentials: str = Field(alias="dataCredentials")
    interval: int
    meter_type: str = Field(alias="meterType")
    timezone: str
    carbon_factor: float = Field(alias="officialCarbonFactor")
    delay_secs: int = Field(alias="dataDelaySec")

    class Config:
        allow_population_by_field_name = True


class PlatformJob(BaseModel):
    job_id: str
    meter: PlatformMeter
    is_paused: bool
    type: str


async def get_job_by_id(job_id: str):
    job = await send(PlatformRequest('meter-job.findOne',  job_id))

    if job is not None:
        return PlatformJob(
            job_id=job.get('id'),
            meter=job.get('meter'),
            is_paused=job.get('isPaused', False),
            type=job.get('type')
        )

    return None


async def get_raw_data_upload_url(data_type: str, datetime: str, meter_key: str, interval: int):
    payload = {"dataType": data_type,
               "isoDateTime": datetime,
               "meterKey": meter_key,
               "interval": interval}
    request = PlatformRequest('prefect.getDataUploadUrl', payload)

    return await send(request)


async def get_raw_data(data_type: str, datetime: str, meter_key: str, interval: int):
    payload = {"dataType": data_type,
               "isoDateTime": datetime,
               "meterKey": meter_key,
               "interval": interval}
    request = PlatformRequest('prefect.getData', payload)

    return await send(request)


async def ingest_transformed_data(data):
    request = PlatformRequest('meter-data.ingest', data)
    return await send(request)


async def mrv_submit_historical():
    request = PlatformRequest('mrv.submit-historical-data', {})
    return await send(request)


async def mrv_prepare(payload):
    request = PlatformRequest('mrv.prepare', payload)
    return await send(request)


async def mrv_validate(payload):
    request = PlatformRequest('mrv.validate', payload)
    return await send(request)


async def mrv_send(payload):
    request = PlatformRequest('mrv.submission', payload)
    return await send(request)
