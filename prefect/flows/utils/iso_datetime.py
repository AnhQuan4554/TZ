from math import floor
import dateutil.parser
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta, MO
import pytz
from pydantic import BaseModel


class TimeSpec(BaseModel):
    start_ts: datetime
    end_ts: datetime
    start_ts_iso_string: str
    end_ts_iso_string: str
    start_ts_unix_timestamp: int
    end_ts_unix_timestamp: int
    interval_seconds: int
    start_hour_iso_string: str
    start_day_iso_string: str
    start_week_iso_string: str
    start_month_iso_string: str
    period: str

    def start_seconds_ago(self):
        now = datetime.now().astimezone(pytz.utc)

        if now > self.start_ts:
            delta = now - self.start_ts
            return delta.seconds
        else:
            return 0

    def matches_end_ts(self, input: datetime | str):
        dt = force_datetime(input)

        return to_iso_string(dt) == self.end_ts_iso_string


class TimeSpecBuilder():
    @staticmethod
    def create_timespec(start_ts, interval_seconds, timezone):
        start_ts = round_down_seconds(start_ts, interval_seconds)
        end_ts = timedelta(seconds=interval_seconds) + start_ts

        if interval_seconds == 300:
            period = 'PT5M'
        elif interval_seconds == 600:
            period = 'PT10M'
        elif interval_seconds == 900:
            period = 'PT15M'
        elif interval_seconds == 1800:
            period = 'PT30M'
        else:
            raise Exception(f"Unsupported interval: {interval_seconds}")

        return TimeSpec(
            start_ts=start_ts,
            end_ts=end_ts,
            start_ts_iso_string=to_iso_string(start_ts),
            end_ts_iso_string=to_iso_string(end_ts),
            start_ts_unix_timestamp=datetime.timestamp(start_ts),
            end_ts_unix_timestamp=datetime.timestamp(end_ts),
            interval_seconds=interval_seconds,
            start_hour_iso_string=get_start_of_hour(start_ts),
            start_day_iso_string=get_start_of_day(
                start_ts, timezone),
            start_week_iso_string=get_start_of_week(
                start_ts, timezone),
            start_month_iso_string=get_start_of_month(
                start_ts, timezone),
            period=period
        )


def subtract_seconds(input: datetime | str, seconds: int):
    dt = force_datetime(input).replace(microsecond=0)
    return dt - timedelta(seconds=seconds)


def round_down_seconds(input: datetime | str, seconds: int):
    dt = force_datetime(input).replace(microsecond=0)
    unix_timestamp = int(datetime.timestamp(dt))
    rounding_secs = unix_timestamp % seconds

    return dt - timedelta(seconds=rounding_secs)


def to_iso_string(dt: datetime):
    return dt.isoformat(timespec='milliseconds').replace("+00:00", "") + 'Z'


def from_iso_string(iso_string: str):
    return dateutil.parser.isoparse(iso_string)


def force_iso_format(input: str | datetime):
    if isinstance(input, datetime):
        return to_iso_string(input)

    if isinstance(input, str):
        return to_iso_string(from_iso_string(input))

    raise Exception('Input is not a valid datetime format')


def force_datetime(input: str | datetime):
    if isinstance(input, datetime):
        return input

    if isinstance(input, str):
        return from_iso_string(input)

    raise Exception('Input is not a valid datetime format')


def get_start_of_hour(input_dt):
    dt = force_datetime(input_dt)
    new_dt = dt.replace(minute=0, second=0, microsecond=0)
    return to_iso_string(new_dt)


def get_start_of_day(input_dt, timezone):
    dt = force_datetime(input_dt)
    local_dt = dt.astimezone(pytz.timezone(timezone))
    result = local_dt.replace(
        hour=0, minute=0, second=0, microsecond=0).astimezone(pytz.utc)

    return to_iso_string(result)


def get_start_of_week(input_dt, timezone):
    dt = force_datetime(input_dt)
    local_dt = dt.astimezone(pytz.timezone(timezone))
    monday = local_dt + relativedelta(weekday=MO(-1))
    result = monday.replace(
        hour=0, minute=0, second=0, microsecond=0).astimezone(pytz.utc)

    return to_iso_string(result)


def get_start_of_month(input_dt, timezone):
    dt = force_datetime(input_dt)
    local_dt = dt.astimezone(pytz.timezone(timezone))
    result = local_dt.replace(
        day=1, hour=0, minute=0, second=0, microsecond=0).astimezone(pytz.utc)

    return to_iso_string(result)
