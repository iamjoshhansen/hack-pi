import axios from 'axios';
import debug = require("debug");

export default (name:string|number, event:string|number, key:string|number) => {
  const log:debug.IDebugger = debug(`app.webhook.${name}`);

  return (v1:string, v2?:string|number, v3?:string|number) => {

    const endpoint = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;

    if (v3 !== undefined) {
      log(`${v1}\t${v2}\t${v3}`);
      return axios.post(endpoint, {
        value1: v1,
        value2: v2,
        value3: v3,
      });
    }

    if (v2 !== undefined) {
      log(`${v1}\t${v2}`);
      return axios.post(endpoint, {
        value1: v1,
        value2: v2,
      });
    }

    log(v1);
    return axios.post(endpoint, {
      value1: v1,
    });
  };
};
