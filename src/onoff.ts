import logger from './util/logger';
import { logType } from './util/logger';
import Emitter from './emitter';

export default class Gpio {

  id:number;
  private val:0|1;
  private ev:Emitter;
  log:logType;

  constructor (pin:number, mode:'in'|'out', type?:'rising'|'falling'|'both') {

    this.id = pin;
    this.val = 0;
    this.ev = new Emitter();
    this.log = logger(`pi.pin.${pin}`);
    this.log('initialized');

  }

  write (val:0|1, callback:(err:Error, value:number) => void) {
    if (this.val !== val) {
      this.val = val;
      this.log((this.val == 1) ? 'on' : 'off');
      this.ev.emit('change', this.val);
      setTimeout(() => {
        callback.call(null, null, val);
      }, 1);
    }
  }

  writeSync (val:0|1) {
    if (this.val !== val) {
      this.val = val;
      this.log((this.val == 1) ? 'on' : 'off');
      this.ev.emit('change', this.val);
    }
  }

  readSync () {
    return this.val;
  }

  watch (callback:(error:Error, value:number) => void) {
    this.ev.on('change', (val:0|1) => {
      callback.call(null, null, val);
    });
  }

}
