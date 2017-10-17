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
var pin_1 = require("./pin");
var PinOut = (function (_super) {
    __extends(PinOut, _super);
    function PinOut(params) {
        return _super.call(this, {
            id: params.id,
            label: params.label,
            pin: params.pin,
            mode: 'out',
        }) || this;
    }
    PinOut.prototype.write = function (state) {
        var _this = this;
        if (this.state !== state) {
            this.state = state;
            this.log(state ? 'on' : 'off');
            this.pin.write(state ? 1 : 0, function (err) {
                _this.trigger('error', err);
            });
            this.trigger('change', state);
            this.trigger(state ? 'activate' : 'deactivate');
        }
        return this;
    };
    PinOut.prototype.activate = function () {
        return this.write(true);
    };
    PinOut.prototype.deactivate = function () {
        return this.write(false);
    };
    PinOut.prototype.toggle = function () {
        return this.write(!this.state);
    };
    PinOut.prototype.followPin = function (input, invert) {
        var _this = this;
        if (invert === void 0) { invert = false; }
        input.on('change', function (state) {
            _this.write(state !== invert);
        });
        return this;
    };
    PinOut.prototype.followCondition = function (condition, invert) {
        var _this = this;
        if (invert === void 0) { invert = false; }
        this.write(condition.get() !== invert);
        condition.on('change', function (state) {
            _this.write(state !== invert);
        });
        return this;
    };
    return PinOut;
}(pin_1.default));
exports.default = PinOut;
