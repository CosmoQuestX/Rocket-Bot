const { warn } = asyncLogs;

function sendCookie(channel, sender, receiver) {
	let name = receiver.nickname ? receiver.nickname : receiver.username;
	if(receiver.bot === true) return channel.send(`:cookie: • **${name}** gave a cookie to :robot:**${name}**`);
	else if(receiver.id === sender.id) return channel.send(`:cookie: • Do you like your own cookies, **${name}**?`);
	else return channel.send(`:cookie: • **${name}** gave a cookie to **${name}**`);
}

exports.run = (_, msg, args) => {
	try {
		if(msg.mentions.users.first()) return sendCookie(msg.channel, msg.author, msg.mentions.users.first());
		/*else if(args && system.getUser(msg, args)) return sendCookie(msg.channel, msg.author, system.getUser(msg, args).user); // FIXME What is system supposed to do?*/
		else return msg.channel.send(':cookie: • for me? :face_holding_back_tears:');
	} catch (e) {
		warn(e);
	}
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
	usage: `cookie [@user_mention]`
};
