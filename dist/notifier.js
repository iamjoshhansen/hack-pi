"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ifttt_webhook_1 = require("./ifttt-webhook");
var config_1 = require("./config");
var event = 'reminder';
var post = ifttt_webhook_1.default('notification', event, config_1.webhookKey);
exports.default = function (msg) {
    return post(msg);
};
