import Emitter from './emitter';

export type ValidEvents = 'change';

export default class Amount extends Emitter {

  amount:number;
  label:string;

  constructor (label:string, amount:number=0) {
    super();

    this.label = label;

    let _amount = amount;
    Object.defineProperty(this, 'amount', {
      get: () => {
        return _amount;
      },
      set: (newAmount:number) => {
        if (_amount !== newAmount) {
          const oldAmount = _amount;
          _amount = newAmount;
          this.emit('change', newAmount, oldAmount);
        }
      }
    });
  }

  on (event:ValidEvents, cb:(...args:Array<any>) => void) {
    return super.on(event, cb);
  }

  off (event:ValidEvents) {
    return super.off(event);
  }
}
