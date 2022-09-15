const { discord } = config;

exports.run = function invite (_, msg) {
    msg.channel.send(`Join our community on Discord: ${discord}`);
}

exports.conf = { enabled: true }

exports.help = {
    name: "invite",
    aliases: [ "link" ],
    description: "Get the invite link for the CosmoQuest Discord."
}
