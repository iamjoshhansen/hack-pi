import { socketPort } from './config';
import logger from './util/logger';
import Amount from './amount';
import Condition from './condition';

const io:SocketIO.Server = require('socket.io')();

const log = logger('io');

export const connectionCount = new Amount('io-connectionCount');
export const isConnected = new Condition('io-connection', connectionCount.amount > 0, (condition:Condition) => {
  connectionCount.on('change', (count:number) => {
    condition.set(count > 0);
  });
});

export default io;

let connectionId = 0;
io.on('connection', (socket:SocketIO.Socket) => {
  const connectionLog = logger(`app.connection.${connectionId++}`);
  connectionLog('We have a connection!');
  // postMetric('new connection');

  connectionCount.amount++;
  // postMetric('connection total', connectionCount.amount);

  socket.on('disconnect', () => {
    connectionLog('..disconnected');
    connectionCount.amount--;
    // postMetric('connection total', connectionCount.amount);
  });
});

const os = require('os');
const interfaces = os.networkInterfaces();
const addresses = [];
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

io.listen(socketPort);
log(`Listening on http://${addresses[0]}:${socketPort}/`);



