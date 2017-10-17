import axios from 'axios';
import { AxiosResponse } from 'axios';
import Condition from '../condition';
import Deferred from  '../deferred';
import { coords } from '../config';

interface Resolution {
  rise: Date,
  set: Date,
};

const endpoint = `https://api.sunrise-sunset.org/json?lat=${coords.lat}&lng=${coords.lng}&formatted=0`;
const fullDay = 1000 * 60 * 60 * 24;

// based on time of day.. just a guess for initial state
const guess = Math.abs(new Date().getHours() - 12) < 6;

export default new Condition('daytime', guess, (self:Condition) => {

  function getTimes () : Deferred {
    const now:Date = new Date();
    const today:string = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    self.log(`Getting times for ${today}...`);
    const url:string = `${endpoint}&date=${today}`;
    const dfr:Deferred = new Deferred();

    axios(url)
      .then((response:AxiosResponse) => {

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

        const resolution:Resolution = {
          rise: new Date(`${response.data.results.sunrise}`),
          set: new Date(`${response.data.results.sunset}`),
        };

        dfr.resolve(resolution);
      })
      .catch((err:Error) => {
        console.warn('Condition Daytime Lookup Error');
        console.error(err);
        dfr.reject(err);
      });

    return dfr;
  }

  function getAndHandleTimes () {
    getTimes()
      .done((sun:Resolution) => {
        const now:Date = new Date();

        // console.log('now: ', now.toString());
        // console.log('sun.rise: ', sun.rise.toString());
        // console.log('sun.set: ', sun.set.toString());

        const timeUntilSunrise:number = sun.rise.getTime() - now.getTime();
        // console.log('timeUntilSunrise: ', timeUntilSunrise);

        const hasRisen:boolean = timeUntilSunrise < 0;
        // console.log('hasRisen: ', hasRisen);

        const timeUntilSunset:number = sun.set.getTime() - now.getTime();
        // console.log('timeUntilSunset: ', timeUntilSunset);

        const hasSet:boolean = timeUntilSunset < 0;
        // console.log('hasSet: ', hasSet);

        const isDaytime = hasRisen && ! hasSet;
        // console.log('isDaytime: ', isDaytime);

        self.set(isDaytime);

        // if the sun has not risen, set a timeout for that event
        if ( ! hasRisen) {
          setTimeout(() => {
            self.set(true);
          }, sun.rise.getTime() - now.getTime());
        }

        // if the sun has not set, set a timeout for that event
        if ( ! hasSet) {
          setTimeout(() => {
            self.set(false);
          }, sun.set.getTime() - now.getTime());
        }
      })
      .fail((er:Error) => {
        console.warn('Failed to get sunrise times');
        console.error(er);
      });
  }

  getAndHandleTimes();

  // Create daily interval, starting tomorrow
  const tomorrow_2am = new Date();
  tomorrow_2am.setDate(tomorrow_2am.getTime() + fullDay);
  tomorrow_2am.setHours(2);
  tomorrow_2am.setMinutes(0);
  tomorrow_2am.setSeconds(0);
  tomorrow_2am.setMilliseconds(0);

  const now:Date = new Date();
  const timeUntil_2am = now.getTime() - tomorrow_2am.getTime();

  setTimeout(() => {
    setInterval(getAndHandleTimes, fullDay);
  }, timeUntil_2am);

});
