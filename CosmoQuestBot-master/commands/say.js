const { warn } = require('../public/async-logs');

module.exports.run = async (client, msg, args) => {

    try {
        if (!msg.member.hasPermission("ADMINISTRATOR")) throw new Error(`Failed to run say command. Attempt by ${msg.author.id}.\nReason: Not an Administrator`);
        if (msg.member.bot) throw new Error(`Failed to run say command. Attempt by ${msg.author.id}.\nReason: Bot`);
        msg.delete().catch(O_o=>{});
        if (args.length < 1) return void(0);
        
        const sayMessage = args.join(" ");
        msg.channel.send(sayMessage);
    
    } catch (e) {
        throw e;
    }

    /* if(msg.member.hasPermission("ADMINISTRATOR") && !msg.member.bot && args.length > 0) {

        const sayMessage = args.join(" ");

        msg.delete().catch(O_o=>{}); 

        msg.channel.send(sayMessage);
    } else {
        warn("Failed to run say command. Attempt by " + msg.author.id + ".\nReason: " + (!msg.member.hasPermission("ADMINISTRATOR") ? "Not an Administrator" : "Bot"));
        return void(0);
    } */
};

exports.conf = { enabled: true }

exports.help = {
    name: 'say',
    aliases: [],
	description: 'Announce using the bot.',
    usage: "say <message>"
}