require('dotenv').config();

const { log, debug, warn } = asyncLogs;

const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}`;
const snekfetch = require('snekfetch');
const Discord = require('discord.js');

const run = async (_, message) => {
    let msg = await message.channel.send('🛰️Fetching information from the database...'); // Temporary Message

    const d1 = new Date("June 16, 1995").getTime(); // First APOD [June 16, 1995]
    const d2 = new Date().getTime(); // Current Date
    const dr = new Date(Math.floor(Math.random() * (d2 - d1) + d1)); // Random Date in range
    const dt = dr.toLocaleDateString('en-CA'); // YYYY-MM-DD
    
    const reqUrl = `${api}&date=${dt}`; // API URL


    await snekfetch.get(reqUrl).then(r => { // Handles API Request
        try {
            const body = r.body; // JSON response
            const media = (body.hdurl || body.url).toLowerCase(); // APOD Image/Video
            const date = body.date; // Date of creation (YYYY-MM-DD)
            const bE = body.explanation;
            let desc;

            if (bE.indexOf(" ", 512) != -1) {
                desc = bE.substring(0, bE.indexOf(" ", 512)) + "...";
            } else {
                desc = bE;
            }
        
            const dn = date.replace(/-/g, "").slice(-6); // YYMMDD

            const url = `https://apod.nasa.gov/apod/ap${dn}.html`; // Title URL
    
            const embed = new Discord.MessageEmbed() // Response Embed
            .setColor('#584db0')
            .setTitle(body.title)
            .setURL(url)
            .setDescription(desc)
            .setFooter({
                text: 'A service of: ASD at NASA / GSFC & Michigan Tech. U.',
                iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/287px-NASA_logo.svg.png'
            })
            .setTimestamp(dr);

            if (body.copyright) // If author, set it
                embed.setAuthor({ name: `\u00A9 ${body.copyright}` });

            switch (body.media_type) {
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
            debug(e);
        }
    })

    msg.delete() // Delete temp message
}


const conf = {
    enabled: true
}


const help = {
    name: `png`,
    description: `Returns a random APOD.`
}

module.exports = {run, conf, help} // this is a clean way to export multiple at once