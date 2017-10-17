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
var emitter_1 = require("./emitter");
var logger_1 = require("./logger");
var Condition = (function (_super) {
    __extends(Condition, _super);
    function Condition(label, initialState, rules) {
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.state = initialState;
        _this.log = logger_1.default("app.condition." + label);
        _this.log('initial: ', _this.state);
        _this.on('change', function (state) {
            _this.log("changed to " + state);
        });
        if (rules !== undefined) {
            rules.call(null, _this);
        }
        return _this;
    }
    Condition.prototype.set = function (state) {
        if (state !== this.state) {
            this.state = state;
            this.trigger('change', this.state);
            this.trigger(this.state ? 'activate' : 'deactivate');
        }
        return this;
    };
    Condition.prototype.get = function () {
        return this.state;
    };
    Condition.prototype.toggle = function () {
        return this.set(!this.state);
    };
    Condition.prototype.on = function (event, cb) {
        return _super.prototype.on.call(this, event, cb);
    };
    Condition.prototype.off = function (event) {
        return _super.prototype.off.call(this, event);
    };
    return Condition;
}(emitter_1.default));
exports.default = Condition;
