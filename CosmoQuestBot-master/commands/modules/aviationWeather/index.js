/**
 * Format a METAR or TAF
 * @param {string} rawReport - Unparsed TAF string
 * @return {string} Markdown formatted string
 */
exports.parse = function parse (rawReport) {
    let rawReportPieces, formattedReport = "", tafFlag = false, rmkFlag = false;

    rawReportPieces = rawReport.split(" "); // Split words separated by spaces into array

    rawReportPieces.forEach((v, i) => { // Runs through the array [v: Value, i: Index Number]

        if (v.substring(0,2) === "FM" && i > 0) { // If begins with "FM" and index number is greater than zero
            if (tafFlag === true) {
                v = `\n\t${v}`; // Was "</span><br /><span class='taf_period'>$element"
            } else {
                tafFlag = true;
                v = `\n\t${v}`; // Was "<br /><span class='taf_period'>$element "
            }
        }

        if (v === "RMK") {
            rmkFlag = true;
            if (tafFlag === true) { // should only get here for a TAF
                v = `\n\t${v}`; // Was "</span><br /><span class='taf_period'>$element"
            }
        }

        if (v === "BECMG") {
            v = `\n\t${v}`; // Was "</span><br /><span class='taf_period'>$element"
        }

        if (v.includes("+") || (v.includes("TS") && i > 0 && rmkFlag === false) || (v.includes("FC") && v !== "FCST")) {
            v = `**${v}**`; // Was "<span class='extreme_weather'>$element</span>"
        }

        formattedReport += `${v} `;
    })

    if (tafFlag === true) {
        formattedReport += "";
    }

    formattedReport += "";
    return formattedReport;
}