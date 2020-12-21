const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url =
      `http://api.weatherstack.com/current?access_key=849c20dc82ae1b41394e5c029d6d9547&query=${latitude},${longitude}&units=m`;
          request ( {url, json: true}, (error, {body}) => {
            if (error) {
              callback ("Unable to connect to weather service", undefined)
            } else if (body.error) {
              callback ("Unable to find location", undefined)
            } else {
              callback (undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. And it is ${body.current.weather_descriptions[0]}`)
            }
          }) 
    
    }

    module.exports = forecast;