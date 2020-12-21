const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=8ab72294bd9967730b98d0f868fa0a2a&limit=1&query=${address}`;
  
    request({ url, json:true}, (error, {body})=> {
      if (error) {
        callback('Unable to connect to location services', undefined)
      } else if(!body.data) {
        callback('Address appears to be incorrect', undefined)
      } else {
        callback(undefined, {
          latitude: body.data[0].latitude,
          longitude: body.data[0].longitude,
          place: body.data[0].label
        })
      }
    })
  }

  module.exports = geocode;
