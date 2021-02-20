const Discord = require("discord.js")

module.exports.help = {
    name: 'say',
    aliases: [],
	description: 'Announce using the bot.',
}

module.exports.run = async (client, message, args) => {

    if(message.author.id === "662820223250071624") {

        const sayMessage = args.join(" ");

        message.delete().catch(O_o=>{}); 

        message.channel.send(sayMessage);

    } else {

        message.reply("For security reasons, only developers and a restricted audience can use this function.");
        
    }
};