/*
 * Based off Weather.js
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

/* jslint node: true, sub: true */
'use strict';

const { debug, log } = asyncLogs;

require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function toTitleCase(str) { // src: https://www.w3docs.com/snippets/javascript/how-to-convert-string-to-title-case-with-javascript.html
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

/**
 * Forward-Search Geolocation
 * 
 * @param {string} search The search query
 * @param {function} callback The callback function
 * 
 * @return {Error|JSON}
 */
exports.forwardSearch = function (options, callback) {

    // Errors
    if(typeof callback !== 'function') callback = function callback(err, result) { return (err || result); };

    if(typeof options !== 'object') return callback(new Error('invalid options'));

    if(typeof options.search !== 'string') return callback(new Error('missing search input'));


    let defTimeout  = 10000,
        findUrl     = 'https://geocode.maps.co/search';


    let     timeout     = options.timeout || defTimeout,
            search      = encodeURIComponent(''+options.search),
            reqUrl      = findUrl + '?q=' + search + '&limit=1';
    
    //console.debug(reqUrl);

    fetch(url).then(function(err, res, body) {
        /* !!! THIS NEEDS TO BE RE-DONE WITH node-fetch !!! */
        if (err) {
            return callback(err, {message: ":warning: Check logs for more information"}); // Never return an unchecked Error Message to the front-end user
        }

        let pBody = JSON.parse(body);

        if (pBody.length < 1) return callback(new RangeError('Geocode responded with an empty array'));
        if (pBody.error !== undefined) return callback(new Error(`${pBody.error.code} - ${pBody.error.message}`));


        if (res.statusCode !== 200) {
            switch (res.statusCode) {
                case 401:
                    switch (pBody.error.message && pBody.error.message.length > 0) {
                        case true:
                            return callback(new Error(`Authorization Failed (${pBody.error.code})\nError Message: ${pBody.message}`), pBody);
                        case false:
                            return callback(new Error(`Authorization Failed (${pBody.error.code})`), pBody);
                    }
                case 404:
                    switch (pBody.error.message && pBody.error.message.length > 0) {
                        case true:
                            return callback(new Error(`${pBody.message} (${pBody.error.code})`), pBody);
                        case false:
                            return callback(new Error(`Request Failed (${pBody.error.code})`), pBody);
                    }
                default:
                    switch (pBody.error.message && pBody.error.message.length > 0) {
                        case true:
                            return callback(new Error(`Request Failed (${pBody.error.code})\nError Message: ${pBody.message}`), pBody);
                        case false:
                            return callback(new Error(`Request Failed (${pBody.error.code})`), pBody);
                    }
            }
        }
        if (pBody === undefined) {
            return callback(new Error('pBody is undefined'), pBody);
        }

        if (pBody.length > 0)
            pBody.success = true;
        else
            return callback(new Error('pBody '))

        // Parsing Data
        try {
            /* Nothing To Parse */
        } catch (e) {
            return callback(e);
        }

        debug('check');

        return callback(null, pBody);
    });
};

exports.reverseSearch = function (options, callback) {

    // Errors
    if(typeof callback !== 'function') callback = function callback(err, result) { return (err || result); };

    if(typeof options !== 'object') return callback(new Error('invalid options'));

    if(typeof options.lat !== 'string') return callback(new Error('missing latitude input'));
    if(typeof options.lon !== 'string') return callback(new Error('missing longitude input'));


    let defTimeout  = 10000,
        findUrl     = 'https://geocode.maps.co/reverse';


    let     timeout     = options.timeout || defTimeout,
            lat      = encodeURIComponent(''+options.lat),
            lon      = encodeURIComponent(''+options.lon),
            reqUrl      = findUrl + '?lat=' + lat + '&lon=' + lon + '&limit=1';
    
    //console.debug(reqUrl);

    request.get({url: reqUrl, timeout: timeout}, function(err, res, body) {
        
        if (err) {
            return callback(err, {message: ":warning: Check logs for more information"}); // Never return an unchecked Error Message to the front-end user
        }

        let pBody = JSON.parse(body);

        if (pBody.length < 1) return callback(new RangeError('Geocode responded with an empty array'));
        if (pBody.error !== undefined) return callback(new Error(`${pBody.error.code} - ${pBody.error.message}`));


        if (res.statusCode !== 200) {
            switch (res.statusCode) {
                case 401:
                    switch (pBody.error.message && pBody.error.message.length > 0) {
                        case true:
                            return callback(new Error(`Authorization Failed (${pBody.error.code})\nError Message: ${pBody.message}`), pBody);
                        case false:
                            return callback(new Error(`Authorization Failed (${pBody.error.code})`), pBody);
                    }
                case 404:
                    switch (pBody.error.message && pBody.error.message.length > 0) {
                        case true:
                            return callback(new Error(`${pBody.message} (${pBody.error.code})`), pBody);
                        case false:
                            return callback(new Error(`Request Failed (${pBody.error.code})`), pBody);
                    }
                default:
                    switch (pBody.error.message && pBody.error.message.length > 0) {
                        case true:
                            return callback(new Error(`Request Failed (${pBody.error.code})\nError Message: ${pBody.message}`), pBody);
                        case false:
                            return callback(new Error(`Request Failed (${pBody.error.code})`), pBody);
                    }
            }
        }
        if (pBody === undefined) {
            return callback(new Error('pBody is undefined'), pBody);
        }

        if (pBody.length > 0)
            pBody.success = true;
        else
            return callback(new Error('pBody '))

        // Parsing Data
        try {
            /* Nothing To Parse */
        } catch (e) {
            return callback(e);
        }

        debug('check');

        return callback(null, pBody);
    });
}