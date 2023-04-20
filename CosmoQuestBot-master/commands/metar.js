const {getReport} = require('./modules/aviationWeather');

exports.run = async (_, msg, args) => {
    const icao = args[0];

    const resp = await getReport('metars', icao, { hoursBeforeNow: 3 });

    msg.channel.send(resp);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 1,
    await: true,
    type: 5
};

exports.help = {
    name: `metar`,
    aliases: [],
    description: `Retrieve the most recent METAR for an airport.`,
    usage: `metar <ICAO airport code> (e.g., metar cyow)`
};
