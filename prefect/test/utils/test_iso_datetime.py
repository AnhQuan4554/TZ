import unittest
from datetime import timezone
import datetime

from flows.utils.iso_datetime import (
    round_down_seconds,
    to_iso_string,
    from_iso_string,
    force_iso_format,
    get_start_of_hour,
    get_start_of_day,
    get_start_of_week,
    get_start_of_month,
    subtract_seconds
)


class TestTimespec(unittest.TestCase):
    def test_round_down_seconds(self):
        test = from_iso_string('2021-07-26T11:21:34.000Z')
        self.assertEqual(to_iso_string(round_down_seconds(
            test, 300)), '2021-07-26T11:20:00.000Z')
        self.assertEqual(to_iso_string(round_down_seconds(
            test, 900)), '2021-07-26T11:15:00.000Z')
        self.assertEqual(to_iso_string(round_down_seconds(
            test, 1800)), '2021-07-26T11:00:00.000Z')
        self.assertEqual(to_iso_string(round_down_seconds(
            test, 3600)), '2021-07-26T11:00:00.000Z')
        self.assertEqual(to_iso_string(round_down_seconds(
            test, 86400)), '2021-07-26T00:00:00.000Z')

    def test_from_iso_string(self):
        test = datetime.datetime(2021, 7, 26, 21, 20, 14, 1945)
        iso_string = to_iso_string(test)
        self.assertEqual(iso_string, '2021-07-26T21:20:14.001Z')
        self.assertEqual(to_iso_string(
            from_iso_string(iso_string)), iso_string)

        now = datetime.datetime.now()
        self.assertEqual(to_iso_string(now), to_iso_string(
            from_iso_string(to_iso_string(now))))

        now = datetime.datetime.utcnow()
        self.assertEqual(to_iso_string(now), to_iso_string(
            from_iso_string(to_iso_string(now))))

    def test_force_iso_format(self):
        test = datetime.datetime(2021, 7, 26, 21, 20, 14, 1945)
        self.assertEqual(force_iso_format(test), '2021-07-26T21:20:14.001Z')
        self.assertEqual(force_iso_format(
            '2021-07-26T21:20:14.001Z'), '2021-07-26T21:20:14.001Z')
        self.assertEqual(force_iso_format(
            '2022-11-10T03:17:33.603890+00:00'), '2022-11-10T03:17:33.603Z')

    def test_start_of_hour(self):
        self.assertEqual(get_start_of_hour(
            '2021-07-26T21:20:14.001Z'), '2021-07-26T21:00:00.000Z')

    def test_start_of_day(self):
        tz = 'Australia/Melbourne'
        self.assertEqual(get_start_of_day(
            '2021-07-26T14:00:00.000Z', tz), '2021-07-26T14:00:00.000Z')
        self.assertEqual(get_start_of_day(
            '2021-07-26T22:00:00.000Z', tz), '2021-07-26T14:00:00.000Z')
        self.assertEqual(get_start_of_day(
            '2021-07-27T10:00:00.000Z', tz), '2021-07-26T14:00:00.000Z')
        self.assertEqual(get_start_of_day(
            '2021-07-28T05:00:00.000Z', tz), '2021-07-27T14:00:00.000Z')
        self.assertEqual(get_start_of_day(
            '2022-05-22T23:39:30.000Z', tz), '2022-05-22T14:00:00.000Z')
        self.assertEqual(get_start_of_day(
            '2022-05-22T23:39:30.000Z', 'America/New_York'), '2022-05-22T04:00:00.000Z')

    def test_start_of_week(self):
        tz = 'Australia/Melbourne'

        self.assertEqual(get_start_of_week(
            '2022-05-22T23:39:30.000Z', tz), '2022-05-22T14:00:00.000Z')
        self.assertEqual(get_start_of_week(
            '2022-05-25T23:39:30.000Z', tz), '2022-05-22T14:00:00.000Z')
        self.assertEqual(get_start_of_week(
            '2022-05-22T14:00:00.000Z', tz), '2022-05-22T14:00:00.000Z')

        tz = 'America/New_York'
        self.assertEqual(get_start_of_week(
            '2022-05-22T23:39:30.000Z', tz), '2022-05-16T04:00:00.000Z')
        self.assertEqual(get_start_of_week(
            '2022-05-25T23:39:30.000Z', tz), '2022-05-23T04:00:00.000Z')

    def test_start_of_month(self):
        tz = 'Australia/Melbourne'

        self.assertEqual(get_start_of_month(
            '2022-04-30T23:39:30.000Z', tz), '2022-04-30T14:00:00.000Z')
        self.assertEqual(get_start_of_month(
            '2022-05-25T23:39:30.000Z', tz), '2022-04-30T14:00:00.000Z')
        self.assertEqual(get_start_of_month(
            '2022-05-03T23:39:30.000Z', tz), '2022-04-30T14:00:00.000Z')

        tz = 'America/New_York'
        self.assertEqual(get_start_of_month(
            '2022-04-30T23:39:30.000Z', tz), '2022-04-01T04:00:00.000Z')
        self.assertEqual(get_start_of_month(
            '2022-05-01T23:39:30.000Z', tz), '2022-05-01T04:00:00.000Z')

    def test_subtract_seconds(self):
        self.assertEqual(to_iso_string(subtract_seconds(
            '2022-04-30T23:39:30.000Z', 300)), '2022-04-30T23:34:30.000Z')
