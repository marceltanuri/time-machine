function interval(from, to){
    to=to+1;
    return Math.floor(Math.random() * to)+from;
 }

function secounds(){
    return Math.floor(Math.random() * 60);
}


module.exports.secounds = secounds;
module.exports.interval = interval;