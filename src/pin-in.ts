import Pin from './pin';
import { ValidPinNumber } from './pin';

export default class PinIn extends Pin {

  constructor (params:{
    id:string,
    pin:ValidPinNumber,
    label:string
  }) {
    super({
      id: params.id,
      label: params.label,
      pin: params.pin,
      mode: 'in',
    });

    this.pin.watch((err:Error, value:0|1) => {
      if (err) {
        this.log('error', err);
        this.trigger('error', err);
      }

      this.log((value === 1) ? 'on' : 'off');
      this.trigger('change', value === 1);
      this.trigger((value === 1) ? 'activate' : 'deactivate');
    });
  }
}
