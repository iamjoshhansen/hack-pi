"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = {
    'y': 1000 * 60 * 60 * 24 * 365,
    'w': 1000 * 60 * 60 * 24 * 7,
    'd': 1000 * 60 * 60 * 24,
    'h': 1000 * 60 * 60,
    'm': 1000 * 60,
    's': 1000,
    'i': 1
};
exports.default = function (amount) {
    amount = amount.replace(/ /g, '');
    var segments = [];
    var digit = '';
    var value = '';
    var mode = 'd';
    amount.split('').forEach(function (c) {
        if (('0123456789.').indexOf(c) > -1) {
            if (mode == 'v') {
                segments.push(digit + value);
                digit = '';
                value = '';
                mode = 'd';
            }
            digit += c;
        }
        else {
            value += c;
            if (mode == 'd') {
                mode = 'v';
            }
        }
    });
    segments.push(digit + value);
    var total = 0;
    segments.forEach(function (segment) {
        var numbers = parseFloat(segment.match(/\d/g).join(''));
        var letters = segment.match(/\D/g).join('');
        total += numbers * map[letters];
    });
    return total;
};
