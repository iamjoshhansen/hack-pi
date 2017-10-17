"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var condition_1 = require("../condition");
var deferred_1 = require("../deferred");
var config_1 = require("../config");
;
var endpoint = "https://api.sunrise-sunset.org/json?lat=" + config_1.coords.lat + "&lng=" + config_1.coords.lng + "&formatted=0";
var fullDay = 1000 * 60 * 60 * 24;
// based on time of day.. just a guess for initial state
var guess = Math.abs(new Date().getHours() - 12) < 6;
exports.default = new condition_1.default('daytime', guess, function (self) {
    function getTimes() {
        var now = new Date();
        var today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        self.log("Getting times for " + today + "...");
        var url = endpoint + "&date=" + today;
        var dfr = new deferred_1.default();
        axios_1.default(url)
            .then(function (response) {
            /* SAMPLE RESPONSE DATA
            {
              results: {
                sunrise: '1:12:46 PM',
                sunset: '12:18:14 AM',
                solar_noon: '6:45:30 PM',
                day_length: '11:05:28',
                civil_twilight_begin: '12:45:30 PM',
                civil_twilight_end: '12:45:30 AM',
                nautical_twilight_begin: '12:14:02 PM',
                nautical_twilight_end: '1:16:58 AM',
                astronomical_twilight_begin: '11:42:40 AM',
                astronomical_twilight_end: '1:48:19 AM'
              },
              status: 'OK'
            }
            */
            // console.log('response.data: ', response.data);
            var resolution = {
                rise: new Date("" + response.data.results.sunrise),
                set: new Date("" + response.data.results.sunset),
            };
            dfr.resolve(resolution);
        })
            .catch(function (err) {
            console.warn('Condition Daytime Lookup Error');
            console.error(err);
            dfr.reject(err);
        });
        return dfr;
    }
    function getAndHandleTimes() {
        getTimes()
            .done(function (sun) {
            var now = new Date();
            // console.log('now: ', now.toString());
            // console.log('sun.rise: ', sun.rise.toString());
            // console.log('sun.set: ', sun.set.toString());
            var timeUntilSunrise = sun.rise.getTime() - now.getTime();
            // console.log('timeUntilSunrise: ', timeUntilSunrise);
            var hasRisen = timeUntilSunrise < 0;
            // console.log('hasRisen: ', hasRisen);
            var timeUntilSunset = sun.set.getTime() - now.getTime();
            // console.log('timeUntilSunset: ', timeUntilSunset);
            var hasSet = timeUntilSunset < 0;
            // console.log('hasSet: ', hasSet);
            var isDaytime = hasRisen && !hasSet;
            // console.log('isDaytime: ', isDaytime);
            self.set(isDaytime);
            // if the sun has not risen, set a timeout for that event
            if (!hasRisen) {
                setTimeout(function () {
                    self.set(true);
                }, sun.rise.getTime() - now.getTime());
            }
            // if the sun has not set, set a timeout for that event
            if (!hasSet) {
                setTimeout(function () {
                    self.set(false);
                }, sun.set.getTime() - now.getTime());
            }
        })
            .fail(function (er) {
            console.warn('Failed to get sunrise times');
            console.error(er);
        });
    }
    getAndHandleTimes();
    // Create daily interval, starting tomorrow
    var tomorrow_2am = new Date();
    tomorrow_2am.setDate(tomorrow_2am.getTime() + fullDay);
    tomorrow_2am.setHours(2);
    tomorrow_2am.setMinutes(0);
    tomorrow_2am.setSeconds(0);
    tomorrow_2am.setMilliseconds(0);
    var now = new Date();
    var timeUntil_2am = now.getTime() - tomorrow_2am.getTime();
    setTimeout(function () {
        setInterval(getAndHandleTimes, fullDay);
    }, timeUntil_2am);
});
