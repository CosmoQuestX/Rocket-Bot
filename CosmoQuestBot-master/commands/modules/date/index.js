/**
 * 
 * @param {Date} [date]
 * @returns {number}
 */
const getJulianDay = (date = new Date()) => {
    const m = date.getUTCMonth() + 1, // Month (1=>Jan; [...]; 12=>Dec)
    jf = m < 3, // is January or February

    // Date
    Y = jf ? date.getUTCFullYear() - 1 : date.getUTCFullYear(),
    M = jf ? m + 12 : m,
    D = date.getUTCDate(),
    A = Y / 100,
    B = A / 4,
    C = 2 - A + B,
    E = 365.25 * (Y + 4716),
    F = 30.6001 * (M + 1),
    JDN = Math.floor(C + D + E + F - 1524.5), // Math.floor prevents floating point issues

    // Time
    HH = date.getUTCHours(),
    MM = date.getUTCMinutes(),
    SS = date.getUTCSeconds(),
    TT = ((HH - 12) / 24) + (MM / 1440) + (SS / 86400),

    // All together now
    JD = JDN + TT;
    return JD;
}


const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

/**
 * Adds the correct Ordinal Suffix to a number.
 * @param {number} i - Whole Number
 * @returns {string}
 */
function ordinal_suffix_of(i) { // src : https://gist.github.com/frank184/cb992e676e3aa85246dbcf1c2aaa3462
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
};

/**
 * Returns a formatted Date & Time in the given timezone (only UTC atm)
 * @param {Date} [date]
 * @param {"UTC"} tz="UTC"
 */
const getFormattedDate = (date = new Date(), tz = "UTC") => {
    switch (tz) {
        case "UTC":
            return `${shortMonths[date.getUTCMonth()]} ${ordinal_suffix_of(date.getUTCDate())}, ${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")} UTC`;
    }
}

module.exports = {
    getJulianDay,
    getFormattedDate
}