import os
import math
import requests
from utils.provider_config import Configuration
from utils.iso_datetime import TimeSpec


TRIDENT_PROVIDER_BASE_URL = os.environ.get(
    'TRIDENT_PROVIDER_BASE_URL', 'https://gw-dev-6jypssyl.ts.gateway.dev')


def request_data(config: Configuration, provider_name: str):
    headers = {
        "content-type": "application/json"
    }

    res = requests.post(
        f"{TRIDENT_PROVIDER_BASE_URL}/{provider_name}", config.json(exclude_unset=True), headers=headers)

    return res.json()


async def collect_wattwatcher_data(requester: str, data_source: str, api_key: str, time_spec: TimeSpec, destination_url: str):
    config = Configuration.parse_obj({
        "client": requester,
        "source": {
            "path": f"https://api-v3.wattwatchers.com.au/long-energy/{data_source}",
            "headers": {
                "Authorization": f"Bearer {api_key}"
            },
            "querystring": {
                "fromTs": time_spec.start_ts_unix_timestamp,
                "toTs": time_spec.end_ts_unix_timestamp,
                "interval": time_spec.interval_seconds
            }
        },
        "output": {
            "object_storage": {
                "type": "s3",
                "presignedUrl": destination_url
            }
        }
    })

    return request_data(config, 'wattwatchers-provider')


async def collect_solcast_data(requester: str, data_source: str, api_key: str, time_spec: TimeSpec, destination_url: str):
    hours = math.ceil(time_spec.start_seconds_ago() / 3600)

    config = Configuration.parse_obj({
        "client": requester,
        "source": {
            "headers": {
                "apiKey": api_key
            },
            "querystring": {
                "hours": hours,
                "resourceId": data_source,
                "period": time_spec.period,
                "mode": "Live"
            }
        },
        "output": {
            "object_storage": {
                "type": "s3",
                "presignedUrl": destination_url
            }
        }
    })

    return request_data(config, 'solcast-provider')
