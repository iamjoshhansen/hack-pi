"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var invertedMap = {};
console.log('Pins:');
Object.keys(config_1.pinMap).forEach(function (idString) {
    var id = parseInt(idString);
    var label = config_1.pinMap[id];
    if (label !== null) {
        console.log("  " + id + ": " + label);
        if (label in invertedMap) {
            throw new Error("Invalid pin map: duplicate label found. " + id + ": " + label);
        }
        invertedMap[label] = id;
    }
});
exports.default = function (label) {
    if (label in invertedMap) {
        return invertedMap[label];
    }
    else {
        throw new Error("Pin not found: " + label);
    }
};
