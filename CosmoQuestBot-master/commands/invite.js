exports.run = function invite (_, message) {
    message.channel.send("Join our community on Discord: https://discord.gg/pVGXJDUKud");
}

exports.conf = { enabled: true }

exports.help = {
    name: "invite",
    aliases: [ "link" ],
    description: "Get the invite link for the CosmoQuest Discord."
}
