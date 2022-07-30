/*
 * Weather
 * For the full copyright and license information, please view the LICENSE.txt file.
 *
 * To-Do: Fix Consistency of callbacks (figured them out half-way through)
 */

/* jslint node: true, sub: true */
'use strict';

require('dotenv').config();
let request     = require('request'),
    apiKey  = process.env.WEATHER_API_KEY;

function toTitleCase(str) { // src: https://www.w3docs.com/snippets/javascript/how-to-convert-string-to-title-case-with-javascript.html
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function degToCompass(num) { // src: https://gist.github.com/basarat/4670200?permalink_comment_id=2335080#gistcomment-2335080
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

// Init the module
module.exports = (function() {

    let defLang     = 'en',
        defUnits    = 'metric',
        defTimeout  = 10000,
        findUrl     = 'http://api.openweathermap.org/data/2.5/weather';

    let find = function find(options, callback) {

        if(typeof callback !== 'function')
            callback = function callback(err, result) { return err || result; };

        if(!options || typeof options !== 'object')
            return callback('invalid options');

        if(!options.search)
            return callback('missing search input');

        let pBody          = [],
                lang        = options.lang || defLang,
                unitsType  = options.unitsType || defUnits,
                timeout     = options.timeout || defTimeout,
                search      = encodeURIComponent(''+options.search),
                reqUrl      = findUrl + '?units=' + (''+unitsType) + '&lang=' + (''+lang) + '&q=' + search + '&appid=' + apiKey;
        
        //console.debug(reqUrl);

        request.get({url: reqUrl, timeout: timeout}, function(err, res, body) {

            let pBody = JSON.parse(body);
            if (pBody.message) pBody.message = toTitleCase(pBody.message);

            if (err) {
                console.warn(err);
                return callback(null, pBody); // Never return an unchecked Error Message to the front-end user.
            }

            if (res.statusCode !== 200) {
                switch (res.statusCode) {
                    case 401:
                        switch (pBody.message.length > 0) {
                            case true:
                                console.warn(new Error(`Authorization Failed (${res.statusCode})\nError Message: ${pBody.message}`));
                                return callback(null, pBody);
                            case false:
                                console.warn(new Error(`Authorization Failed (${res.statusCode})`));
                                return callback(null, pBody);
                        }
                    case 404:
                        switch (pBody.message.length > 0) {
                            case true:
                                console.warn(new Error(`${pBody.message} (${res.statusCode})`));
                                return callback(null, pBody);
                            case false:
                                console.warn(new Error(`Request Failed (${res.statusCode})`));
                                return callback(null, pBody);
                        }
                    default:
                        switch (pBody.message.length > 0) {
                            case true:
                                console.warn(new Error(`Request Failed (${res.statusCode})\nError Message: ${pBody.message}`));
                                return callback(null, pBody);
                            case false:
                                console.warn(new Error(`Request Failed (${res.statusCode})`));
                                return callback(null, pBody);
                        }
                }
            }
            if (pBody == undefined) {
                console.warn(new Error('pBody is undefined'));
                return callback(null, pBody);
            }

            pBody.success = true;

            // Check body content
            if(!(typeof pBody.weather[0] == 'object')) {
                console.warn(new Error('pBody.weather Array came back empty'));
                return callback(pBody);
            }

            if(!pBody || !pBody.weather || !pBody.main)
                return callback(new Error('no weather data found'));

            if(!(pBody.weather instanceof Array)) {
                return callback(new Error('missing weather info'));
            }

            // Parsing Data
            try {
                pBody.weather[0].description = toTitleCase(pBody.weather[0].description);
                pBody.wind.cardinal = degToCompass(pBody.wind.deg);
            } catch (e) {
                return callback(e);
            }

            return callback(null, pBody);
        });
    };

    return {
        find: find
    };
})();