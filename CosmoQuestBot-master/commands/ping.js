const Discord = require('discord.js')

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
        .addField(":inbox_tray: Download Latency: ", Math.round(clientPing) + "ms", true)
        .addField(":outbox_tray: Upload Latency: ", Math.round(sendLaten) + "ms", true)
        .addField(":bullettrain_side: API Latency:", Math.round(client.ws.ping) + "ms", true)
        .setColor("GREEN")
    // console.debug(time1, time2, sendLaten, clientPing, client.ws.ping);
    message.channel.send(pEmbed);
}

module.exports.help = {
    name: "!ping"
}