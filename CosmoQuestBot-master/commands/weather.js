const weather = require('./weather-js/openWeatherMap/index.js'); // Weather data API


exports.run = (_, message, args) => {
    args = args.join(' ');
    
    weather.find({search: args, unitsType: 'metric'}, function(err, result) {
        if(err) {
            console.warn(err);
            return message.channel.send("😞 An error has occurred");
        }

        // console.debug(JSON.stringify(result, null, 2));
        
        if (result === undefined) message.channel.send("😞 Error parsing data.");
        if (typeof result.success !== 'boolean' || result.success === false) return message.channel.send(result.message || "😞 An unspecified error has occurred.");
        if (!result.weather[0] || typeof result.main.temp !== "number") return message.channel.send(result.message || "😞 No data. An unknown error has occurred.");
        message.channel.send({
            "embed": {
                "title": `The Weather in **${result.name}, ${result.sys.country}**`,
                "description": `**Sky**: ${result.weather[0].description}\n**Temperature**: ${result.main.temp}°C\t[${result.main.temp_max}°C / ${result.main.temp_min}°C]\n**Feels Like**: ${result.main.feels_like}°C\n**Humidity**: ${result.main.humidity}%\n**Pressure**: ${result.main.pressure}hPa\n**Wind**: ${result.wind.speed}m/s ${result.wind.cardinal}\n**Gust**: ${result.wind.gust}\n**Visibility**: ${Math.floor(result.visibility / 1000)}km`,
                "color": 4321431,
                "timestamp": (new Date(result.dt * 1000)),
                "url": `https://openweathermap.org/`,
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
    usage: `!weather <city name>, <state name [optional]>, <country alpha-2 (ISO 3166)>`
};
