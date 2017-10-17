import logger from './logger';
import { logType } from './logger';
import Emitter from './emitter';
import { Gpio } from 'onoff';
/*
import Gpio from './onoff';
console.log('\x1b[31m%s\x1b[0m','!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log('\x1b[35m%s\x1b[0m','     Using Fake Pins     ');
console.log('\x1b[31m%s\x1b[0m','!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log('');
*/

// export type ValidPinNumber = 7|8|10|11|12|13|15|16|18|19|21|22|23|24|26|27|28|29|31|32|33|35|36|37|38|40;
export type ValidPinNumber = 2|3|4|14|15|17|18|27|22|23|24|10|9|25|11|8|7|0|1|5|6|12|13|19|16|26|20|21;
export type ValidEvents = 'change' | 'activate' | 'deactivate';

export interface pinConstructor {
  label:string,
  id:string,
  pin:ValidPinNumber,
  mode:'in'|'out',
}

const declaredPins : {[key:string]:string} = {};

export default class Pin extends Emitter {

  log:logType;
  id:ValidPinNumber;
  state:boolean;
  pin:Gpio;
  label:string;

  constructor (opts:pinConstructor) {
    super();

    this.log = logger(`app.pin.${opts.id}`);

    if (opts.pin in declaredPins) {
      throw new Error(`Pin ID already taken: ${opts.pin} is being requested from both '${opts.label}' and '${declaredPins[opts.pin]}'`);
    }

    declaredPins[opts.pin] = opts.label;

    this.id = opts.pin;
    this.label = opts.label;
    this.state = false;

    if (opts.mode == 'out') {
      this.pin = new Gpio(this.id, 'out');
    } else {
      this.pin = new Gpio(this.id, 'in', 'both');
    }
  }

  read ():boolean {
    return this.pin.readSync() === 1;
  }

  on (event:ValidEvents, cb:(...args:Array<any>) => void) {
    return super.on(event, cb);
  }

  off (event:ValidEvents) {
    return super.off(event);
  }
}
