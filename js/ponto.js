const api = require('./api');
const myArgs = process.argv.slice(2);
let datetime = myArgs[0];
if(datetime==null){
    console.error('Date and time must be provided.');
    return;
}

let isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

if(!isDate(datetime)){
    console.error('Not a valid date.');
    return;
}

datetime = new Date(datetime).getTime();
api.ponto(datetime,true);