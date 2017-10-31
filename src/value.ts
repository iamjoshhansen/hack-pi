import Emitter from './emitter';

export default class Value extends Emitter {

  value:string;
  label:string;

  constructor (label:string, value:string='') {
    super();

    this.label = label;

    let _value = value;
    Object.defineProperty(this, 'value', {
      get: () => {
        return _value;
      },
      set: (newValue:string) => {
        if (_value !== newValue) {
          const oldValue = _value;
          _value = newValue;
          this.emit('change', newValue, oldValue);
        }
      }
    });
  }
}
