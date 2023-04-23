"use strict";

// Configuring dotenv package & token variable
require('dotenv').config();

global.asyncLogs = require('./public/async-logs'); // Creates global variable asyncLogs; Useful for modules
const { log, warn, debug, parseSeconds, startWatch, stopWatch } = asyncLogs;

global.config = require('./config.json');  // Creates global variable config

global.prefix = "!"; // Creates global variable prefix w/ default of "!"

const fs = require('fs');

const { Client, GatewayIntentBits, Collection, Partials, Events, ChannelType, REST/*, Routes, InteractionType*/ } = require('discord.js'); // Not a global variable on-purpose to prevent data mishandling
const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages], partials: [Partials.Channel] });

(async () => { try {
    
    require('./public/getNasa')(client, process.exit);
    if (process.argv[2] === "nasa") return;
    
    client.commands = new Collection();
    
    const { statusMessages, throwInvalid } = config; // Importing needed configs

    prefix = config.prefix || prefix; // If config.prefix===undefined then do default (set above)

    
    // ----------------------------------------------------------------
    
    console.group('Startup');
    log('\n%cLoading Commands...\n', 'font-weight: bold;');

    startWatch("Commands Load Time", process.uptime());

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    global.helpList = []; // Array used for the help command
    const cmdList = []; // Array later used to store command information

    for (const file of commandFiles) {
        (async (file) => {try {

            const cmd = require(`./commands/${file}`);

            // grabs the help & conf exports
            const   help    = cmd.help,
                    conf    = cmd.conf;
          /*const   slash   = cmd.command;*/


            if (typeof conf !== 'object' || !conf.enabled) {
                debug("\u23ED " + file + "\t\u2192\t " + JSON.stringify(conf)); // Log Skipped
                return;
            }
            if (typeof help !== 'object' || !help.name) {
                warn(new Error(`help.name of ${file} is undefined`));
                return;
            }
            
            const obj = {name: help.name, debug: conf}; // used once for entering data in help, deleted after

            client.commands.set(help.name.toLowerCase(), cmd); // defines the commands, this will be used for running the commands

            if (typeof help.description === 'string') obj.description = help.description; // Add description if it exists

            if (typeof help.usage === 'string') obj.usage = help.usage; // Add usage info if it exists

            switch (Array.isArray(help.aliases) && help.aliases.length > 0) { // if there are no aliases, don't add them
                case true:
                    for (const alias of help.aliases) {
                        client.commands.set(alias.toLowerCase(), cmd);
                    }
                    obj.aliases = help.aliases;
                    log(`${help.name}\n \u21B3 ${help.aliases.join("\n \u21B3 ")}`);
                    break;
                case false:
                    log(help.name);
                    break;
            }

            cmdList.push(obj);

            if (!help.omit)
                helpList.push({ name: (prefix + obj.name), value: (obj.description ||
                    ((typeof obj.usage === "string" && obj.usage.length > 0) ?
                    `${prefix}${obj.usage}` : "<:TealDeer:910194620732932106>")),
                inline: true}); // adds the information to the commands list

            /* if (slash && 'data' in slash && 'execute' in slash) {
                log(` \u25AA Slash command loaded.`);
            } else {
                log(` \u25AA Slash command not loaded.`);
            } */
        } catch (e) {
            e.fileName = file;
            log();
            warn(e);
            warn("SyntaxError:", `file ${file} was incorrectly setup so it was not loaded`);
            log();
        }})(file)
    }

    // Export all the information needed for the !help command, circular dependency fix
    (client.commands.get('help').setup(cmdList)) ? log('\n%cFinished!\n', 'font-weight: bold;') : process.exit(1);

    stopWatch("Commands Load Time", process.uptime(), undefined, true); // Using this to develop asynchronous commands

    console.groupEnd('Startup');

    // ----------------------------------------------------------------

    const MessageTextEvent = async msg => {
        // If the message mentions the bot, return the prefix
        if(msg.mentions.has(client.user) && msg.content.startsWith(`<@${client.user.id}>`)) {
            return msg.reply(`My prefix is \`${prefix}\``);
        };

        if(!msg.content.startsWith(prefix)) return; // if the prefix is not given, return

        // cleans up the command for easy parsing
        const split = msg.content.split(" "), 
            args = split.slice(1),
            command = split[0].slice(prefix.length).toLowerCase();
        
        const cmd = await client.commands.get(command);
        
        if (typeof cmd !== "object") {
            switch (throwInvalid == true) {
                case true:
                    msg.reply(`**${prefix}${command}** is not a valid command.`);
                    return;
                case false:
                    return;
            }
        }
        
        try { // Runs the command
            if (cmd.conf.await) { // Check if await should be used
                await cmd.run(client, msg, args);
            } else {
                cmd.run(client, msg, args);
            }
        } catch (e) { // Respond to an incorrect command
            debug(e, `"${msg.content}"`);

            try {
                await msg.reply(`Please use the format \`${prefix}${cmd.help.usage}\``);
            } catch (e) {
                debug(e);
                try {
                    await msg.reply(`Incorrect usage of \`${prefix}${command}\``);
                } catch (e) {}
            }
        };
    };

    // ------------ Application Commands Under Development ------------
    // const MessageApplicationCommandEvent = async msg => {
    //     const command = interaction.client.commands.get(interaction.commandName).slashCommand;

    //             if (!command) {
    //                 error(`No command matching ${interaction.commandName} was found.`);
    //                 return;
    //             }

    //             try {
    //                 await command.execute(interaction);
    //             } catch (error) {
    //                 error(error);
    //                 await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    //             }
    // };

    // ----------------------------------------------------------------

    client.on(Events.MessageCreate, async msg => {
        if (msg.author.bot) return; // Prevent bots from running commands

        switch (msg.channel.type) {
            case ChannelType.GuildText:
            case ChannelType.GuildStageVoice:
            case ChannelType.GuildVoice:
                MessageTextEvent(msg);
                break;
            case ChannelType.DM:
            case ChannelType.GroupDM:
                break;
        }
    });

    // ------------ Application Commands Under Development ------------
    // client.on(Events.InteractionCreate, async int => {
    //     if (msg.author.bot) return; // Prevent bots from running commands

    //     switch (msg.interaction.type) {
    //         case InteractionType.ApplicationCommand:
    //             MessageApplicationCommandEvent(msg);
    //     }
    // });


    // ----------------------------------------------------------------


    client.on("ready", () => {
        
        // Logs startup info to console in English & Portuguese
        log.bilingual (
            `Bot online with : ${client.users.cache.size} users, ${client.guilds.cache.size} guilds, & ${client.channels.cache.size} channels.`,
            `Bot foi iniciado com : ${client.users.cache.size} usuários, ${client.guilds.cache.size} servidores, e ${client.channels.cache.size} canais.`
        );

        const dt = Date();
        const ut = process.uptime();
        parseSeconds(ut, (time) => {
            log('\nStart Date : ' + dt, "\nLoad Time  : " + time, '\n');
        });

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
    const token = process.env["DISCORD_TOKEN"];
    client.login(token);
    
    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(token);

    log(client.guilds.cache.map((guild) => guild));

    
    // (async (clientId, guildId) => {
    //     try {
    //         log(`Started refreshing ${slashCommands.length} application (/) commands.`);

    //         // The put method is used to fully refresh all commands in the guild with the current set
    //         const data = await rest.put(
    //             Routes.applicationGuildCommands(clientId, guildId),
    //             { body: slashCommands },
    //         );

    //         log(`Successfully reloaded ${data.length} application (/) commands.`);
    //     } catch (err) {
    //         // And of course, make sure you catch and log any errors!
    //         error(err);
    //     }
    // })();
} catch (e) {
    throw e;
}})()