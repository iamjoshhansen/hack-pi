"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pin_out_1 = require("./pin-out");
var pin_in_1 = require("./pin-in");
exports.sprinkler_front_near = new pin_out_1.default({
    "id": "sprinkler_front_near",
    "label": "Sprinkler: Front",
    "pin": 4,
});
exports.sprinkler_front_far = new pin_out_1.default({
    "id": "sprinkler_front_far",
    "label": "Sprinkler: Sidewalk",
    "pin": 14,
});
exports.drip_front = new pin_out_1.default({
    "id": "drip_front",
    "label": "Drip: Front",
    "pin": 17,
});
exports.sprinkler_back_near = new pin_out_1.default({
    "id": "sprinkler_back_near",
    "label": "Sprinkler: Near Back",
    "pin": 15,
});
exports.sprinkler_back_far = new pin_out_1.default({
    "id": "sprinkler_back_far",
    "label": "Sprinkler: Far Back",
    "pin": 27,
});
exports.drip_back_1 = new pin_out_1.default({
    "id": "drip_back_1",
    "label": "Drip: Back 1",
    "pin": 18,
});
exports.drip_back_2 = new pin_out_1.default({
    "id": "drip_back_2",
    "label": "Drip: Back 2",
    "pin": 22,
});
exports.drip_back_3 = new pin_out_1.default({
    "id": "drip_back_3",
    "label": "Drip: Back 2",
    "pin": 23,
});
exports.front_path_lights = new pin_out_1.default({
    "id": "front_path_lights",
    "label": "Front Path Lights",
    "pin": 10,
});
exports.salt_lamp = new pin_out_1.default({
    "id": "salt_lamp",
    "label": "Salt Lamp",
    "pin": 24,
});
exports.desk_lamp = new pin_out_1.default({
    "id": "desk_lamp",
    "label": "Desk Lamp",
    "pin": 9,
});
exports.led_lamp = new pin_out_1.default({
    "id": "led_lamp",
    "label": "LED Lamp",
    "pin": 25,
});
exports.tbd_5 = new pin_out_1.default({
    "id": "tbd_5",
    "label": "TBD 5",
    "pin": 11,
});
exports.tbd_6 = new pin_out_1.default({
    "id": "tbd_6",
    "label": "TBD 6",
    "pin": 8,
});
exports.tbd_7 = new pin_out_1.default({
    "id": "tbd_7",
    "label": "TBD 7",
    "pin": 5,
});
exports.tbd_8 = new pin_out_1.default({
    "id": "tbd_8",
    "label": "TBD 8",
    "pin": 7,
});
exports.green_led = new pin_out_1.default({
    "id": "green_led",
    "label": "Green Circle LED",
    "pin": 21,
});
exports.circle_button = new pin_in_1.default({
    "id": "circle_button",
    "label": "Green Circle Button",
    "pin": 20,
});
