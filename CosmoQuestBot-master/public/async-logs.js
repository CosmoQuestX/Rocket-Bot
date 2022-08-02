// 100% unnecessary... but not like it adds much to space

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
    console.debug(...args);
}
