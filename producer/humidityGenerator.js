
generateHumidity = () => {
    const sensor = Math.round(Math.random() * 10);
    const humidity = (Math.random() * 100).toFixed(2);

    const data = {
        "sensorId": sensor,
        "humidity": `${humidity}%`
    };

    return data;
}

module.exports = { generateHumidity };