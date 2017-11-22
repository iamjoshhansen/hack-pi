import SocketCondition from '../condition-socket';
import io from '../io';

// Lamps
export const desk_lamp = new SocketCondition('desk_lamp', io);
export const salt_lamp = new SocketCondition('salt_lamp', io);

// BlueBox
export const bluebox_0 = new SocketCondition('bluebox_0', io);
export const bluebox_1 = new SocketCondition('bluebox_1', io);
export const bluebox_2 = new SocketCondition('bluebox_2', io);
export const bluebox_3 = new SocketCondition('bluebox_3', io);
