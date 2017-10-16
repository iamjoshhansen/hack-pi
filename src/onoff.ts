import logger from './logger';
import Emitter from './emitter';
import { logType } from './logger';

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

  write (val:0|1, callback?:Function) {
    if (this.val !== val) {
      this.val = val;
      this.log((this.val == 1) ? 'on' : 'off');
      this.ev.trigger('change', this.val);
    }
  }

  readSync () {
    return this.val;
  }

  watch (callback:Function) {
    this.ev.on('change', (val:0|1) => {
      callback.call(null, null, val);
    });
  }

}
