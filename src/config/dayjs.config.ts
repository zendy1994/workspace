import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const configureDayjs = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
};
