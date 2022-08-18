var math = require("mathjs");
exports.run = function calc (client, msg, args) {
  try {
    if (args.length < 1) throw new RangeError(`${args.length} arguments passed`);
    if ((args[0] == "π") || (args[0] == "pi")) {
      msg.channel.send("3.141592653589793238462643383279502884197169");
    } else if (args[0] == "p=np") {
      msg.channel.send("An answer to the P versus NP question would determine whether problems that can be verified in polynomial time can also be solved in polynomial time.");
      msg.channel.send("If it turns out that P ≠ NP, which is widely believed, it would mean that there are problems in NP that are harder to compute than to verify: they could not be solved in polynomial time, but the answer could be verified in polynomial time.");
      msg.channel.send("A proof that P = NP could have stunning practical consequences if the proof leads to efficient methods for solving some of the important problems in NP.");
      msg.channel.send("The potential consequences, both positive and negative, arise since various NP-complete problems are fundamental in many fields.");
    } else {
      msg.channel.send(math.evaluate(args).toString());
    }
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
