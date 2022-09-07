require('dotenv').config();
const { log, debug, warn } = asyncLogs;

const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}`;
const snekfetch = require('snekfetch');
const Discord = require('discord.js');

const run = async function example (_, message) {
    let msg = await message.channel.send('🛰️Fetching information from the database...');

    const d1 = 803275200000; // First APOD [June 16, 1995]
    const d2 = (new Date()).getTime();
    const dr = new Date(Math.floor(Math.random() * (d2 - d1) + d1));
    const dt = dr.toLocaleDateString('en-CA'); // YYYY-MM-DD
    
    const reqUrl = `${api}&date=${dt}`;
    
    // Creates a RichEmbed using the image given from the url of the api.
    await snekfetch.get(reqUrl).then(r => {
      const body = r.body;
      const img = (body.hdurl || body.url);
      const date = body.date;
      
      const dn = date.replace(/-/g, "").slice(-6); // YYMMDD

      const url = `https://apod.nasa.gov/apod/ap${dn}.html`;
      
      log(body);
  
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
        .setTimestamp(dr);
  
      message.channel.send({ embeds: [embed] })
    })
    msg.delete()
}


const conf = {
    enabled: true
}


const help = {
    name: `png`,
    description: `Returns a random APOD.`
}

module.exports = {run, conf, help} // this is a clean way to export multiple at once