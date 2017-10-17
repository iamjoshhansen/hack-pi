// import debug = require("debug");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorCursor = 0;
var colors = [
    "\x1b[31m",
    "\x1b[32m",
    "\x1b[33m",
    "\x1b[34m",
    "\x1b[35m",
    "\x1b[36m",
    "\x1b[37m",
];
function debug(namespace) {
    var ns = namespace;
    while (ns.length < 30) {
        ns = ' ' + ns;
    }
    var color = colors[colorCursor++ % colors.length];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var consoleArgs = [color, ns, '\x1b[0m'];
        consoleArgs = consoleArgs.concat(args);
        console.log.apply(null, consoleArgs);
    };
}
exports.default = function (namespace) {
    return debug(namespace);
};
