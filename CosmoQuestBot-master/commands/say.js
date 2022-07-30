const Discord = require("discord.js")

module.exports.help = {
    name: 'say',
    aliases: [],
	description: 'Announce using the bot.',
}

module.exports.run = async (client, msg, args) => {

    if(msg.member.hasPermission("ADMINISTRATOR") && !msg.member.bot) {

        const sayMessage = args.join(" ");

        msg.delete().catch(O_o=>{}); 

        msg.channel.send(sayMessage);
    } else {
        console.warn("Failed to run say command. Attempt by " + msg.author.id + ".\nReason: " + (!msg.member.hasPermission("ADMINISTRATOR") ? "Not an Administrator" : "Bot"));
        return void(0);
    }
};