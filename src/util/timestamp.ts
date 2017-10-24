import { padLeft } from './pad';

export default (date:Date) : string => {

  const isAm = date.getHours() < 12;

  const hours:string = padLeft((date.getHours() - (isAm ? 0 : 12)).toString(), 2, '0');
  const minutes:string = padLeft((date.getMinutes()).toString(), 2, '0');
  const seconds:string = padLeft((date.getSeconds()).toString(), 2, '0');

  return `${hours}:${minutes}:${seconds} ${isAm?'am':'pm'}`;
}
