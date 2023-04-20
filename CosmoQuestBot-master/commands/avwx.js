const {getReport} = require('./modules/aviationWeather');
const {prefix} = require('../config.json');

exports.run = async (_, msg, args) => {
    const icao = args[0];

    const resp1 = await getReport('metars', icao, { hoursBeforeNow: 3 }),
    resp2 = await getReport('tafs', icao, { hoursBeforeNow: 12 });

    msg.channel.send(`${resp1}\n${resp2}`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 1,
    await: true,
    type: 5
};

exports.help = {
    name: `avwx`,
    aliases: [],
    description: `Retrieve the most recent TAF & METAR for an airport.`,
    usage: `avwx <ICAO airport code> (e.g., ${prefix}avwx cyow)`
};
