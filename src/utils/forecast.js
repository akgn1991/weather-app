const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5024ca092254aa7f65fec27cbf18641e&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                data:body.current.weather_descriptions[0]+' It is currently '+ body.current.temperature+' Deg.Celcious out',
                url
            })    
        }
    })
}

module.exports = forecast