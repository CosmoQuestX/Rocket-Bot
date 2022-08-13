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
const run = function example (client, message, args) {
    /* Command code here */
    message.channel.send('Hello World!'); // sends the message 'Hello World!' in the request channel
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
const conf = {
    enabled: false,
    permLevel: 1,
    type: 5
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
 * }
 */
const help = {
    name: `example`,
    description: `This is an example command.`,
    usage: `example <something> [maybe-something]`
}

module.exports = {run, conf, help} // this is a clean way to export multiple at once