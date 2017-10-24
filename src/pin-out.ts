import Pin from './pin';
import PinIn from './pin-in';
import Condition from './condition';
import { ValidPinNumber } from './pin';

export default class PinOut extends Pin {

  constructor (params:{
    id:string,
    pin:ValidPinNumber,
    label:string
  }) {
    super({
      id: params.id,
      label: params.label,
      pin: params.pin,
      mode: 'out',
    });

    this.pin.writeSync(1);
  }

  write (state:boolean) : this {
    if (this.state !== state) {
      this.state = state;
      this.log(state ? 'on' : 'off');
      this.pin.write(state ? 0 : 1, (err:Error) => {
        this.emit('error', err);
      });
      this.emit('change', state);
      this.emit(state ? 'activate' : 'deactivate');
    }

    return this;
  }

  activate () : this {
    return this.write(true);
  }

  deactivate () : this {
    return this.write(false);
  }

  toggle () : this {
    return this.write( ! this.state);
  }

  followPin (input:PinIn, invert:boolean = false) : this {
    input.on('change', (state:boolean) => {
      this.write(state !== invert);
    });

    return this;
  }

  followCondition (condition:Condition, invert:boolean = false) : this {
    this.write(condition.get() !== invert);

    condition.on('change', (state:boolean) => {
      this.write(state !== invert);
    });

    return this;
  }

}
