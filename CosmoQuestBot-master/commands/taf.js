const { debug } = require('console');
const { warn, log } = require('../public/async-logs');

const xml2js = require('xml2js');

exports.run = function taf (_, msg, args) {

    if (args.length < 1) throw  "No station specified";

    args = args.join(' ');

    /* NOAA ADDS: https://aviationweather.gov/dataserver
        METAR: https://aviationweather.gov/dataserver/example?datatype=taf

        // dataSource: tafs
        // stationString=CYOW
        // hoursBeforeNow=3
        // &most_recent=true

    Example: https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=CYOW&mostRecent=true&hoursBeforeNow=3

    Returns:
    =======

<?xml version="1.0" encoding="UTF-8"?>
<response xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          version="1.2" xsi:noNamespaceSchemaLocation="http://www.aviationweather.gov/static/adds/schema/taf1_2.xsd">
    <request_index>497501127</request_index>
    <data_source name="tafs"/>
    <request type="retrieve"/>
    <errors/>
    <warnings/>
    <time_taken_ms>19</time_taken_ms>
    <data num_results="1">
        <TAF>
            <raw_text>TAF CYOW 261440Z 2615/2712 04008KT P6SM FEW006 SCT015 OVC040 TEMPO 2615/2616 5SM -SHRA BR BKN008
                OVC015 FM261600 06005KT P6SM BKN015 OVC060 TEMPO 2616/2618 BKN008 OVC015 BECMG 2616/2618 34005KT
                FM262200 36005KT P6SM -SHRA BKN015 OVC060 FM270300 01005KT P6SM FEW007 OVC015 PROB30 2703/2712 2SM -DZ
                BR OVC005 RMK NXT FCST BY 261800Z
            </raw_text>
            <station_id>CYOW</station_id>
            <issue_time>2022-08-26T14:40:00Z</issue_time>
            <bulletin_time>2022-08-26T14:00:00Z</bulletin_time>
            <valid_time_from>2022-08-26T15:00:00Z</valid_time_from>
            <valid_time_to>2022-08-27T12:00:00Z</valid_time_to>
            <remarks>RMK NXT FCST BY 261800Z</remarks>
            <latitude>45.32</latitude>
            <longitude>-75.67</longitude>
            <elevation_m>111.0</elevation_m>
            <forecast>
                <fcst_time_from>2022-08-26T15:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-26T16:00:00Z</fcst_time_to>
                <wind_dir_degrees>40</wind_dir_degrees>
                <wind_speed_kt>8</wind_speed_kt>
                <visibility_statute_mi>6.21</visibility_statute_mi>
                <sky_condition sky_cover="FEW" cloud_base_ft_agl="600"/>
                <sky_condition sky_cover="SCT" cloud_base_ft_agl="1500"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="4000"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-26T15:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-26T16:00:00Z</fcst_time_to>
                <change_indicator>TEMPO</change_indicator>
                <visibility_statute_mi>5.0</visibility_statute_mi>
                <wx_string>-SHRA BR</wx_string>
                <sky_condition sky_cover="BKN" cloud_base_ft_agl="800"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="1500"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-26T16:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-26T18:00:00Z</fcst_time_to>
                <change_indicator>TEMPO</change_indicator>
                <sky_condition sky_cover="BKN" cloud_base_ft_agl="800"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="1500"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-26T16:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-26T22:00:00Z</fcst_time_to>
                <change_indicator>BECMG</change_indicator>
                <time_becoming>2022-08-26T18:00:00Z</time_becoming>
                <wind_dir_degrees>340</wind_dir_degrees>
                <wind_speed_kt>5</wind_speed_kt>
                <visibility_statute_mi>6.21</visibility_statute_mi>
                <sky_condition sky_cover="BKN" cloud_base_ft_agl="1500"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="6000"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-26T16:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-27T12:00:00Z</fcst_time_to>
                <change_indicator>FM</change_indicator>
                <wind_dir_degrees>60</wind_dir_degrees>
                <wind_speed_kt>5</wind_speed_kt>
                <visibility_statute_mi>6.21</visibility_statute_mi>
                <sky_condition sky_cover="BKN" cloud_base_ft_agl="1500"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="6000"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-26T22:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-27T03:00:00Z</fcst_time_to>
                <change_indicator>FM</change_indicator>
                <wind_dir_degrees>360</wind_dir_degrees>
                <wind_speed_kt>5</wind_speed_kt>
                <visibility_statute_mi>6.21</visibility_statute_mi>
                <wx_string>-SHRA</wx_string>
                <sky_condition sky_cover="BKN" cloud_base_ft_agl="1500"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="6000"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-27T03:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-27T12:00:00Z</fcst_time_to>
                <change_indicator>FM</change_indicator>
                <wind_dir_degrees>10</wind_dir_degrees>
                <wind_speed_kt>5</wind_speed_kt>
                <visibility_statute_mi>6.21</visibility_statute_mi>
                <sky_condition sky_cover="FEW" cloud_base_ft_agl="700"/>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="1500"/>
            </forecast>
            <forecast>
                <fcst_time_from>2022-08-27T03:00:00Z</fcst_time_from>
                <fcst_time_to>2022-08-27T12:00:00Z</fcst_time_to>
                <change_indicator>PROB</change_indicator>
                <probability>30</probability>
                <visibility_statute_mi>2.0</visibility_statute_mi>
                <wx_string>-DZ BR</wx_string>
                <sky_condition sky_cover="OVC" cloud_base_ft_agl="500"/>
            </forecast>
        </TAF>
    </data>
</response>

    */

    // Parse the parameters
    // Build the URL

    var requestString = 'https://aviationweather.gov/adds/dataserver_current/httpparam?';
    requestString = requestString + 'dataSource=tafs';
    requestString = requestString + '&requestType=retrieve&format=xml';
    requestString = requestString + '&stationString=' + `${args}`;
    requestString = requestString + '&mostRecent=true&hoursBeforeNow=3';

    msg.channel.send("requestString: "+requestString);

    // Retrieve the data

//    var request = new XMLHttpRequest();

    const request = require('request');

    request(requestString, function(err, res, body) {

        //msg.channel.send("body: " + body);

        // convert XML to JSON
        xml2js.parseString(body, (err, result) => { //
            if(err) {
                return debug(err);
            }

            if (typeof result.response !== "object" || !Array.isArray(result.response.data) || result.response.data.length < 1 || !Array.isArray(result.response.data[0].METAR)) return;

            // `result` is a JavaScript object
            // convert it to a JSON string
            const json = JSON.stringify(result, null, 4);
            const taf = result.response.data[0].TAF[0]; // JSON Object; Try metar.raw_text

            debug(json);

            //msg.channel.send("Result: "  + json);
            msg.channel.send(join(taf.raw_text,' '));

        });
    });

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
    usage: `taf <ICAO airport code> (e.g., metar cyow)`
};
