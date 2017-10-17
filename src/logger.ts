import debug = require("debug");

// debug.enable("pi*|app*");
debug.enable("app.pin.desk_lamp");

export type logType = debug.IDebugger;

export default (namespace:string) : debug.IDebugger => {
  return debug(namespace);
};
