const { warn, debug } = asyncLogs;
const { devId } = config;
const { PermissionFlagsBits } = require('discord.js');

module.exports.run = async (client, msg, args) => {

    try {
        if (!msg.member.permissions.has(PermissionFlagsBits.Administrator) && msg.author.id !== devId) throw `Failed to run say command. Attempt by ${msg.author.id}.\nReason: Not an Administrator\n`;
        if (msg.member.bot) throw `Failed to run say command. Attempt by ${msg.author.id}.\nReason: Bot\n`;
        msg.delete().catch(O_o=>{});
        if (args.length < 1) return;
        
        const sayMessage = args.join(" ");
        msg.channel.send(sayMessage);
    
    } catch (e) {
        warn(e);
    }
};

exports.conf = { enabled: true }

exports.help = {
    name: 'say',
    aliases: [],
	description: 'Announce using the bot.',
    usage: "say <message>",
    omit: true
}