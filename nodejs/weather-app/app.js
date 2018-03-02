const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
    return;
  }
  console.log(results.address);
  weather.getWeather(
    results.latitude, results.longitude,
    (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
        return;
      }
      console.log(
        `It's currently ${weatherResults.temperature}, and it feels like ${weatherResults.apparentTemperature}.`
      );
    }
  );
});


