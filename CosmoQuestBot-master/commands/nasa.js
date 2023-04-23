require('dotenv').config();

const { debug, warn } = asyncLogs,

api = `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}`,
fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)),

Discord = require('discord.js'),
{ EmbedBuilder } = Discord;

const oD = new Date("June 16, 1995").getTime(); // First APOD [June 16, 1995]

/*
 This command will grab the image/video of the day from Nasa's api and return it
 in a RichEmbed.

 Usage is defined as !nasa
*/
module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send('🛰️Fetching information from the database...'); // Temporary Message

    const pDt = new Date(args.join(" ")); // Formats command arguments

    const pDn = pDt.getTime(); // User submitted timestamp
    const tD = new Date().getTime(); // Current timestamp
    
    let reqUrl; // Request URL
    
    if (!isNaN(pDt) && (pDn <= tD && pDn >= oD)) { // User defined date, or most recent APOD
        const sDt = pDt.toISOString().split("T")[0]; // String Date YYYY-MM-DD
        reqUrl = `${api}&date=${sDt}`;
    } else {
        reqUrl = api;
    }
    

    await fetch(reqUrl)
        .then(async r => { // Handles API Request
            try {
                const resp = await r.json(); // JSON response
                const media = (resp.hdurl || resp.url); // APOD Image/Video
                const date = resp.date; // Date of creation (YYYY-MM-DD)
                const bE = resp.explanation;
                let desc;
                
                debug(resp);

                if (bE.indexOf(" ", 512) != -1) {
                    desc = `${bE.substring(0, bE.indexOf(" ", 512))}\u2026`;
                } else {
                    desc = bE;
                }
                
                const y = date.slice(0,4); // YYYY
                const m = Number(date.slice(5,7)) - 1; // MM
                const d = Number(date.slice(8,10)) + 1; // DD
                const rDt = new Date(y, m, d); // Date of creation (Date())

                const dn = date.replace(/-/g, "").slice(-6); // YYMMDD
            
                const url = `https://apod.nasa.gov/apod/ap${dn}.html`; // Title URL
                
                const embed = new EmbedBuilder() // Response embed
                    .setColor(0x584db0)
                    .setTitle(resp.title)
                    .setURL(url)
                    .setDescription(desc)
                    .setFooter(
                        {
                            text: 'A service of: ASD at NASA / GSFC & Michigan Tech. U.',
                            iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/287px-NASA_logo.svg.png'
                        }
                    )
                    .setTimestamp(rDt.valueOf());

                if (resp.copyright) // If author, set it
                    embed.setAuthor({ name: `\u00A9 ${resp.copyright}` });

                switch (resp.media_type) { // Sorts media types
                    case 'image':
                        embed.setImage(media);
                        break;
                    case 'video':
                        debug(media);
                        embed.addFields([
                            {
                                name: "\u200B",
                                value: "\u200B",
                                inline: true
                            },
                            {
                                name: "Well this is awkward...",
                                value: "Videos are not yet supported.",
                                inline: true
                            }
                        ])
                        //embed.video = media;
                        break;
                }

                message.channel.send({ embeds: [embed] }); // Send completed Embed

            } catch (e) {
                warn(e);
            }
        }, debug)
        .catch(e => {
            warn(e);
        })
    msg.delete(); // Delete temp message
}

exports.conf = {
    enabled: true
}

exports.help = {
    name: 'nasa',
    aliases: [
        'apod'
    ],
    description: 'Returns the NASA video/image of the day.',
    usage: 'nasa [date]'
}
