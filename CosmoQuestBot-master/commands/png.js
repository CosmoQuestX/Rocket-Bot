require('dotenv').config();

const { log, debug, warn } = asyncLogs;

let randomInt;

try { // crypto.randomInt is the better random integer generator; Math.random for compatibility
    randomInt = require('node:crypto')?.randomInt;
} catch (e) {
    warn("node:crypto not found ; using outdated Math.random as fallback ; please install a newer version of node");
    randomInt = ((min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
}

const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}`;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const Discord = require('discord.js'),
{ EmbedBuilder } = Discord;

const run = async (_, message) => {
    let msg = await message.channel.send('🛰️Fetching a random APOD from the database...'); // Temporary Message

    const d1 = new Date("June 16, 1995").getTime(); // First APOD [June 16, 1995]
    const d2 = Date.now(); // Current Date
    const dr = new Date(randomInt(d1, d2)); // Random Date in range
    const dt = dr.toISOString().split('T')[0]; // YYYY-MM-DD
    
    const reqUrl = `${api}&date=${dt}`; // API URL


    await fetch(reqUrl)
        .then(async r => { // Handles API Request
            try {
                const resp = await r.json(); // JSON response
                // console.log(reqUrl, resp);
                const media = (resp.hdurl || resp.url); // APOD Image/Video
                const date = resp.date; // Date of creation (YYYY-MM-DD)
                const bE = resp.explanation;
                let desc;


                if (bE.indexOf(" ", 512) != -1) {
                    desc = bE.substring(0, bE.indexOf(" ", 512)) + "...";
                } else {
                    desc = bE;
                }
            
                const dn = date.replace(/-/g, "").slice(-6); // YYMMDD

                const url = `https://apod.nasa.gov/apod/ap${dn}.html`; // Title URL
        
                const embed = new EmbedBuilder() // Response Embed
                .setColor(0x584db0)
                .setTitle(resp.title)
                .setURL(url)
                .setDescription(desc)
                .setFooter({
                    text: 'A service of: ASD at NASA / GSFC & Michigan Tech. U.',
                    iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/287px-NASA_logo.svg.png'
                })
                .setTimestamp(dr);

                if (resp.copyright) // If author, set it
                    embed.setAuthor({ name: `\u00A9 ${resp.copyright}` });

                switch (resp.media_type) {
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
        })
        .catch(e => {
            warn(e);
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
