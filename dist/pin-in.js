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
var PinIn = (function (_super) {
    __extends(PinIn, _super);
    function PinIn(params) {
        var _this = _super.call(this, {
            id: params.id,
            label: params.label,
            pin: params.pin,
            mode: 'in',
        }) || this;
        _this.pin.watch(function (err, value) {
            if (err) {
                _this.log('error', err);
                _this.trigger('error', err);
            }
            _this.log((value === 1) ? 'on' : 'off');
            _this.trigger('change', value === 1);
            _this.trigger((value === 1) ? 'activate' : 'deactivate');
        });
        return _this;
    }
    return PinIn;
}(pin_1.default));
exports.default = PinIn;
