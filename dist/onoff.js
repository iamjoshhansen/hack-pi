"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var emitter_1 = require("./emitter");
var Gpio = (function () {
    function Gpio(pin, mode, type) {
        this.id = pin;
        this.val = 0;
        this.ev = new emitter_1.default();
        this.log = logger_1.default("pi.pin." + pin);
        this.log('initialized');
    }
    Gpio.prototype.write = function (val, callback) {
        if (this.val !== val) {
            this.val = val;
            this.log((this.val == 1) ? 'on' : 'off');
            this.ev.trigger('change', this.val);
            setTimeout(function () {
                callback.call(null, null, val);
            }, 1);
        }
    };
    Gpio.prototype.writeSync = function (val) {
        if (this.val !== val) {
            this.val = val;
            this.log((this.val == 1) ? 'on' : 'off');
            this.ev.trigger('change', this.val);
        }
    };
    Gpio.prototype.readSync = function () {
        return this.val;
    };
    Gpio.prototype.watch = function (callback) {
        this.ev.on('change', function (val) {
            callback.call(null, null, val);
        });
    };
    return Gpio;
}());
exports.default = Gpio;
