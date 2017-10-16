import webhook from './ifttt-webhook';
import { webhookKey } from './config';

const event:string = 'ha_metric';
const post = webhook('metric', event, webhookKey);

export default (id:string,val?:string|number) => {
  if (val === undefined) {
    return post(id);
  }

  return post(id, val);
};
