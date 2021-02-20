var weather = require('weather-js');

exports.run = (client, message, args) => {
  weather.find({search: args, degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    //console.log(JSON.stringify(result, null, 2));
    if (!result) return message.channel.send(`This city doesn't exist.`)
    if (!result[0]) return message.channel.send(`This city doesn't exist.`)
    message.channel.send({
      embed: {
        thumbnail: 
        {
  				url: result[0].current.imageUrl
  			},
        title: `The Weather Now`,
        url: 'https://www.msn.com/en-us/Weather',
        description: `Location: ${result[0].location.name}\nSky: ${result[0].current.skytext}\nTemperature: ${result[0].current.temperature}\nFeels Like: ${result[0].current.feelslike}°C\nHumidity: ${result[0].current.humidity}%\nWindspeed: ${result[0].current.winddisplay}
        \n**Location**\nLatitude: ${result[0].location.lat}\nLongitude: ${result[0].location.long}\nTimezone: ${result[0].location.timezone}\nDegree Type: ${result[0].location.degreetype}
        \n**Advanced Data**\nDate: ${result[0].current.date}\nObservation Time: ${result[0].current.observationtime}\nObservation Point: ${result[0].current.observationpoint}\nSky Code: ${result[0].current.skycode}\nAlert: ${result[0].location.alert}`,
        color: 000080
      }
    });
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
  usage: `!weather <city name>`
};
