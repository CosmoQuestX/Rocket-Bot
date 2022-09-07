require('dotenv').config();

const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}`;
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
/*
 This command will grab the image/video of the day from Nasa's api and return it
 in a RichEmbed.

 Usage is defined as !nasa
*/
module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send('🛰️Fetching information from the database...');

    let pDt = new Date(args.join(" "));

    let reqUrl;

    if (pDt != "Invalid Date") {
        reqUrl = `${api}&date=${pDt.toLocaleDateString('en-CA')}`;
    } else {
        reqUrl = api;
    }
    
    // Creates a RichEmbed using the image given from the url of the api.
    await snekfetch.get(reqUrl).then(r => {
        const body = r.body;
        const img = (body.hdurl || body.url);
        const date = body.date;
        
        const y = date.slice(0,4);
        const m = Number(date.slice(5,7)) - 1;
        const d = Number(date.slice(8,10)) + 1;
        const rDt = new Date(y, m, d);

        const dn = date.replace(/-/g, "").slice(-6); // YYMMDD
      
        const url = `https://apod.nasa.gov/apod/ap${dn}.html`;
        
        const embed = new Discord.MessageEmbed()
            .setColor('#584db0')
            .setImage(img)
            .setTitle('**NASA** Astronomy Picture of the Day')
            .setURL(url)
            .setDescription(body.explanation)
            .setFooter(
                {
                    text: 'A service of: ASD at NASA / GSFC & Michigan Tech. U.',
                    iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/287px-NASA_logo.svg.png'
                }
            )
            .setTimestamp(rDt.toString());

        message.channel.send({ embeds: [embed] });
    })
    msg.delete();
}

exports.conf = { enabled: true }

exports.help = {
    name: 'nasa',
    aliases: [
        'apod'
    ],
    description: 'Returns the NASA video/image of the day.',
    usage: 'nasa [date]'
}
