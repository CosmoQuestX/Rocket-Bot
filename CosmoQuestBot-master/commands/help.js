//const { debug, warn } = asyncLogs;
const { devId } = config;
const { Permissions, EmbedBuilder } = require('discord.js');

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
    
    const embed = new EmbedBuilder().setTitle("Command Info:").setColor(0x2B2D31);

    switch (typeof args[0]) {
        case 'string': // if command is specified
            let fields = [];

            cmd = client.commands.get(command);
            
            if (typeof cmd !== "object") {
                return;
            }

            if (cmd.help.omit) return;

            fields.push({
                name: "Command:",
                value: `**${prefix}${cmd.help.name}**`,
                inline: true
            });
            
            if (Array.isArray(cmd.help.aliases) && cmd.help.aliases.length > 0) {
                fields.push({
                    name: "Aliases:",
                    value: `**${prefix}${cmd.help.aliases.join(`**, **${prefix}`)}**`,
                    inline: true
                })
            }

            if (typeof cmd.help.usage === "string" && cmd.help.usage.length > 0) {
                fields.push({
                    name: "Usage:",
                    value: `\`${prefix}${cmd.help.usage}\``
                })
            }

            if (typeof cmd.help.description === "string" && cmd.help.description.length > 0) {
                fields.push({
                    name: "Description:",
                    value: cmd.help.description
                })
            }

            if (args[1] === "debug" && (msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || msg.member.user.id === devId)) {
                fields.push({
                    name: "Debug:",
                    value: `\n\`\`\`json\n${JSON.stringify(cmd.conf, null, 4)}\n\`\`\``
                })
            }

            embed.addFields(...fields);

            await msg.reply({ embeds: [embed] });
            break;
        default: // FIXME Add pages when list gets too long
            // returns full list by default
            embed.setFields(...helpList);
            msg.reply({ embeds: [ embed ] });
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
        "command",
        "cmds",
        "cmd"
    ],
    description: `Get the list of commands.`,
    usage: `help (command)`
};
