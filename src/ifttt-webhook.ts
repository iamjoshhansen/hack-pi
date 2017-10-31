import { post } from './network/json';
import logger from './util/logger';
import { logType } from './util/logger';

export default (name:string|number, ev:string|number, key:string|number) => {
  const log:logType = logger(`app.webhook.${name}`);

  return (v1:string, v2?:string|number, v3?:string|number) => {

    const endpoint = `https://maker.ifttt.com/trigger/${ev}/with/key/${key}`;

    if (v3 !== undefined) {
      log(`${v1}\t${v2}\t${v3}`);
      return post(endpoint, {
        value1: v1,
        value2: v2,
        value3: v3,
      });
    }

    if (v2 !== undefined) {
      log(`${v1}\t${v2}`);
      return post(endpoint, {
        value1: v1,
        value2: v2,
      });
    }

    log(v1);
    return post(endpoint, {
      value1: v1,
    });
  };
};
