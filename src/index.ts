import logger from './logger';
import { green_led } from './pins';
import { circle_button } from './pins';
import { front_path_lights } from './pins';
import { led_lamp } from './pins';
import { desk_lamp } from './pins';
import daytime from './conditions/daytime';
import notifier from './notifier';
// import postMetric from './metrics';

const log = logger('app');

// daytime.on('change', (state:boolean) => {
//   log('changing something because daytime is: ', state);
// });

const msg:String = 'Hello Sockets!';
log(msg);

log(`The ${front_path_lights.label} are currently ${front_path_lights.state?'on':'off'}`);
front_path_lights.followCondition(daytime, true);

log(`The ${led_lamp.label} is currently ${led_lamp.state?'on':'off'}`);
led_lamp.followCondition(daytime);

daytime
  .on('change', (state:boolean) => {
    notifier(state ? 'Sunrise' : 'Sunset');
  });

green_led.followPin(circle_button);

circle_button.on('activate', () => {
  desk_lamp.toggle();
});

// setInterval(() => {
//   console.log('-------');
//   circle_button.pin.writeSync((circle_button.pin.readSync() === 0) ? 1 : 0);
// }, 5000);







const io:SocketIO.Server = require('socket.io')();

let connectionId = 0;
let connectionTotal = 0;
io.on('connection', (socket:SocketIO.Socket) => {
  const connectionLog = logger(`app.connection.${connectionId++}`);
  connectionLog('We have a connection!');
  // postMetric('new connection');

  connectionTotal++;
  // postMetric('connection total', connectionTotal);

  socket.emit('msg', 'Hello!');
  connectionLog('Saying hello');

  socket.on('the-ping', () => {
    connectionLog('receeived the-ping, emitting pong');
    socket.emit('msg', 'socket emit');
    socket.broadcast.emit('msg','socket broadcast emit');

    io.emit('msg','io emit');
  });

  socket.on('connected', () => {
    connectionLog('receeived connection confirmation');
  });

  socket.on('disconnect', () => {
    connectionLog('..disconnected');
    connectionTotal--;
    // postMetric('connection total', connectionTotal);
  });
});

io.listen(3000);
log('Listening on http://localhost:3000/');
