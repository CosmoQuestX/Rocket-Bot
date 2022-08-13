/*
 * Based off Weather.js
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

/* jslint node: true, sub: true */
'use strict';

const { debug } = require('console');

require('dotenv').config();
const request     = require('request'),
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


// ------------------------------


/**
 * Find the weather from a location
 * 
 * @param {object} options - JSON options
 * @param {string} options.search - Search query
 * @param {string} [options.lang=en] - Result language
 * @param {string} [options.unitsType=metric] - Units-of-Measurement to use
 * @param {number} [options.timeout=10000] - Request timeout in milliseconds
 * 
 * @param {function} callback - Callback function
 */
exports.find = function find(options, callback) {

    // Errors
    if(typeof callback !== 'function') callback = function callback(err, result) { return (err || result); };

    if(!options || typeof options !== 'object') return callback('invalid options');

    if(!options.search) return callback('missing search input');

    // Setting default values
    let defLang     = 'en',
    defUnits    = 'metric',
    defTimeout  = 10000,
    findUrl     = 'http://api.openweathermap.org/data/2.5/weather';
    
    // If undefined, use default
    let     pBody       = [],
            lang        = options.lang || defLang,
            unitsType   = options.unitsType || defUnits,
            timeout     = options.timeout || defTimeout,
            search      = encodeURIComponent(''+options.search),
            reqUrl      = findUrl + '?units=' + (''+unitsType) + '&lang=' + (''+lang) + '&q=' + search + '&appid=' + apiKey;
    
    /* console.debug(reqUrl); */

    // Request weather
    request.get({url: reqUrl, timeout: timeout}, function(err, res, body) {
        
        if (err) {
            return callback(err); // Never return an unchecked Error Message to the front-end user.
        }
        
        let pBody = JSON.parse(body);
        /* debug(pBody); */
        if (pBody.message) pBody.message = toTitleCase(pBody.message);


        if (res.statusCode !== 200) {
            switch (res.statusCode) {
                case 401:
                    switch (pBody.message.length > 0) {
                        case true:
                            return callback(new Error(`Authorization Failed (${res.statusCode})\nError Message: ${pBody.message}`), pBody);
                        case false:
                            return callback(new Error(`Authorization Failed (${res.statusCode})`), pBody);
                    }
                case 404:
                    switch (pBody.message.length > 0) {
                        case true:
                            return callback(new Error(`${pBody.message} (${res.statusCode})`), pBody);
                        case false:
                            return callback(new Error(`Request Failed (${res.statusCode})`), pBody);
                    }
                default:
                    switch (pBody.message.length > 0) {
                        case true:
                            return callback(new Error(`Request Failed (${res.statusCode})\nError Message: ${pBody.message}`), pBody);
                        case false:
                            return callback(new Error(`Request Failed (${res.statusCode})`), pBody);
                    }
            }
        }
        if (pBody == undefined) {
            return callback(new Error('pBody is undefined'), pBody);
        }

        pBody.success = true;

        // Check body content
        if(!(typeof pBody.weather[0] == 'object')) {
            return callback(new Error('pBody.weather Array came back empty'));
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
            pBody.wind.leadDeg = String(pBody.wind.deg).padStart(3, '0');
            pBody.wind.kmSpeed = (pBody.wind.speed * 3.6).toFixed(2);
        } catch (e) {
            return callback(e);
        }

        return callback(null, pBody);
    });
};