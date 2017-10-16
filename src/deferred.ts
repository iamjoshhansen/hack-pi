interface Callback {
  fn: Function,
  type: 'always'|'done'|'fail',
};

export default class Deferred {

  private _callbacks:Array<Callback>;
  args:Array<any>;
  state:'pending'|'resolved'|'rejected';

  constructor () {
    this._callbacks = [];
    this.args = [];
    this.state = 'pending';
  }

  resolve(...args:Array<any>) : this {
    if (this.state == 'pending') {
      this.state = 'resolved';
      this.args = args;

      this._callbacks.forEach((callback) => {
        if (callback.type !== 'fail') {
          callback.fn.apply(this, this.args);
        }
      });

      this._callbacks = null;
    }

    return this;
  }

  reject(...args:Array<any>) : this {
    if (this.state == 'pending') {
      this.state = 'rejected';
      this.args = args;

      this._callbacks.forEach((callback) => {
        if (callback.type !== 'done') {
          callback.fn.apply(this, this.args);
        }
      });

      this._callbacks = null;
    }

    return this;
  }

  done(callback:Function) : this {
    switch (this.state) {
      case 'pending':
        this._callbacks.push({
          fn: callback,
          type: 'done',
        });
        break;

      case'resolved':
        callback.apply(this, this.args);
        break;
      }

      return this;
  }

  fail(callback:Function) : this {
    switch (this.state) {
      case 'pending':
        this._callbacks.push({
          fn: callback,
          type: 'fail',
        });
        break;

      case'rejected':
        callback.apply(this, this.args);
        break;
    }

    return this;
  }

  always(callback:Function) : this {
    switch (this.state) {
      case 'pending':
        this._callbacks.push({
          fn: callback,
          type: 'always',
        });
        break;

      default:
        callback.apply(this, this.args);
    }

    return this;
  }
}
