import SocketCondition from '../condition-socket';
import io from '../io';

// Lamps
export const desk_lamp = new SocketCondition('desk_lamp', io);
export const salt_lamp = new SocketCondition('salt_lamp', io);
