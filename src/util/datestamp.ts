import { padLeft } from './pad';

export default (date:Date) : string => {

  const year:string = date.getFullYear().toString();
  const month:string = padLeft((date.getMonth() + 1).toString(), 2, '0');
  const day:string = padLeft((date.getDate()).toString(), 2, '0');

  return `${year}-${month}-${day}`;
}
