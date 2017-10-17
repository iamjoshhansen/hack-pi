import Emitter from './emitter';
import logger from './logger';
import { logType } from './logger';

export type ValidEvents = 'change' | 'activate' | 'deactivate';

export default class Condition extends Emitter {

  label:string;
  log:logType;
  private state:boolean;

  constructor (label:string, initialState:boolean, rules?:(condition:Condition) => void) {
    super();
    this.label = label;
    this.state = initialState;

    this.log = logger(`app.condition.${label}`);

    this.log('initial: ', this.state);

    this.on('change', (state:boolean) => {
      this.log(`changed to ${state}`);
    });

    if (rules !== undefined) {
      rules.call(null, this);
    }
  }

  set (state:boolean) : this {
    if (state !== this.state) {
      this.state = state;
      this.trigger('change', this.state);
      this.trigger(this.state ? 'activate' : 'deactivate');
    }

    return this;
  }

  get () : boolean {
    return this.state;
  }

  toggle () {
    return this.set( ! this.state);
  }

  on (event:ValidEvents, cb:(...args:Array<any>) => void) {
    return super.on(event, cb);
  }

  off (event:ValidEvents) {
    return super.off(event);
  }
}
