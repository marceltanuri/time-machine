const http = require('http');

let url = "http://ipwhois.app/json/8.8.4.4";

http.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            console.log("latitude: "+json.latitude);
            console.log("longitude: "+json.longitude);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});