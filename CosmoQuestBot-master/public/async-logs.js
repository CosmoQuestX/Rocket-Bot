// 100% unnecessary... but not like it adds much to space

let debug = require('../config.json').debug || false; // Checks if debug is enabled

exports.log = async function (...args) {
    console.log(...args);
}

exports.log.bilingual = async function (a, b) {
    let frmt = ["%c[%c" + a + "%c] / [%c" + b + "%c]"];

    frmt.push("font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;");

    console.log(...frmt);
}

exports.error = async function (...args) {
    console.error(...args);
}

exports.warn = async function (...args) {
    console.warn(...args);
}

exports.debug = async function (...args) {
    if (debug)
        console.debug(...args);
}

/**
 * Converts seconds to hh:mm:ss:mss
 * 
 * @param {number} time Time in seconds
 * @param {function} [callback] Deprecated: Callback function

 */
exports.parseSeconds = function (time, callback) {
    time = time || 0;
    let hours = Math.floor(time / (60*60)).toString().padStart(2,'0');
    let minutes = Math.floor(time % (60*60) / 60).toString().padStart(2,'0');
    let seconds = Math.floor(time % 60).toString().padStart(2,'0');
    let milliseconds = time.toFixed(3).toString().substring(time.toString().indexOf('.')+1);
    
    let parsed = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    callback(parsed);
}


// NOTICE : Stop-Watch functions are not completed, but able to log


timers = {};

exports.startWatch = async function (name, time, callback) {
    let t = time || process.uptime();
    let rt;
    switch (typeof timers[name]) {
        case "undefined":
            timers[name] = t;
            rt = name;
            break;
        case "number":
            console.warn(new Error(name + ` is already defined`));
            rt = -1 * timers[name];
            break;
        default:
            exports.debug(timers[name]);
            console.warn(new TypeError(`timer ${name} is not a number or undefined`));
            delete timers[name];
            rt = NaN;
            break;
    }

    try {
        callback(rt);
    } catch (_) {}
}

/* exports.getWatch = function(name, time, log) {
    
} */

exports.stopWatch = async function(name, time, callback, log) {
    let t = time || process.uptime();
    let rt;
    switch (typeof timers[name]) {
        case "undefined":
            console.warn(new Error(`timer ${name} has not been initialized`));
            rt = NaN;
            break;
        case "number":
            rt = t - timers[name];
            break;
        default:
            exports.debug(timers[name]);
            console.warn(new TypeError(name + ` is not a number or undefined`));
            rt = NaN;
            break;
    }

    delete timers[name];
    
    if (log)
        exports.parseSeconds(rt, (time) => {
            exports.log(`${name}: ${time}\n`);
        });

    try {
        callback(rt);
    } catch (_) {}
}