const { warn, debug } = require('../public/async-logs');

exports.run = function metar (_, msg, args) {

    if (args.length < 1) throw  "No station specified";

    args = args.join(' ');

/* NOAA ADDS: https://aviationweather.gov/dataserver
    METAR: https://aviationweather.gov/dataserver/example?datatype=metar

    // stationString=CYOW
    // &most_recent=true
*/

    // Parse the parameters
    // Build the URL
    // Retrieve the data
    // Parse the results

    msg.reply({
        "embeds": [
            {
                "title": `METAR for ${result.station_id}\n`,
                "observation": `CYOW XXXXXXXXXXX\n`,
                "source": `NOAA ADDS\n`
            }
        ]
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 1,
    type: 5
};

exports.help = {
    name: `metar`,
    aliases: [],
    description: `Retrieve the most recent METAR for an airport.`,
    usage: `metar <ICAO airport code> (e.g., metar cyow)`
};
