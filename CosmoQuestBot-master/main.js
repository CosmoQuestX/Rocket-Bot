// Configuring dotenv package & token variable
require('dotenv').config();

asyncLogs = require('./public/async-logs'); // Creates global variable asyncLogs; Useful for modules
const { log, warn, debug, parseSeconds, startWatch, stopWatch } = asyncLogs;

config = require('./config.json');  // Creates global variable config

prefix = "!"; // Creates global variable prefix w/ default of "!"

const fs = require('fs');

const { Client, Intents, Collection } = require('discord.js'); // Not a global variable on-purpose to prevent data mishandling
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

(async () => { try {
    
    require('./public/getNasa')(client, process.exit);
    if (process.argv[2] === "nasa") return;
    
    client.commands = new Collection();
    
    const { statusMessages, throwInvalid } = config; // Importing needed configs

    prefix = config.prefix || prefix; // If config.prefix===undefined then do default (set above)

    
    // ----------------------------------------------------------------
    

    log('\n%cLoading Commands...\n', 'font-weight: bold;');

    startWatch("Commands loading time", process.uptime());

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    helpList = []; // Array used for the help command
    cmdList = []; // Array later used to store command information

    for (const file of commandFiles) {
        (async (file) => {try {

            let cmd = require(`./commands/${file}`);

            // grabs the help & conf exports
            const   help    = cmd.help,
                    conf    = cmd.conf


            if (typeof conf !== 'object' || !conf.enabled) {
                debug("\u23ED " + file + "\t\u2192\t " + JSON.stringify(conf)); // Log Skipped
                return;
            }
            if (typeof help !== 'object' || !help.name) {
                warn(new Error(`help.name of ${file} is undefined`));
                return;
            }
            
            let obj = {name: help.name, debug: conf}; // used once for entering data in help, deleted after

            client.commands.set(help.name, cmd); // defines the commands, this will be used for running the commands

            if (typeof help.description === 'string') obj.description = help.description; // Add description if it exists

            if (typeof help.usage === 'string') obj.usage = help.usage; // Add usage info if it exists

            switch (Array.isArray(help.aliases) && help.aliases.length > 0) { // if there are no aliases, don't add them
                case true:
                    for (alias of help.aliases) {
                        client.commands.set(alias, cmd);
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
                helpList.push({ name: (prefix + obj.name), value: (obj.description || ((typeof obj.usage === "string" && obj.usage.length > 0) ? `${prefix}${obj.usage}` : "<:TealDeer:910194620732932106>")), inline: true}); // adds the information to the commands list
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

    stopWatch("Commands loading time", process.uptime(), undefined, true); // Using this to develop asynchronous commands

    // ----------------------------------------------------------------

    client.on("messageCreate", async msg => {
        if(msg.author.bot || msg.channel.type === "dm") return;
        
        if(msg.mentions.has(client.user) && msg.content.startsWith(`<@${client.user.id}>`)) { // If the message mentions the bot, return the prefix
            return msg.reply(`My prefix is \`${prefix}\``);
        };

        if(!msg.content.startsWith(prefix)) return; // if the prefix is not given, return

        // cleans up the command for easy parsing
        let args = msg.content.split(" ").slice(1);
        let command = msg.content.split(" ")[0];
        command = command.slice(prefix.length).toLowerCase();
        
        const cmd = await client.commands.get(command);
        
        if (typeof cmd !== "object") {
            switch (throwInvalid == true) {
                case true:
                    msg.reply(`**${prefix}${command}** is not a valid command.`);
                    return;
                case false:
                    return;
            }
            return; // Just in case
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
    });


    // ----------------------------------------------------------------


    client.on("ready", () => {
        
        // Logs startup info to console in English & Portuguese
        log.bilingual (
            `Bot online with : ${client.users.cache.size} users, ${client.guilds.cache.size} guilds, & ${client.channels.cache.size} channels.`,
            `Bot foi iniciado com : ${client.users.cache.size} usuários, ${client.guilds.cache.size} servidores, e ${client.channels.cache.size} canais.`
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
} catch (e) {
    throw e;
}})()