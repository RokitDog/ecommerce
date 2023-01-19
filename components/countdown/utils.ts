import dayjs from 'dayjs';
import {remainingTimetype} from '.';

export function calculateDiff(timeInMs: number): remainingTimetype {
  const timestampDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();

  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
    };
  }

  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    days: getRemainingDays(nowDayjs, timestampDayjs),
  };
}

function getRemainingSeconds(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs): string {
  const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
  return padWithZeros(seconds, 2);
}
function getRemainingMinutes(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs): string {
  const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
  return padWithZeros(minutes, 2);
}
function getRemainingHours(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs): string {
  const hours = timestampDayjs.diff(nowDayjs, 'hours') % 60;
  return padWithZeros(hours, 2);
}
function getRemainingDays(nowDayjs: dayjs.Dayjs, timestampDayjs: dayjs.Dayjs): string {
  const days = timestampDayjs.diff(nowDayjs, 'days');
  return days.toString();
}

function padWithZeros(number: number, length: number) {
  const numberString = number.toString();
  if (numberString.length >= length) return numberString;
  return '0'.repeat(length - numberString.length) + numberString;
}
