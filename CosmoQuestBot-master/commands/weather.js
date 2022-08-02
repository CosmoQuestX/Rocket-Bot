const weather = require('./weather-js/openWeatherMap'); // Weather data API
const { warn, debug } = require('../public/async-logs');


exports.run = (_, message, args) => {

    if (args.length < 1) throw "No arguments passed";

    args = args.join(' ');
    
    weather.find({search: args, unitsType: 'metric'}, function(err, result) {

        // Error Messages
        if(err) {
            warn(err);
            if (!result) return message.channel.send({
                "embed": {
                    "title": ":warning: A critical error occurred!",
                    "description": "Check logs for more detailed information."
                }
            }); // Send error message if no info given
        }

        // debug(JSON.stringify(result, null, 2));
        
        if (result === undefined) return message.channel.send({
            "embed": {
                "title": ":warning: Error parsing data!",
                "description": "Check logs for more detailed information."
            }
        });

        if (typeof result.success !== 'boolean' || result.success === false) return message.channel.send(`:warning: ${result.message || "An unspecified error occurred."}`);

        if (!result.weather[0]) return message.channel.send({
            "embed": {
                "title": `:warning: ${result.message || "No data. An unknown error occurred."}`,
                "description": "Check logs for more detailed information."
            }
        });

        // SUCCESS! Sending the data now...
        message.channel.send({
            "embed": {
                "title": `The Weather in **${result.name}, ${result.sys.country}**\n`,

                "url": `https://openweathermap.org/city/${result.id}`,

                "description": `**Sky**: ${result.weather[0].description}\n` +
                ((!isNaN(result.main.temp)) ? `**Temperature**: ${result.main.temp}°C\t[${result.main.temp_max}°C / ${result.main.temp_min}°C]\n` : ``) +
                ((!isNaN(result.main.feels_like)) ? `**Feels Like**: ${result.main.feels_like}°C\n` : ``) +
                ((!isNaN(result.main.humidity)) ? `**Humidity**: ${result.main.humidity}%\n` : ``) +
                ((!isNaN(result.main.pressure)) ? `**Pressure**: ${result.main.pressure}hPa\n` : ``) +
                ((!isNaN(result.wind.speed)) ? `**Wind Speed**: ${result.wind.speed}m/s [${result.wind.cardinal}]\n` : ``) +
                ((!isNaN(result.wind.gust)) ? `**Wind Gust**: ${result.wind.gust}m/s\n` : ``) +
                ((!isNaN(result.visibility)) ? `**Visibility**: ${Math.floor(result.visibility / 1000)}km` : ``),

                "color": 0x41f097,

                "timestamp": (new Date(result.dt * 1000)),

                "thumbnail": {
                    "url": `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
                },

                "image": { // Possible map in the future
                    "url": ""
                },

                "fields": [
                    { // Sadly I need to use a cheat to force inline
                        "name": "\u200C",
                        "value": "\u200C",
                        "inline": true
                    },
                    {
                        "name": "City",
                        "value": `${result.name}`,
                        "inline": true
                    }, // Add States?
                    {
                        "name": "Country",
                        "value": `${result.sys.country}`,
                        "inline": true
                    },
                    {
                        "name": "\u200C",
                        "value": "\u200C",
                        "inline": true
                    },
                    {
                        "name": "Longitude",
                        "value": `${result.coord.lon}`,
                        "inline": true
                    },
                    {
                        "name": "Latitude",
                        "value": `${result.coord.lat}`,
                        "inline": true
                    }
                ]
            }
        })
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1,
    type: 5
};

exports.help = {
    name: `weather`,
    description: `Get the weather of a city.`,
    usage: `weather <city name>, <US state name [optional]>, <country alpha-2 (ISO 3166)>`
};
