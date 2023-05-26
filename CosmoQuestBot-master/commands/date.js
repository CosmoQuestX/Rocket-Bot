const { debug, error } = asyncLogs;
const { EmbedBuilder } = require('discord.js');
const { getJulianDay, getFormattedDate } = require('./modules/date');

exports.run = async (client, msg, args) => {
    try {
        const t = new Date();
        const embed = new EmbedBuilder()
            .setColor(0xfff8e7) // Cosmic Latte
            .setTitle("Date / Time")
            .setTimestamp(t)
            .addFields(
                {
                    name: "Julian Day",
                    value: String(getJulianDay(t)),
                    inline: true
                },
                {
                    name: "UTC",
                    value: getFormattedDate(t),
                    inline: true
                }
            );
        msg.channel.send({ embeds: [ embed ] });
    } catch (e) {
        error(e);
    }
};

exports.conf = {
    enabled: true
};

exports.help = {
    name: "date",
    aliases: [
        "time"
    ],
    description: `Returns the date/time in multiple formats (Gregorian [with TZs] & Julian day).`,
    usage: "date"
};

/*
Main src: https://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
*/