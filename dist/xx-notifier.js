"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var debug = require("debug");
var log = debug('app.notification');
exports.default = function (msg) {
    log(msg);
    return axios_1.default.post('https://maker.ifttt.com/trigger/reminder/with/key/f3HqyRey51BeJWWjrq4I-AP9hy_IosZZ3IZfDR5lGya', {
        value1: msg
    });
};
