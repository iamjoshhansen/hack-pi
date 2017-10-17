"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ifttt_webhook_1 = require("./ifttt-webhook");
var config_1 = require("./config");
var event = 'ha_metric';
var post = ifttt_webhook_1.default('metric', event, config_1.webhookKey);
exports.default = function (id, val) {
    if (val === undefined) {
        return post(id);
    }
    return post(id, val);
};
