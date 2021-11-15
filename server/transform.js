const parseString = require('xml2js').parseString;
const js2xmlparser = require("js2xmlparser");
const { Parser } = require('json2csv');

xmlToJson = (data) => {
    let json;
    parseString(data, (err, result) => {
        if(err) {
            throw new Error('Invalid XML syntax');
        };

        json = {
            sensorId: result.root.sensorId[0],
            humidity: result.root.humidity[0]
        };
    });

    return json
};


jsonToXml = (data) => {
    const obj = {
        sensorId: data.sensorId,
        humidity: data.humidity
    };
    const xml = js2xmlparser.parse("root", obj);

    return xml;
};


jsonToCsv = (data) => {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    
    return csv;
};

module.exports = { xmlToJson, jsonToXml, jsonToCsv };