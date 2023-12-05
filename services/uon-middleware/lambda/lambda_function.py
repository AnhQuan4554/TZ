import json
import urllib.parse
import boto3
from datetime import datetime, timezone


s3 = boto3.client('s3')

def dt_round_down(unix_time, round_by = 5):
    dt = datetime.fromtimestamp(unix_time/1000, timezone.utc)

    minutes = int(dt.minute/round_by) * round_by

    rounded_dt = dt.replace(minute=minutes, second=0, microsecond=0, tzinfo=timezone.utc)
    print("debug ts", unix_time, dt, minutes, rounded_dt)
   
    return int(datetime.timestamp(rounded_dt))


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    unix_time = event.get('Unix time')
    
    rounded_ts = dt_round_down(unix_time)
    register = event.get('topic').rsplit('/', 1)[-1]
    bucket = 'uon-mqtt-device-dev'
    key = 'data/%s/%s/%d.json' % (rounded_ts, register, unix_time)
    
    event['registry'] = register
    event['timestamp'] = rounded_ts
    event['raw_timestamp'] = unix_time
    
    print(bucket, key, register)
    try:
        s3.put_object(
            Body =json.dumps(event),
            Bucket = bucket,
            Key =key
        )
    except Exception as e:
        print(e)
        print('Unable to upload content to s3.'.format(key, bucket))
        raise e
