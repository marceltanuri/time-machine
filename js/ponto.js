const api = require('./api');
const myArgs = process.argv.slice(2);
let datetime = myArgs[0];
if(datetime==null){
    console.error('Date and time must be provided. Expected format: yyyy-MM-ddTHH:mm:ss');
    return;
}

let isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

if(!isDate(datetime)){
    console.error('Not a valid date. Expected format: yyyy-MM-ddTHH:mm:ss');
    return;
}

datetime = new Date(datetime).getTime();
api.ponto(datetime,true);