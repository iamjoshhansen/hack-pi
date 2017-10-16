import webhook from './ifttt-webhook';
import { webhookKey } from './config';

const event:string = 'reminder';
const post = webhook('notification', event, webhookKey);

export default (msg:string) => {
  return post(msg);
};
