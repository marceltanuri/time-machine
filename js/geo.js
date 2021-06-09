const fetch = require('node-fetch');

const getCoordinates = async () => {
    let url = "http://ipwhois.app/json/8.8.4.4";
    const response = await fetch(url).then(res => res.json())
    return response;
}

module.exports.getCoordinates = getCoordinates;