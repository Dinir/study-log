const request = require('request');

const key = '*';

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?' +
    `key=${key}&address=${encodedAddress}`,
    json: true,
  }, (error, response, body) => {
    if(error) {
      // error happened on the client
      callback('Unable to connect to Google servers.');
    } else if(body.status === 'ZERO_RESULTS') {
      // error happened on the server
      callback('Unable to find that address.');
    } else if(body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    }
  });
};

module.exports = {
  geocodeAddress
};