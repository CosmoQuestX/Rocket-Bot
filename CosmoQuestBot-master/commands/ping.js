const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    let clientping = new Date() - message.createdAt;

    message.channel.send(`${message.author}`)
    let pEmbed = new Discord.MessageEmbed()
        .setTitle("Application Programming Interface (API)")
        .setDescription("Ping is a command used to measure the response time of your computer's connection to other devices on the local network or the Internet")
        .setURL('https://en.m.wikipedia.org/wiki/Application_programming_interface')
        .addField(":robot:BOT: ", Math.floor(clientping) + "ms")
        .addField(":date:DATE:", message.createdAt)
         .setFooter('CosmoQuest X Bot' , 'https://pbs.twimg.com/media/ETQLceGWAAI2GiY.png')
        .setColor("GREEN")

        message.channel.send(pEmbed)
}

module.exports.help = {
    name: "!ping"
}