/**
 * NOTE :
 * - some important command features may be changed/broken in the future
 */


/**
 * This handles the command
 * @see {@link help.aliases}
 * @param {Discord.Client} client   - The bot's client instance
 * @param {Discord.Message} message - The data received from Discord about the message
 * @param {Object[]} args           - The message from the client split from all spaces omitting the command (Example: `"!say Hello World" == ["Hello", "World"]`)
 */
const run = function example (client, message, args) { // "run" is required (when enabled)
    /* Command code here */
    message.reply('Hello World!'); // responds with 'Hello World!'
}

// -------------------------------------------------------------------------

/**
 * This is where the all the configuration settings go
 * 
 * @example
 * const conf = {
 *    enabled: true,  // enable & disable the command
 *    permLevel: 1,   // To-Be Implemented (No Use)
 *    type: 5         // To-Be Implemented (No Use)
 * }
 */
const conf = { // The only required conf config is "enabled" (when true)
    enabled: false
}

// -------------------------------------------------------------------------

/**
 * - This is where the commands list gets it's information.
 * - You do not need to change the script name to change the command name, just change `help.name`
 * 
 * 
 * @example
 * const help = {                                   // The prefix is added in the help command
 *     name: `example`,                             // No spaces or lowercase, the prefix is added automatically
 *     aliases: [                                   // Make sure aliases are lower-case & have no spaces
 *          "othername",
 *          "anothername"
 *     ],
 *     description: `Get the list of commands.`,    // The description shown using the !help command
 *     usage: `help [command]`                      // <> for mandatory & [] for optional
 * 
 *  // `omit` is a temporary solution
 *     omit: true                                   // Hides the command from !help
 * }
 */
const help = { // The only required help config is "name" (when enabled)
    name: `example`,
    description: `This is an example command.`
}

module.exports = {run, conf, help} // this is a clean way to export multiple at once