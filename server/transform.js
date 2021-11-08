const parseString = require('xml2js').parseString;

xmlToJson = (xml) => {
    let json;
    parseString(xml, (err, result) => {
        if(err) {
            throw new Error('Invalid XML syntax');
        };

        json = {
            sensorId: result.root.sensorId[0],
            humidity: result.root.humidity[0]
        };
    });

    return json
}

module.exports = { xmlToJson };