const { log } = require('./async-logs');
const { channelId } = require('../config.json');
require('dotenv').config();

module.exports = (function getNasa (Discord, client, callback) {
    if (process.argv[2] !== "nasa") return;

    client.on('ready', ()=> {
        client.channels.cache.get(channelId).send(`Hello World!`);
        setTimeout(()=>{callback()}, 500);
    })

    token = process.env["DISCORD_TOKEN"];
    client.login(token);
    void(delete token);
})