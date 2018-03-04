const request = require('request');
require('rootpath')();

const key = require('geocode/key').key;

const geocodeAddress = address => {
  const encodedAddress = encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?' +
      `key=${key}&address=${encodedAddress}`,
      json: true,
    }, (error, response, body) => {
      if(error) {
        // error happened on the client
        reject('Unable to connect to Google servers.');
      } else if(body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      } else {
        // error happened on the server
        reject(`${body.status}: Unable to find that address.`);
      }
    }); // request
  }); // new Promise
}; // geocodeAddress

geocodeAddress('19146').then(location => {
  console.log(JSON.stringify(location, undefined, 2));
}, errorMessage => {
  console.log(errorMessage);
});