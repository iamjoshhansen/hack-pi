"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var emitter_1 = require("./emitter");
var onoff_1 = require("onoff");
var declaredPins = {};
var Pin = (function (_super) {
    __extends(Pin, _super);
    function Pin(opts) {
        var _this = _super.call(this) || this;
        _this.log = logger_1.default("app.pin." + opts.id);
        if (opts.pin in declaredPins) {
            throw new Error("Pin ID already taken: " + opts.pin + " is being requested from both '" + opts.label + "' and '" + declaredPins[opts.pin] + "'");
        }
        declaredPins[opts.pin] = opts.label;
        _this.id = opts.pin;
        _this.label = opts.label;
        _this.state = false;
        if (opts.mode == 'out') {
            _this.pin = new onoff_1.Gpio(_this.id, 'out');
        }
        else {
            _this.pin = new onoff_1.Gpio(_this.id, 'in', 'both');
        }
        return _this;
    }
    Pin.prototype.read = function () {
        return this.pin.readSync() === 1;
    };
    Pin.prototype.on = function (event, cb) {
        return _super.prototype.on.call(this, event, cb);
    };
    Pin.prototype.off = function (event) {
        return _super.prototype.off.call(this, event);
    };
    return Pin;
}(emitter_1.default));
exports.default = Pin;
