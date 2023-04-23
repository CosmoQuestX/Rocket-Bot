const {getReport} = require("./modules/aviationWeather");

exports.run = async (_, msg, args) => {
    const icao = args[0];

    const resp = await getReport('tafs', icao, { hoursBeforeNow: 12 });

    msg.channel.send(resp);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 1,
    type: 5,
    await: true
};

exports.help = {
    name: `taf`,
    aliases: [],
    description: `Retrieve the most recent TAF for an airport.`,
    usage: `taf <ICAO airport code> (e.g., taf cyow)`
};
