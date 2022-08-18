const { warn, debug } = require('../public/async-logs');

exports.run = (client, msg, args) => {
	try {
		function sendCookie(channel, sender, receiver) {
			if(receiver.bot === true) return msg.channel.send(`:cookie: • **${sender.username}** gave a cookie to :robot:**${receiver.username}**`);
			else if(receiver.id === sender.id) return msg.channel.send(`:cookie: • Do you like your own cookies, **${sender.username}**?`);
			else return msg.channel.send(`:cookie: • **${sender.username}** gave a cookie to **${receiver.username}**`);
		}

		if(msg.mentions.users.first()) return sendCookie(msg.channel, msg.author, msg.mentions.users.first());
		else if(args && system.getUser(msg, args)) return sendCookie(msg.channel, msg.author, system.getUser(msg, args).user);
		else warn("Cookies are sad");
	} catch (e) {} // drop all errors
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
	usage: `cookie <user>`
};
