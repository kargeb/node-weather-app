  
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=809551d986d185133b204e2ce1981584&query=' + latitude + "," + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + 'degress feelslike. And this is an additional text to test updating changes')
            // callback(undefined, {forecast: body.current.weather_descriptions[0]})
        }
    })
}

module.exports = forecast