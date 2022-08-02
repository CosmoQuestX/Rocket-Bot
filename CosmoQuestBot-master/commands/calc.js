var math = require("mathjs");
exports.run = (client, msg, args) => {
  try {
    if (args.length < 1) throw new RangeError(`${args.length} arguments passed`);
    msg.channel.send(math.evaluate(args));
  } catch (err) {
    throw err;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "calculate"
  ],
  permLevel: 1,
  type: 5
};
exports.help = {
  name: `calc`,
  description: `Calculate something.`,
  usage: `calc <math formula>`
};
