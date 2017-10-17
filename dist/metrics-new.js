"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ifttt_webhook_1 = require("./ifttt-webhook");
var config_1 = require("./config");
var event = 'ha_metric';
// const key:string = 'f3HqyRey51BeJWWjrq4I-AP9hy_IosZZ3IZfDR5lGya';
var post = ifttt_webhook_1.default('metric', event, config_1.webhook);
exports.default = function (id, val) {
    return post(id, val);
};
