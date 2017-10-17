"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var debug = require("debug");
var log = debug('app.metric');
exports.default = function (id, val) {
    log(id + ": " + val);
    var event = 'ha_metric';
    var key = 'f3HqyRey51BeJWWjrq4I-AP9hy_IosZZ3IZfDR5lGya';
    return axios_1.default.post("https://maker.ifttt.com/trigger/" + event + "/with/key/" + key, {
        value1: id,
        value2: val,
    });
};
