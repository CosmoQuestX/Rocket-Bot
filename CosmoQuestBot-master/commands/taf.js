const { debug, warn, log } = asyncLogs;

const xml2js = require('xml2js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

require('format_taf_and_metar.js');

exports.run = function taf (_, msg, args) {

    if (args.length < 1) throw  "No station specified";

    args = args.join(' ');

    /* NOAA ADDS: https://aviationweather.gov/dataserver
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

    // Parse the parameters
    // Build the URL

    var reqUrl = 'https://aviationweather.gov/adds/dataserver_current/httpparam?';
    reqUrl += 'dataSource=tafs';
    reqUrl += '&requestType=retrieve&format=xml';
    reqUrl += '&stationString=' + `${args}`;
    reqUrl += '&mostRecent=true&hoursBeforeNow=12';

    // msg.channel.send("requestString: "+requestString);

    // Retrieve the data

//    var request = new XMLHttpRequest();

    fetch(reqUrl)
        .then(async r => {
            try {
                const resp = await r.text();

                // convert XML to JSON
                xml2js.parseString(resp, (err, result) => { //
                    if(err) {
                        return debug(err);
                    }

                    if (typeof result.response !== "object" || !Array.isArray(result.response.data) || result.response.data.length < 1 || !Array.isArray(result.response.data[0].TAF)) return;

                    // `result` is a JavaScript object

                    const taf = result.response.data[0].TAF[0]; // JSON Object; Try taf.raw_text

                    // debug(json);

                    //msg.channel.send("Result: "  + json);

                    // TODO add response for no forecast received
                    //if (!isnull(result.response.data[0])) {
                        msg.channel.send(taf.raw_text.toString());
                    //} else {
                    //    msg.channel.send("No forecast for " + $args);
                    //}
                });
            } catch (e) {
                warn(e);
            }
        })
        .catch(e => {
            warn(e);
        })
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 1,
    type: 5
};

exports.help = {
    name: `taf`,
    aliases: [],
    description: `Retrieve the most recent TAF for an airport.`,
    usage: `taf <ICAO airport code> (e.g., taf cyow)`
};
