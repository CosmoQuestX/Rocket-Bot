var math = require("mathjs");
exports.run = function calc (client, msg, args) {
  try {
    if (args.length < 1) throw new RangeError(`${args.length} arguments passed`);
    msg.channel.send(math.evaluate(args).toString());
  } catch (err) {
    throw err;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 1,
  type: 5
};
exports.help = {
  name: `calc`,
  aliases: [
    "calculate"
  ],
  description: `Calculate something.`,
  usage: `calc <math formula>`
};
