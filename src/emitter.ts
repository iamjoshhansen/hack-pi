export default class Emiter {

  private _callbacks:{[ev:string]:Array<Function>};

  constructor () {
    this._callbacks = {};
  }

  on (ev:string, cb:Function) : this {
    if ( ! (ev in this._callbacks)) {
      this._callbacks[ev] = [];
    }

    this._callbacks[ev].push(cb);

    return this;
  }

  off (ev:string) : this {
    if (ev in this._callbacks) {
      delete this._callbacks[ev];
    }

    return this;
  }

  trigger (ev:string, args?:any) : this {

    if ( ! (args instanceof Array)) {
      args = [args];
    }

    var self = this;

    if (ev in this._callbacks) {
      this._callbacks[ev].forEach((cb) => {
        cb.apply(self, args);
      });
    }

    return this;
  }

}
