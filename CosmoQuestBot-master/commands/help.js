const { debug, warn } = require('../public/async-logs');
const { prefix, userId } = require('../config.json');

var list,
    embed;

exports.setup = (help) => {
    list = help;
    let temp;

    for (const val of list) {
        temp = {};
        
    }

    return true;
}

exports.run = async function help (client, msg, args) {
    let command = (typeof args[0] === 'string' ? args[0].replace(RegExp(`^${prefix}`), '') : undefined); // if arg given, remove prefix (if any)
    
    switch (typeof args[0]) {
        case 'string': // if command is specified
            cmd = client.commands.get(command);
            
            if (typeof cmd !== "object") {
                return;
            }
            
            await msg.reply(
                `\n**Name**: \`${prefix}${cmd.help.name}\`` +
                ((typeof cmd.help.description === "string" && cmd.help.description.length > 0) ? `\n**Description**: ${cmd.help.description}` : ``) +
                ((Array.isArray(cmd.help.aliases) && cmd.help.aliases.length > 0) ? `\n**Aliases**: \`${prefix}${cmd.help.aliases.join(`, ${prefix}`)}\`` : '') +
                ((args[1] === "debug" && (msg.member.hasPermission("ADMINISTRATOR") || msg.member.userID === userId)) ? `\n**Debug**: \`${JSON.stringify(cmd.conf)}\`` : '')
                );
            break;
        default:
            // return full list (maybe in pages)
            /* wildcard help not imlemented yet */
            break;
    }
}
        
exports.conf = {
    enabled: true,
    permLevel: 1,
    type: 5
};

exports.help = {
    name: `help`,
    aliases: [
        "commands"
    ],
    description: `Get the list of commands.`,
    usage: `help [command]`
};

debug('ping');