"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Emiter = (function () {
    function Emiter() {
        this._callbacks = {};
    }
    Emiter.prototype.on = function (ev, cb) {
        if (!(ev in this._callbacks)) {
            this._callbacks[ev] = [];
        }
        this._callbacks[ev].push(cb);
        return this;
    };
    Emiter.prototype.off = function (ev) {
        if (ev in this._callbacks) {
            delete this._callbacks[ev];
        }
        return this;
    };
    Emiter.prototype.trigger = function (ev, args) {
        if (!(args instanceof Array)) {
            args = [args];
        }
        var self = this;
        if (ev in this._callbacks) {
            this._callbacks[ev].forEach(function (cb) {
                cb.apply(self, args);
            });
        }
        return this;
    };
    return Emiter;
}());
exports.default = Emiter;
