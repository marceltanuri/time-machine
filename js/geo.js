const fetch = require('node-fetch');

const getCoordinates = async () => {
    try {
        let url = "http://ipwhois.app/json/8.8.4.4";
        const response = await fetch(url).then(res => res.json())
        return response;
    }
    catch (error) {
		if (error.name === 'AbortError') {
			console.log('request was aborted');
		}
	}
}

module.exports.getCoordinates = getCoordinates;