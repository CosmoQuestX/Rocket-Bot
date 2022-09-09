const { parseSeconds, debug } = asyncLogs;

exports.run = function invite (_, message) {
    parseSeconds(process.uptime(), (n) => {
        message.channel.send(
            `I have been up for \`${n.toString()}\`.`
        )
    });
}

exports.conf = { enabled: true }

exports.help = {
    name: "runtime",
    description: "Get the uptime of Rocket Bot."
}