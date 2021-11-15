
generateTemperature = () => {
    const sensor = Math.round(Math.random() * 10);
    const temp = (Math.random() * 200).toFixed(2);

    const data = {
        "sensorId": sensor,
        "temperature": `${temp}°C`
    };

    return data;
}

module.exports = { generateTemperature };