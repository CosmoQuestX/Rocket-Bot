const { warn, debug } = require('../public/async-logs');
const { MessageEmbed } = require('discord.js');

const config = require('../config.json');
const version = config.version.full;
const github = config.github;

module.exports.run = async function about (client, msg, args) {

    try {
        const ico = client.user.displayAvatarURL();

        const embed = new MessageEmbed()
            .setColor(0x5dadec)
            .setThumbnail(ico)
            .setTitle("About Rocket-Bot")
            .setURL(`${github}/blob/master/README.md`)
            .addFields(
                {
                    "name": "Who Made Me?",
                    "value": "I was originally created by <@662820223250071624>.\n<@234481908057112576> is now my maintainer.",
                    "inline": false
                },
                {
                    "name": "What Am I?",
                    "value": "I am a Discord bot created by the CosmoQuest community.\nAll of my code is open-source!",
                    "inline": false
                },
                {
                    "name": "Where Can You Find Me?",
                    "value": `All my code can be found [here](${github}) on GitHub.`,
                    "inline": false
                },
                {
                    "name": "How Was I Made?",
                    "value": "I run off of [NodeJS](https://nodejs.org/):\n • I use [discord.js](https://discord.js.org/) to communicate\n • [OpenWeatherMap](https://openweathermap.org/) for accurate weather data\n • [Math.js](https://mathjs.org/) to help with homework\n • & NASA's own [API](https://api.nasa.gov/) to get you those beautiful images of the day!",
                    "inline": false
                },
                {
                    "name": "Why Have Another Bot?",
                    "value": "Because people find my functionality useful, and that makes me happy! :blue_heart:",
                    "inline": false
                }
            )
            .setFooter({ text: `Rocket Bot ${version}`, iconURL: ico });
        
        msg.channel.send({ embeds: [embed] });
    } catch(e) {
        warn(e);
        return void(0);
    }
};

exports.conf = { enabled: true }

exports.help = {
    name: 'about',
    aliases: [
        "info",
        "information",
        "git"
    ],
	description: 'Returns information about the bot.'
}