const math = require("mathjs");
const { debug, error } = asyncLogs;

exports.run = function calc (client, msg, args) {
    try {
        if (args.length < 1) throw new RangeError(`${args.length} arguments passed`);
        
        args = args.join(" ").replace(/\s/g, ""); // Converts Array to String with no white space

        switch (args) {
            case "\u03c0":
            case "pi":
                msg.channel.send("3.141592653589793238462643383279502884197169");
                break;
            case "p=np":
                msg.channel.sendTyping();
                setTimeout(async () => {
                    await msg.channel.send("An answer to the P versus NP question would determine whether problems that can be verified in polynomial time can also be solved in polynomial time.");
                    msg.channel.sendTyping();
                }, 1000);

                setTimeout(async () => {
                    await msg.channel.send("If it turns out that P \u2260 NP, which is widely believed, it would mean that there are problems in NP that are harder to compute than to verify: they could not be solved in polynomial time, but the answer could be verified in polynomial time.");
                    msg.channel.sendTyping();
                }, 1500);

                setTimeout(async () => {
                    await msg.channel.send("A proof that P = NP could have stunning practical consequences if the proof leads to efficient methods for solving some of the important problems in NP.");
                    msg.channel.sendTyping();
                }, 2000);
                
                setTimeout(async () => {
                    await msg.channel.send("The potential consequences, both positive and negative, arise since various NP-complete problems are fundamental in many fields.");
                }, 3000);
                break;
            default:
                if (!(args.search(/^([\d+=\-/\*\^]*)$/g) === 0)) return debug("calc: Illegal Char(s)");
                msg.channel.send(math.evaluate(args).toString());
                break;
        }
    } catch (e) {
        if (typeof e.data !== "object" || typeof e.data.category !== "string") throw e;
        switch (e.data.category) {
            case 'wrongType':
                debug("Wrong type");
                debug(e.data);
                return;
            default:
                debug(e);
                return;
        }
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
