// import debug = require("debug");

// debug.enable("pi*|app*");
// export type logType = debug.IDebugger;

export type logType = (...args:Array<any>) => void;

let colorCursor = 0;
const colors = [
  "\x1b[31m",
  "\x1b[32m",
  "\x1b[33m",
  "\x1b[34m",
  "\x1b[35m",
  "\x1b[36m",
  "\x1b[37m",
];

function debug(namespace:string) {

  let ns = namespace;
  while (ns.length < 30) {
    ns = ' ' + ns;
  }

  let color = colors[colorCursor++ % colors.length];

  return (...args:Array<any>) => {
    let consoleArgs:Array<any> = [color, ns, '\x1b[0m'];
    consoleArgs = consoleArgs.concat(args);
    console.log.apply(null, consoleArgs);
  };
}

export default (namespace:string) : logType => {
  return debug(namespace);
};
