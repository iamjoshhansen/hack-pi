"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var logger_1 = require("./logger");
exports.default = function (name, event, key) {
    var log = logger_1.default("app.webhook." + name);
    return function (v1, v2, v3) {
        var endpoint = "https://maker.ifttt.com/trigger/" + event + "/with/key/" + key;
        if (v3 !== undefined) {
            log(v1 + "\t" + v2 + "\t" + v3);
            return axios_1.default.post(endpoint, {
                value1: v1,
                value2: v2,
                value3: v3,
            });
        }
        if (v2 !== undefined) {
            log(v1 + "\t" + v2);
            return axios_1.default.post(endpoint, {
                value1: v1,
                value2: v2,
            });
        }
        log(v1);
        return axios_1.default.post(endpoint, {
            value1: v1,
        });
    };
};
