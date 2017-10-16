import Pin from './pin';
import PinOut from './pin-out';
import PinIn from './pin-in';

export const sprinkler_front_near = new PinOut({
  "id": "sprinkler_front_near",
  "label": "Sprinkler: Front",
  "pin": 4,
});

export const sprinkler_front_far = new PinOut({
  "id": "sprinkler_front_far",
  "label": "Sprinkler: Sidewalk",
  "pin": 14,
});

export const drip_front = new PinOut({
  "id": "drip_front",
  "label": "Drip: Front",
  "pin": 17,
});

export const sprinkler_back_near = new PinOut({
  "id": "sprinkler_back_near",
  "label": "Sprinkler: Near Back",
  "pin": 15,
});

export const sprinkler_back_far = new PinOut({
  "id": "sprinkler_back_far",
  "label": "Sprinkler: Far Back",
  "pin": 27,
});

export const drip_back_1 = new PinOut({
  "id": "drip_back_1",
  "label": "Drip: Back 1",
  "pin": 18,
});

export const drip_back_2 = new PinOut({
  "id": "drip_back_2",
  "label": "Drip: Back 2",
  "pin": 22,
});

export const drip_back_3 = new PinOut({
  "id": "drip_back_3",
  "label": "Drip: Back 2",
  "pin": 23,
});

export const front_path_lights = new PinOut({
  "id": "front_path_lights",
  "label": "Front Path Lights",
  "pin": 10,
});

export const salt_lamp = new PinOut({
  "id": "salt_lamp",
  "label": "Salt Lamp",
  "pin": 24,
});

export const desk_lamp = new PinOut({
  "id": "desk_lamp",
  "label": "Desk Lamp",
  "pin": 9,
});

export const led_lamp = new PinOut({
  "id": "led_lamp",
  "label": "LED Lamp",
  "pin": 25,
});

export const tbd_5 = new PinOut({
  "id": "tbd_5",
  "label": "TBD 5",
  "pin": 11,
});

export const tbd_6 = new PinOut({
  "id": "tbd_6",
  "label": "TBD 6",
  "pin": 8,
});

export const tbd_7 = new PinOut({
  "id": "tbd_7",
  "label": "TBD 7",
  "pin": 5,
});

export const tbd_8 = new PinOut({
  "id": "tbd_8",
  "label": "TBD 8",
  "pin": 7,
});

export const green_led = new PinOut({
  "id": "green_led",
  "label": "Green Circle LED",
  "pin": 21,
});

export const circle_button = new PinIn({
  "id": "circle_button",
  "label": "Green Circle LED",
  "pin": 20,
});
