import datestamp from './datestamp';
import timestamp from './timestamp';

export default (date:Date) : string => {
  return `${datestamp(date)} ${timestamp(date)}`;
}
