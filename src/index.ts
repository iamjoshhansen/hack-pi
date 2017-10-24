import logger from './util/logger';
import { green_led } from './pins';
import { circle_button } from './pins';
import { front_path_lights } from './pins';
import { led_lamp } from './pins';
import { desk_lamp } from './pins';
import { sprinkler_front_near } from './pins';
import { sprinkler_front_far } from './pins';
import { drip_front } from './pins';
import { sprinkler_back_near } from './pins';
import { sprinkler_back_far } from './pins';
import { drip_back_1 } from './pins';
import { drip_back_2 } from './pins';
import { drip_back_3 } from './pins';
import { salt_lamp } from './pins';
import { tbd_5 } from './pins';
import { tbd_6 } from './pins';
import { tbd_7 } from './pins';
import { tbd_8 } from './pins';
import daytime from './conditions/daytime';
import notifier from './notifier';
// import postMetric from './metrics';

console.log(`



88  88  dP"Yb  8b    d8 888888        db    88   88 888888  dP"Yb  8b    d8    db    888888 88  dP"Yb  88b 88      dP""b8  dP"Yb  88b 88 888888 88""Yb  dP"Yb  88         88  dP 888888 88""Yb 88b 88 888888 88
88  88 dP   Yb 88b  d88 88__         dPYb   88   88   88   dP   Yb 88b  d88   dPYb     88   88 dP   Yb 88Yb88     dP   '" dP   Yb 88Yb88   88   88__dP dP   Yb 88         88odP  88__   88__dP 88Yb88 88__   88
888888 Yb   dP 88YbdP88 88""        dP__Yb  Y8   8P   88   Yb   dP 88YbdP88  dP__Yb    88   88 Yb   dP 88 Y88     Yb      Yb   dP 88 Y88   88   88"Yb  Yb   dP 88  .o     88"Yb  88""   88"Yb  88 Y88 88""   88  .o
88  88  YbodP  88 YY 88 888888     dP""""Yb 'YbodP'   88    YbodP  88 YY 88 dP""""Yb   88   88  YbodP  88  Y8      YboodP  YbodP  88  Y8   88   88  Yb  YbodP  88ood8     88  Yb 888888 88  Yb 88  Y8 888888 88ood8


Version 3.0
`);

const log = logger('app');

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






/*
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
*/
