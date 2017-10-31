import Socketcondition from '../condition-socket';
import io from '../io';

export const desk_lamp = new Socketcondition('desk_lamp', io);
export const salt_lamp = new Socketcondition('salt_lamp', io);
