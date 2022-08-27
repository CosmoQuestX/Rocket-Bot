const Discord = require('discord.js');
//const { debug } = asyncLogs;

module.exports.run = async (client, message, args) => {
    let clientPing = new Date() - message.createdAt;
    let time1, time2, sendLaten, msg;

    let sndMsg = ":ping_pong: PONG!";
    time1 = new Date();
    msg = await message.channel.send(sndMsg);

    time2 = new Date(msg.createdAt);
    msg.delete();
    sendLaten = time2 - time1;

    let pEmbed = new Discord.MessageEmbed()
        .setTitle(":ping_pong: PONG!")
        .addFields(
            {
                name: ":inbox_tray: Download Latency: ",
                value: Math.round(clientPing) + "ms",
                inline: true
            },
            {
                name: ":outbox_tray: Upload Latency: ",
                value: Math.round(sendLaten) + "ms",
                inline: true
            },
            {
                name: ":bullettrain_side: API Latency:",
                value: Math.round(client.ws.ping) + "ms",
                inline: true
            }
        )
        .setColor("GREEN");

    // debug(time1, time2, sendLaten, clientPing, client.ws.ping);
    message.channel.send({ embeds: [ pEmbed ] });
}

exports.conf = { enabled: true }

exports.help = {
    name: "ping",
    description: "Pong!"
}