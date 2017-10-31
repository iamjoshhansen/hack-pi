import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import fetch from 'node-fetch';
import { coords, weatherAppId } from '../config';
import Amount from '../amount';
import Value from '../value';
import Deferred from '../deferred';
import duration from '../util/duration';
import logger from '../util/logger';
import { logType } from '../util/logger';
import readableDuration from '../util/readable-duration';


export const state = new Value('Current Weather State');
export const description = new Value('Current Weather Description');
export const temperature = new Amount('Current Temperature');
export const pressure = new Amount('Current Pressure');
export const humidity = new Amount('Current Humidity');
export const minTemperature = new Amount('Today\'s Min Temperature');
export const maxTemperature = new Amount('Today\'s Max Temperature');
export const windSpeed = new Amount('Current Wind Speed');
export const windDirection = new Amount('Current Wind Direction');
export const clouds = new Amount('Current Clouds');
export const rain = new Amount('Last 3h of Rain');
export const snow = new Amount('Last 3h of Snow');

const log = logger('weather api');

const weatherEndpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${weatherAppId}`;

export type WeatherApiResponse = {
  "coord": {
    "lon": number,
    "lat": number,
  },
  "weather": Array<{
    "id": number,
    "main": string,
    "description": string,
    "icon": string,
  }>,
  "base": string,
  "main": {
    "temp": number,
    "pressure": number,
    "humidity": number,
    "temp_min": number,
    "temp_max": number,
    "sea_level": number,
    "grnd_level": number,
  },
  "wind": {
    "speed": number,
    "deg": number,
  },
  "clouds": {
    "all": number,
  },
  "rain": {
    "3h": number,
  },
  "snow": {
    "3h": number,
  },
  "dt": number,
  "sys": {
    "message": number,
    "country": string,
    "sunrise": Date,
    "sunset": Date,
  },
  "id": number,
  "name": string,
  "cod": number,
};

function k2F (kelvin:number) : number {
  return Math.round((kelvin * (9/5)) - 459.67);
}

function fetchWeather () {

  const now = new Date();
  const dataDfr = new Deferred();
  const cacheFilename = './weather-cache.json';

  const exists = existsSync(cacheFilename);
  let shouldMakeRequest = false;

  if (exists) {
    const stats = statSync(cacheFilename);
    const delta = now.getTime() - stats.mtime.getTime();
    const isOld = delta > duration('10m');

    log('cache file was updated last: ', readableDuration(delta));

    if (isOld) {
      shouldMakeRequest = true;
    }
  } else {
    shouldMakeRequest = true;
  }

  log(`Fetching weather data from ${shouldMakeRequest ? 'the network' : 'cache'}`);

  if (shouldMakeRequest) {
    fetch(weatherEndpoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // update cache
        writeFileSync(cacheFilename, JSON.stringify(data, null, 4));

        // resolve dfr
        dataDfr.resolve(data);
      })
      .catch((er) => {
        dataDfr.reject(er);
      });
  } else {
    const json = readFileSync(cacheFilename).toString();
    const data = JSON.parse(json);
    dataDfr.resolve(data);
  }

  dataDfr
    .done((data:WeatherApiResponse) => {
      state.value = data.weather[0].main;
      description.value = data.weather[0].description;
      temperature.amount = k2F(data.main.temp);
      pressure.amount = data.main.pressure;
      humidity.amount = data.main.humidity;
      minTemperature.amount = k2F(data.main.temp_min);
      maxTemperature.amount = k2F(data.main.temp_max);
      windSpeed.amount = data.wind.speed;
      windDirection.amount = data.wind.deg;
      clouds.amount = data.clouds.all;
      if ('rain' in data) {
        rain.amount = data.rain['3h'];
      }
      if ('snow' in data) {
        snow.amount = data.snow['3h'];
      }
      log('...done');
    })
    .fail((er) => {
      log('ERROR');
    });

}

fetchWeather();
setInterval(fetchWeather, duration('15m'));
