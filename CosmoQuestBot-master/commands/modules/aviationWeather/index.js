/* This is the placeholder for the eventual JS implementation of this PHP code taken from KeeperOfMaps/OBS_Widgets:
-----8<-----
/*
 * Format a METAR or TAF
 * @param string $raw_report
 * @return string HTML formatted METAR or TAF

function format_metar_taf(string $raw_report): string
{
    // split $raw_report into pieces
    $raw_report_pieces=explode(" ", $raw_report);

    $formatted_report='<span class="metar_taf">';
    $taf_flag='no';
    $rmk_flag='no';

    for ($i=0; $i<sizeof($raw_report_pieces); $i++) {
        $element=$raw_report_pieces[$i];
        if ((substr($element,0,2) == "FM") && ($i <> 0)) {
            if ($taf_flag=='yes') {
                $element = "</span><br /><span class='taf_period'>$element";
            } else {
                $taf_flag='yes';
                $element = "<br /><span class='taf_period'>$element ";
            }
        }
        if ($element == "RMK") {
            $rmk_flag='yes';
            if ($taf_flag=='yes') { // should only get here for a TAF
                $element = "</span><br /><span class='taf_period'>$element";
            }
        }
        if ($element == "BECMG") {
            $element = "</span><br /><span class='taf_period'>$element";
        }
        if ((str_contains($element,"+")) ||((str_contains($element,"TS")) && ($i <> 0) && ($rmk_flag=='no')) || ((str_contains($element, "FC")) && ($element != "FCST"))) {
            $element = "<span class='extreme_weather'>$element</span>";
        }
        $formatted_report .= "$element ";
    }
    if ($taf_flag=='yes') {
        $formatted_report .= "</span>";
    }
    $formatted_report .= "</span>";
    return $formatted_report;
}
-----8<-----

 */

/**
 * Converts TAF into a ... [Embed?, Parsed Text]
 * @param {string} rawReport - Unparsed TAF string
 */
exports.parse = function parse (rawReport) {
    let rawReportPieces, formattedReport = "", tafFlag = false, rmkFlag = false;

    rawReportPieces = rawReport.split(" "); // Split words separated by spaces into array

    rawReportPieces.forEach((v, i) => { // Runs through the array [v: Value, i: Index Number]

        if (v.substring(0,2) === "FM" && i > 0) { // If begins with "FM" and index number is greater than zero
            if (tafFlag === true) {
                v = `\n\t${v}`; // FIXME : Was "</span><br /><span class='taf_period'>$element"
            } else {
                tafFlag = true;
                v = `\n\t${v}`; // FIXME : Was "<br /><span class='taf_period'>$element "
            }
        }

        if (v === "RMK") {
            rmkFlag = true;
            if (tafFlag === true) { // should only get here for a TAF
                v = `\n\t${v}`; // FIXME : Was "</span><br /><span class='taf_period'>$element"
            }
        }

        if (v === "BECMG") {
            v = `\n\t${v}`; // FIXME : Was "</span><br /><span class='taf_period'>$element"
        }

        if (v.includes("+") || (v.includes("TS") && i > 0 && rmkFlag === false) || (v.includes("FC") && v !== "FCST")) { // FIXME : If "+" only ever shows at beginning of "word", we could use includes("+", 0)
            v = `**${v}**`; // FIXME : Was "<span class='extreme_weather'>$element</span>"
        }

        formattedReport += `${v} `;
    })

    if (tafFlag === true) {
        formattedReport += "";
    }

    formattedReport += "";
    return formattedReport;
}