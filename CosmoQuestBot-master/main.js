// Configuring dotenv package & token variable
require('dotenv').config();

const fs = require('fs');

const { log, warn, debug, parseSeconds, startWatch, stopWatch } = require('./public/async-logs');

const Discord = require('discord.js');
const client = new Discord.Client();

(async () => {
    
    require('./public/getNasa')(Discord, client, process.exit);
    if (process.argv[2] === "nasa") return;
    
    client.commands = new Discord.Collection();
    
    const { prefix, statusMessages } = require('./config.json');
    client.prefix = prefix;

    
    // ----------------------------------------------------------------
    
    startWatch("loading commands", process.uptime());
    
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    let cmdList = []; // array later used to store command information

    log('\n%cLoading Commands...\n', 'font-weight: bold;');
    for (const file of commandFiles) {
        (async (file) => {try {

            let cmd = require(`./commands/${file}`);

            // grabs the help & conf exports
            const   help    = cmd.help,
                    conf    = cmd.conf


            if (typeof cmd.conf !== 'object' || !cmd.conf.enabled) {
                debug("Skipping " + file, cmd.conf);
                return;
            }
            if (typeof cmd.help !== 'object' || !cmd.help.name) {
                warn(new Error(`help.name of ${file} is undefined`));
                return;
            }
                    
                    
            let obj = {name: help.name, debug: cmd.conf}; // used once for entering data in help, deleted after

            client.commands.set(help.name, cmd); // defines the commands, this will be used for running the commands

            if (typeof help.description === 'string') obj.description = help.description; // Add description if it exists

            if (typeof help.usage === 'string') obj.usage = help.usage; // Add usage info if it exists

            log(help.name); // Top-Level of the tree listing commands
            
            if (Array.isArray(help.aliases) && help.aliases.length) { // if there are no aliases, don't add them
                
                obj.aliases = help.aliases;

                /* for (const alias of help.aliases) {
                    log(' \\ ' + alias);
                    client.commands.set(alias, cmd);
                    obj.aliases.push(alias);
                } */
            }

            cmdList.push(obj); // adds the information to the commands list
        } catch (e) {
            e.fileName = file;
            log();
            warn(new SyntaxError(`file ${file} was incorrectly setup`));
            log();
            process.exit();
        }})(file)
    }

    // Export all the information needed for the !help command, circular dependency fix
    (client.commands.get('help').setup(cmdList)) ? log('\n%cFinished!\n', 'font-weight: bold;') : process.exit(1);

    stopWatch("loading commands", process.uptime(), undefined, true); // Using this to develop asynchronous commands

    // ----------------------------------------------------------------

    client.on("message", async msg => {
        if(msg.author.bot || msg.channel.type === "dm") return;

        if(msg.mentions.has(client.user)) { // If the message mentions the bot, return the prefix
            return client.api.channels[msg.channel.id].messages.post({ // src: https://stackoverflow.com/a/68116494/
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
            return;
        }
        
        try { // Runs the command
            if (cmd.conf.await) { // Check if await should be used
                await cmd.run(client, msg, args);
            } else {
                cmd.run(client, msg, args);
            }
        } catch (e) { // Respond to an incorrect command
            debug(e);
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


    // ----------------------------------------------------------------


    client.on("ready", () => {
        
        // Logs startup info to console in English & Portuguese
        log.bilingual (
            `Bot online with, ${client.users.cache.size} users, ${client.guilds.cache.size} guilds, & ${client.channels.cache.size} channels.`,
            `Bot foi iniciado com, ${client.users.cache.size} usuários,${client.guilds.cache.size} servidores, e ${client.channels.cache.size} canais.`
        );

        dt = Date();
        ut = process.uptime();
        parseSeconds(ut, (time) => {
            log('\nStart Date : ' + dt, "\nLoad Time  : " + time, '\n');
        });
        void(delete ut, dt); // Some cleaning

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


    // ----------------------------------------------------------------


    /**
     * @private
     * 
     * Login the bot
     */
    (() => {
        token = process.env["DISCORD_TOKEN"];
        client.login(token);
        void(delete token);
    })();
})()