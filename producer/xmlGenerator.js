
generateHumidityXML = () => {
    const sensor = Math.round(Math.random() * 10);
    const humidity = (Math.random() * 100).toFixed(2);

    const xml = `
        <?xml version="1.0" encoding="UTF-8""?>
        <root>
            <sensorId>${sensor}</sensorId>
            <humidity>${humidity}%</humidity>
        </root>
    `;
    
    const payload = {
        op: 'produce',
        topic: 'humidity',
        data: xml
    };

    // console.log(xml);

    return payload;
}

module.exports = { generateHumidityXML };