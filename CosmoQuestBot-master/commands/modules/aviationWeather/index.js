const xml2js = require('xml2js'),
fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * Format a METAR or TAF
 * @param {string} rawReport - Unparsed TAF string
 * @return {string}
 */
const _parse = (rawReport, icao) => {
    let rawReportPieces = "", formattedReport = "", tafFlag = false, rmkFlag = false;

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

        // Do not highlight the first or second element of a report (ICAO code or TAF ICAO)
        if ((i > 1) && (v.includes("+") || (v.includes("TS") && i > 1 && rmkFlag === false) || (v.includes("FC") && v !== "FCST"))) {
            v = `**${v}**`; // Was "<span class='extreme_weather'>$element</span>"
        }

        formattedReport += `${v} `;
    })

    if (tafFlag === true) {
        formattedReport += "";
    }

    formattedReport = formattedReport.trim();

    switch (typeof formattedReport === 'string' && formattedReport.length > 0) {
        case true:
            return formattedReport;
        case false:
            return `No ${tafFlag ? "TAF" : "METAR"} available for ${icao}.`;
    }
};


/**
 * \
 * @param {string} type
 * @param {string} icao 
 * @param {JSON} [options] 
 */
const _request = async (type, icao, options) => {
    if (!['tafs', 'metars'].includes(type)) return [new Error("No valid type specified."), null];
    if (!(/^[a-zA-Z]{4}$/).test(icao)) return [new Error("No ICAO code specified."), null];

    let reqUrl = 'https://aviationweather.gov/adds/dataserver_current/httpparam';
    reqUrl += '?dataSource=' + type;
    reqUrl += '&requestType=retrieve';
    reqUrl += '&format=xml';
    reqUrl += '&stationString=' + icao;
    reqUrl += '&mostRecent=true';
    reqUrl += '&hoursBeforeNow=' + (options?.hoursBeforeNow || '12');
    
    let finalResp = "";
    
    try {
        const r = await fetch(reqUrl),
        resp = await r.text();

        // convert XML to JSON
        xml2js.parseString(resp, (err, result) => { //
            if(err) {
                finalResp = [err, null];
                return;
            }

            const tfmt = type.toUpperCase().slice(0,-1);

            /* if (typeof result.response !== "object" || !Array.isArray(result.response.data) || result.response.data.length < 1 || !Array.isArray(result.response.data[0][tfmt])) {
                parsedRprt = [new Error('Issue with response.'), null];
                return;
            }; */
            
            // `result` is a JavaScript object
            if (result.response.data[0][tfmt] !== undefined) {
                const rprt = result.response.data[0][tfmt][0].raw_text.toString();
                finalResp = [null, _parse(rprt, icao)]; // Formats Report to Keeper's liking
            } else {
                finalResp = [null, `No ${tfmt} available for ${icao}.`];
            }
        });
    } catch (e) {
        return [e, null];
    }


    if (Array.isArray(finalResp)) return finalResp;
    return [null, finalResp];
}


const getReport = async (type, icao, options) => {
    if (!(/^[a-zA-Z]{4}$/).test(icao)) throw "Does not follow ICAO regex";
    
    const ICAO = icao.toUpperCase();

    let response = [];

    try {
        response = await _request(type, ICAO, options);
    } catch (e) {
        throw e;
    }

    switch (response[0] === null) {
        case true:
            return response[1];
        case false:
            throw response[0];
    }

    // switch (response[0] === null) {
    //     case true:
    //         return [null, response[1]];
    //     case false:
    //         return [response[0], null];
    // }
}


module.exports = {
    getReport: getReport
}



/* TAF
    NOAA ADDS: https://aviationweather.gov/dataserver
        TAF: https://aviationweather.gov/dataserver/example?datatype=taf

        // dataSource: tafs
        // stationString=CYOW
        // hoursBeforeNow=3
        // &most_recent=true

    Example: https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=CYOW&mostRecent=true&hoursBeforeNow=3

    Returns:
    =======

    HTTP/1.1 200 OK
    Server: Apache-Coyote/1.1
    Strict-Transport-Security: max-age=63072000; includeSubdomains; preload
    X-Frame-Options: SAMEORIGIN
    Content-Type: text/xml
    Vary: Accept-Encoding
    Cache-Control: private, max-age=594
    Date: Sun, 28 Aug 2022 21:43:01 GMT
    Connection: keep-alive

    <?xml version="1.0" encoding="UTF-8"?>
    <response xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              version="1.2" xsi:noNamespaceSchemaLocation="http://www.aviationweather.gov/static/adds/schema/taf1_2.xsd">
        <request_index>522317581</request_index>
        <data_source name="tafs"/>
        <request type="retrieve"/>
        <errors/>
        <warnings/>
        <time_taken_ms>12</time_taken_ms>
        <data num_results="1">
            <TAF>
                <raw_text>TAF CYOW 282040Z 2821/2918 VRB03KT P6SM FEW040 SCT240 FM290600 VRB03KT P6SM SCT060 FM291200
                    18005KT P6SM BKN070 BECMG 2916/2918 21012G22KT RMK NXT FCST BY 290000Z
                </raw_text>
                <station_id>CYOW</station_id>
                <issue_time>2022-08-28T20:40:00Z</issue_time>
                <bulletin_time>2022-08-28T20:00:00Z</bulletin_time>
                <valid_time_from>2022-08-28T21:00:00Z</valid_time_from>
                <valid_time_to>2022-08-29T18:00:00Z</valid_time_to>
                <remarks>RMK NXT FCST BY 290000Z</remarks>
                <latitude>45.32</latitude>
                <longitude>-75.67</longitude>
                <elevation_m>111.0</elevation_m>
                <forecast>
                    <fcst_time_from>2022-08-28T21:00:00Z</fcst_time_from>
                    <fcst_time_to>2022-08-29T06:00:00Z</fcst_time_to>
                    <wind_dir_degrees>0</wind_dir_degrees>
                    <wind_speed_kt>3</wind_speed_kt>
                    <visibility_statute_mi>6.21</visibility_statute_mi>
                    <sky_condition sky_cover="FEW" cloud_base_ft_agl="4000"/>
                    <sky_condition sky_cover="SCT" cloud_base_ft_agl="24000"/>
                </forecast>
                <forecast>
                    <fcst_time_from>2022-08-29T06:00:00Z</fcst_time_from>
                    <fcst_time_to>2022-08-29T12:00:00Z</fcst_time_to>
                    <change_indicator>FM</change_indicator>
                    <wind_dir_degrees>0</wind_dir_degrees>
                    <wind_speed_kt>3</wind_speed_kt>
                    <visibility_statute_mi>6.21</visibility_statute_mi>
                    <sky_condition sky_cover="SCT" cloud_base_ft_agl="6000"/>
                </forecast>
                <forecast>
                    <fcst_time_from>2022-08-29T12:00:00Z</fcst_time_from>
                    <fcst_time_to>2022-08-29T16:00:00Z</fcst_time_to>
                    <change_indicator>FM</change_indicator>
                    <wind_dir_degrees>180</wind_dir_degrees>
                    <wind_speed_kt>5</wind_speed_kt>
                    <visibility_statute_mi>6.21</visibility_statute_mi>
                    <sky_condition sky_cover="BKN" cloud_base_ft_agl="7000"/>
                </forecast>
                <forecast>
                    <fcst_time_from>2022-08-29T16:00:00Z</fcst_time_from>
                    <fcst_time_to>2022-08-29T18:00:00Z</fcst_time_to>
                    <change_indicator>BECMG</change_indicator>
                    <time_becoming>2022-08-29T18:00:00Z</time_becoming>
                    <wind_dir_degrees>210</wind_dir_degrees>
                    <wind_speed_kt>12</wind_speed_kt>
                    <wind_gust_kt>22</wind_gust_kt>
                    <visibility_statute_mi>6.21</visibility_statute_mi>
                    <sky_condition sky_cover="BKN" cloud_base_ft_agl="7000"/>
                </forecast>
            </TAF>
        </data>
    </response>


    Response file saved.
    > 2022-08-28T174301.200.xml

    Response code: 200 (OK); Time: 389ms (389 ms); Content length: 2967 bytes (2.97 kB)
*/


/* METAR
    NOAA ADDS: https://aviationweather.gov/dataserver
        METAR: https://aviationweather.gov/dataserver/example?datatype=metar

        // dataSource: metars
        // stationString=CYOW
        // hoursBeforeNow=3
        // &most_recent=true

    Example: https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=CYOW&mostRecent=true&hoursBeforeNow=3

    Returns:
    =======

    HTTP/1.1 200 OK
    Server: Apache-Coyote/1.1
    Strict-Transport-Security: max-age=63072000; includeSubdomains; preload
    X-Frame-Options: SAMEORIGIN
    Content-Type: text/xml
    Vary: Accept-Encoding
    Cache-Control: private, max-age=600
    Date: Mon, 22 Aug 2022 01:18:50 GMT
    Connection: keep-alive

    <?xml version="1.0" encoding="UTF-8"?>
    <response xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                version="1.2" xsi:noNamespaceSchemaLocation="http://www.aviationweather.gov/static/adds/schema/metar1_2.xsd">
        <request_index>442255379</request_index>
        <data_source name="metars"/>
        <request type="retrieve"/>
        <errors/>
        <warnings/>
        <time_taken_ms>6</time_taken_ms>
        <data num_results="1">
            <METAR>
                <raw_text>CYOW 220100Z 23003KT 220V280 15SM FEW070 BKN260 20/19 A2995 RMK AC2CI5 DIST LTNG SE SLP144 DENSITY
                    ALT 1000FT
                </raw_text>
                <station_id>CYOW</station_id>
                <observation_time>2022-08-22T01:00:00Z</observation_time>
                <latitude>45.32</latitude>
                <longitude>-75.67</longitude>
                <temp_c>20.0</temp_c>
                <dewpoint_c>19.0</dewpoint_c>
                <wind_dir_degrees>230</wind_dir_degrees>
                <wind_speed_kt>3</wind_speed_kt>
                <visibility_statute_mi>15.0</visibility_statute_mi>
                <altim_in_hg>29.949802</altim_in_hg>
                <sea_level_pressure_mb>1014.4</sea_level_pressure_mb>
                <sky_condition sky_cover="FEW" cloud_base_ft_agl="7000"/>
                <sky_condition sky_cover="BKN" cloud_base_ft_agl="26000"/>
                <flight_category>VFR</flight_category>
                <metar_type>METAR</metar_type>
                <elevation_m>111.0</elevation_m>
            </METAR>
        </data>
    </response>


    Response file saved.
    > 2022-08-21T211850.200.xml

    Response code: 200 (OK); Time: 186ms (186 ms); Content length: 1399 bytes (1.4 kB)
*/