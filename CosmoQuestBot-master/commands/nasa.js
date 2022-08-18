require('dotenv').config();

const api = `https://api.nasa.gov/planetary/apod?api_key=${process.env["NASA_API_KEY"]}`
const snekfetch = require('snekfetch')
const Discord = require('discord.js')
/*
 This command will grab the image/video of the day from Nasa's api and return it
 in a RichEmbed.

 Usage is defined as !nasa
*/
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('🛰️Fetching information from the database...')

  // Creates a RichEmbed using the image given from the url of the api.
  await snekfetch.get(api).then(r => {
    let body = r.body
    let url = (r.body.hdurl || r.body.url)

    let embed = new Discord.MessageEmbed()
      .setColor('#584db0')
      .setImage(url)
      .setTitle('**NASA** Astronomy Picture of the Day')
      .setURL('https://apod.nasa.gov/')
      .setDescription(r.body.explanation.substring(null, 650, "..."))
      .setFooter(
        {
          text: 'A service of: ASD at NASA / GSFC & Michigan Tech. U.',
          iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/287px-NASA_logo.svg.png'
        }
      )
      .setTimestamp(new Date(message.createdAt).toString());

    message.channel.send({ embeds: [embed] })
  })
  msg.delete()
}

exports.conf = { enabled: true }

exports.help = {
  name: 'nasa',
  description: 'Returns the NASA video/image of the day.',
  usage: 'nasa'
}
