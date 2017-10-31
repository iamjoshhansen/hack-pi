import Condition from './condition';

export default class SocketCondition extends Condition {

  id:string;

  constructor (id:string, io:SocketIO.Server) {

    super(`socket:${id}`, false, (condition:Condition) => {

      io.on('connection', (socket:SocketIO.Socket) => {
        socket.on(`set-condition-${id}`, (val:boolean, callback:Function) => {
          condition.set(val);
          callback(true);
        });

        socket.on(`get-condition-${id}`, (callback:Function) => {
          callback(condition.get());
        });
      });

    });

    this.id = id;
  }
}
