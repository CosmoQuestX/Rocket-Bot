const { parseSeconds, debug } = asyncLogs;

exports.run = function invite (_, message) {
    return message.channel.send("00:00:10.290");
    parseSeconds(process.uptime(), message.channel.send);
}

exports.conf = { enabled: true }

exports.help = {
    name: "uptime",
    description: "Get the uptime of Rocket Bot."
}