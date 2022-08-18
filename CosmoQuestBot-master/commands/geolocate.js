const geocodeMap = require('./modules/geocodeMapSearch'); // Forward-Geocode Search 
const { warn, debug } = require('../public/async-logs');


const stageOne = async (msg, args) => {
    new Promise((resolve, reject) => {
        if (args.length < 1) throw "No arguments passed";

        args = args.join(' ');
        
        geocodeMap.forwardSearch({search: args, unitsType: 'metric'}, function(err, result) {

            // Error Messages
            if(err) { // If err, it will parse then end
                //warn(err);
                if (result && result.error && result.error.message) resolve(msg.channel.send({ // Send error message if result.message given
                    "embeds": [{
                        "title": `:warning: ${result.message}`,
                        "description": "Check logs for more detailed information."
                    }]
                }));
            }
            
            debug(JSON.stringify(result, null, 2));
            
            if (result === undefined || result.length < 1) {
                resolve(msg.channel.send({ // Here just in case
                    "embeds": [{
                        "title": ":warning: Error parsing data!",
                        "description": "Check logs for more detailed information."
                    }]
                }));
            }

            resolve(result);
        });
    })
};


exports.run = async (_, msg, args) => {
    let a = await stageOne(msg, args); // WHYYYYYYYYYYYYYYYYYYYYYYYYYY
    debug(a);
    resolve(undefined);
}

exports.conf = {
    enabled: false,
    await: true,
    guildOnly: false,
    permLevel: 1,
    type: 5
};

exports.help = {
    name: `geolocate`,
    aliases: [
        "geo",
        "locate",
        "location",
        "whereis"
    ],
    description: `Get info about anywhere (on Earth).`,
    usage: `geolocate <location>`
};