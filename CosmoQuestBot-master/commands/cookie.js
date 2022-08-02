exports.run = (client, msg, args) => {
	function sendCookie(channel, sender, receiver) {
		if(receiver.bot === true) return msg.channel.send(`:cookie: • **${sender.username}** gave a cookie to **<@${receiver.id}>**.. Oh... You're alone ? I'm sorry for you Q_Q`);
		else if(receiver.id === sender.id) return msg.channel.send(`:cookie: • Do you like your own cookies **<@${sender.id}>** ?`);
		else return msg.channel.send(`:cookie: • **${sender.username}** gave a cookie to **<@${receiver.id}>**`);
	}

	if(msg.mentions.users.first()) return sendCookie(msg.channel, msg.author, msg.mentions.users.first());
	else if(args && system.getUser(msg, args)) return sendCookie(msg.channel, msg.author, system.getUser(msg, args).user);
	else throw "Cookies are sad";
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 4
};

exports.help = {
	name: `cookie`,
	description: `Give a cookie to someone!`,
	usage: `cookie <user>`
};
