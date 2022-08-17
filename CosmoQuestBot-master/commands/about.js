const { warn, debug } = require('../public/async-logs');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const version = config.version.long;
const github = config.github;

module.exports.run = async (client, msg, args) => {

    try {
        const embed = new MessageEmbed()
            .setColor(0x5dadec)
            .setTitle("About Rocket-Bot")
            .setURL(`${github}/blob/master/README.md`)
            .addFields(
                {
                    "name": "Who Made Me?",
                    "value": "I am made of stardust. ||<@662820223250071624> & <@234481908057112576>||",
                    "inline": false
                },
                {
                    "name": "What Am I?",
                    "value": "I am a discord bot created by the CosmoQuest community, all of my code is open-source!",
                    "inline": false
                },
                {
                    "name": "Where Can You Find Me?",
                    "value": `All my code can be found [here](${github}) on GitHub.`,
                    "inline": false
                },
                {
                    "name": "How Was I Made?",
                    "value": "I run off of [NodeJS](https://nodejs.org/):\n • I use [discord.js](https://discord.js.org/) to talk to you\n • [OpenWeatherMap](https://openweathermap.org/) for accurate weather data\n • [Math.js](https://mathjs.org/) to help you with your homework\n • & NASA's own [API](https://api.nasa.gov/) to get you those beautiful images of the day!",
                    "inline": false
                },
                {
                    "name": "Why Have Another Bot?",
                    "value": "Because people find my functionality useful, and that makes me happy! :blue_heart:",
                    "inline": false
                }
            )
            .setFooter({ text: `Rocket Bot ${version}`, iconURL: client.user.displayAvatarURL() })
            .setThumbnail(client.user.displayAvatarURL());
        
        msg.channel.send({embeds: [embed]});
    } catch(e) {
        warn(e);
        return void(0);
    }
};

module.exports.help = {
    name: 'about',
    aliases: [
        "info",
        "information",
        "github"
    ],
	description: 'Returns information about the bot.',
    usage: "about"
}