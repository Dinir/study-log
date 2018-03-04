const yargs = require('yargs');
const axios = require('axios');
const key = {
  geocode: require('./geocode/key').key,
  darksky: require('./weather/key').key
};

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      string: true,
      describe: 'Address to fetch weather for',
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?' +
  `key=${key.geocode}&address=${encodedAddress}`;

axios.get(geocodeUrl)
  .then(response => {
    if(response.data.status !== 'OK') {
      // any error threw is immediately getting handled by `.catch()` block.
      throw new Error('Unable to find that address.');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const darkskyUrl = `https://api.darksky.net/forecast/${key.darksky}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(darkskyUrl);
  }).then(response => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}, and it feels like ${apparentTemperature}.`);
  }).catch(e => {
    if(e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log('Error:', e.message);
    }
  });