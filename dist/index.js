"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var pins_1 = require("./pins");
var pins_2 = require("./pins");
var pins_3 = require("./pins");
var pins_4 = require("./pins");
var pins_5 = require("./pins");
var daytime_1 = require("./conditions/daytime");
var notifier_1 = require("./notifier");
// import postMetric from './metrics';
var log = logger_1.default('app');
// daytime.on('change', (state:boolean) => {
//   log('changing something because daytime is: ', state);
// });
var msg = 'Hello Sockets!';
log(msg);
log("The " + pins_3.front_path_lights.label + " are currently " + (pins_3.front_path_lights.state ? 'on' : 'off'));
pins_3.front_path_lights.followCondition(daytime_1.default, true);
log("The " + pins_4.led_lamp.label + " is currently " + (pins_4.led_lamp.state ? 'on' : 'off'));
pins_4.led_lamp.followCondition(daytime_1.default);
daytime_1.default
    .on('change', function (state) {
    notifier_1.default(state ? 'Sunrise' : 'Sunset');
});
pins_1.green_led.followPin(pins_2.circle_button);
pins_2.circle_button.on('activate', function () {
    pins_5.desk_lamp.toggle();
});
// setInterval(() => {
//   console.log('-------');
//   circle_button.pin.writeSync((circle_button.pin.readSync() === 0) ? 1 : 0);
// }, 5000);
var io = require('socket.io')();
var connectionId = 0;
var connectionTotal = 0;
io.on('connection', function (socket) {
    var connectionLog = logger_1.default("app.connection." + connectionId++);
    connectionLog('We have a connection!');
    // postMetric('new connection');
    connectionTotal++;
    // postMetric('connection total', connectionTotal);
    socket.emit('msg', 'Hello!');
    connectionLog('Saying hello');
    socket.on('the-ping', function () {
        connectionLog('receeived the-ping, emitting pong');
        socket.emit('msg', 'socket emit');
        socket.broadcast.emit('msg', 'socket broadcast emit');
        io.emit('msg', 'io emit');
    });
    socket.on('connected', function () {
        connectionLog('receeived connection confirmation');
    });
    socket.on('disconnect', function () {
        connectionLog('..disconnected');
        connectionTotal--;
        // postMetric('connection total', connectionTotal);
    });
});
io.listen(3000);
log('Listening on http://localhost:3000/');
