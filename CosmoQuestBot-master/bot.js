// Configuring dotenv package & token variable
require('dotenv').config();
const { DISCORD_TOKEN: token } = process.env;
const { prefix, statusMessages } = require('./config.json');

const fs = require('fs');

const { log, warn } = require('./public/async-logs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.prefix = prefix;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const excludeFiles = ['test.js', 'help.js']; // List commands to exclude (use script name)

log('\n%cLoading Commands...\n', 'font-weight: bold;');
for (const file of commandFiles) {
    if (excludeFiles.includes(file)) continue;

    try {
        const command = require(`./commands/${file}`);
        if (command.conf && !command.conf.enabled) continue;
        client.commands.set(command.help.name, command);
        log(command.help.name);
        if (command.conf && Array.isArray(command.conf.aliases)) {
            for (const alias of command.conf.aliases) {
                log(alias);
                client.commands.set(alias, command);
            }
        }
    } catch (e) {
        warn(e);
    }
}
log('\n%cFinished!\n', 'font-weight: bold;');


client.on("message", async msg => {
    if(msg.author.bot || msg.channel.type === "dm") return;

    if(msg.mentions.has(client.user)) { // If the message mentions the bot, return the prefix
        return await client.api.channels[msg.channel.id].messages.post({ // src: https://stackoverflow.com/a/68116494/
            data: {
                content: `My prefix is \`${client.prefix}\``,
                    message_reference: {
                    message_id: msg.id,
                    channel_id: msg.channel.id,
                    guild_id: msg.guild.id
                }
            }
          });
    };

    if(!msg.content.startsWith(client.prefix)) return; // if the prefix is not given, return

    // cleans up the command for easy parsing
    let args = msg.content.split(" ").slice(1);
    let command = msg.content.split(" ")[0];
    command = command.slice(client.prefix.length).toLowerCase();
    
    const cmd = await client.commands.get(command);

    if (typeof cmd !== "object") {
        return await client.api.channels[msg.channel.id].messages.post({ // src: https://stackoverflow.com/a/68116494/
            data: {
                content: `\`${client.prefix}${command}\` is not a valid command.`,
                message_reference: {
                    message_id: msg.id,
                    channel_id: msg.channel.id,
                    guild_id: msg.guild.id
                }
            }
        });
    }
    
    // Trying the Discord.js Documentation solution
    try { // Runs the command
        cmd.run(client, msg, args);
    } catch (_) { // Respond to an incorrect command
        try {
            await client.api.channels[msg.channel.id].messages.post({ // src: https://stackoverflow.com/a/68116494/
                data: {
                    content: `Please use the format \`${client.prefix}${cmd.help.usage}\``,
                    message_reference: {
                        message_id: msg.id,
                        channel_id: msg.channel.id,
                        guild_id: msg.guild.id
                    }
                }
            });
        } catch (e) {
            await client.api.channels[msg.channel.id].messages.post({ // src: https://stackoverflow.com/a/68116494/
                data: {
                    content: `Incorrect usage of \`${prefix}${command}\``,
                    message_reference: {
                        message_id: msg.id,
                        channel_id: msg.channel.id,
                        guild_id: msg.guild.id
                    }
                }
            });
        }
        // No need to throw an error in the log
    };
});

client.on("ready", () => {
    
    // Logs startup info to console in English & Portuguese
    log.bilingual (
        `Bot online with, ${client.users.cache.size} users, ${client.guilds.cache.size} guilds, & ${client.channels.cache.size} channels.`,
        `Bot foi iniciado com, ${client.users.cache.size} usuários,${client.guilds.cache.size} servidores, e ${client.channels.cache.size} canais.`
    );

    log("Start Time: " + Date());

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