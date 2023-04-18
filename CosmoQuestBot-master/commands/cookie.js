const { SlashCommandBuilder, Interaction, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { intersect } = require('mathjs');
const { warn } = asyncLogs;

function sendCookie(channel, sender, receiver) {
    let rcvr,
    sndr = sender.nickname ? sender.nickname : sender.username;

    switch (typeof receiver === "string") {
        case true:
            return channel.send(`:cookie: • **${sndr}** gave a cookie to **${receiver}**`);
        default:
            rcvr = receiver.nickname ? receiver.nickname : receiver.username;

            if(receiver.bot === true) return channel.send(`:cookie: • **${sndr}** gave a cookie to :robot:**${rcvr}**`)
            else if(receiver.id === sender.id) return channel.send(`:cookie: • Here's your cookie, **${sndr}**`)
            else return channel.send(`:cookie: • **${sndr}** gave a cookie to **${rcvr}**`);
    }
}

exports.run = (client, msg, args) => {
    try {
        let to = args.join(" ");
        if (msg.mentions.users.first() === client.user) return msg.channel.send(':cookie: • for me? :face_holding_back_tears:');     // mentions this bot
        if(msg.mentions.users.first()) return sendCookie(msg.channel, msg.member.user, msg.mentions.users.first());       // mentions any user
        if(to.length > 0) return sendCookie(msg.channel, msg.member.user, to);                                                       // use text as name
    } catch (e) {
        warn(e);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 1,
    type: 4
};

exports.help = {
    name: `cookie`,
    description: `Give a cookie to someone.`,
    usage: `cookie [@user_mention]`
};

exports.slashCommand = {
    data: new SlashCommandBuilder()
    .setName(exports.help.name)
    .setDescription(exports.help.description),

    execute: async interaction => {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
    }
}