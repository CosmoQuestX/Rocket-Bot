const Discord = require('discord.js');
const { prefix, statusMessages } = require('./config.json');

// Configuring dotenv package & token variable
require('dotenv').config();
const { DISCORD_TOKEN: token } = process.env;

const client = new Discord.Client();
client.prefix = prefix;

// Just some logging stuff
const tStyle = ["font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;"];
let lg = [];

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.content.startsWith(`<@!${client.user.id}>`) || msg.content.startsWith(`<@${client.user.id}>`)){
        return msg.reply("Hello! My prefix is `!`")};
    if(!msg.content.startsWith(prefix)) return;

let args = msg.content.split(" ").slice(1);
let command = msg.content.split(" ")[0];
command = command.slice(prefix.length);
  try {
      let commandFile = require(`./commands/${command}.js`);
      delete require.cache[require.resolve(`./commands/${command}.js`)];
      return commandFile.run(client, msg, args);
  } catch (err) {
        console.error("Erro/Error:" + err);
  };
});

client.on("ready", () => {

    // Logs startup info to console in English & Portuguese
    lg = ["%c[%cBot online with, " + client.users.cache.size + " users, " + client.guilds.cache.size + " guilds, & " + client.channels.cache.size + " channels.%c] / [%cBot foi iniciado com, " + client.users.cache.size + " usuários, " + client.guilds.cache.size + " servidores, e " + client.channels.cache.size + " canais.%c]%c", ...tStyle];
    console.log(...lg);

    let stsId = 0;
    setInterval(() => {
        client.user.setActivity(statusMessages[stsId]);
        stsId = (stsId+1)%statusMessages.length; // Loops through messages
    }, 10000);

    /* Rough Translations, Fix Me! */
    //0 = Jogando / Logging On To
    //1 = Transmitindo / Transmitting
    //2 = Ouvindo / Receiving
    //3 = Assistindo / Stand-By
});

client.login(token);