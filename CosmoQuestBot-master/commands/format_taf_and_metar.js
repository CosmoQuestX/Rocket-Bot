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