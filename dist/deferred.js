"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var Deferred = (function () {
    function Deferred() {
        this._callbacks = [];
        this.args = [];
        this.state = 'pending';
    }
    Deferred.prototype.resolve = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.state == 'pending') {
            this.state = 'resolved';
            this.args = args;
            this._callbacks.forEach(function (callback) {
                if (callback.type !== 'fail') {
                    callback.fn.apply(_this, _this.args);
                }
            });
            this._callbacks = null;
        }
        return this;
    };
    Deferred.prototype.reject = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.state == 'pending') {
            this.state = 'rejected';
            this.args = args;
            this._callbacks.forEach(function (callback) {
                if (callback.type !== 'done') {
                    callback.fn.apply(_this, _this.args);
                }
            });
            this._callbacks = null;
        }
        return this;
    };
    Deferred.prototype.done = function (callback) {
        switch (this.state) {
            case 'pending':
                this._callbacks.push({
                    fn: callback,
                    type: 'done',
                });
                break;
            case 'resolved':
                callback.apply(this, this.args);
                break;
        }
        return this;
    };
    Deferred.prototype.fail = function (callback) {
        switch (this.state) {
            case 'pending':
                this._callbacks.push({
                    fn: callback,
                    type: 'fail',
                });
                break;
            case 'rejected':
                callback.apply(this, this.args);
                break;
        }
        return this;
    };
    Deferred.prototype.always = function (callback) {
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
    };
    return Deferred;
}());
exports.default = Deferred;
