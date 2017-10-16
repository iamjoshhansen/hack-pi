import debug = require("debug");

debug.enable("pi*|app*");

export type logType = debug.IDebugger;

export default (namespace:string) : debug.IDebugger => {
  return debug(`${namespace}`);
};
