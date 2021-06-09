const api = require('./api');
const random = require('./random');
const banner = require('./banner');
const chalk = require('chalk');
const Confirm = require('prompt-confirm');
const myArgs = process.argv.slice(2);
let datetime = myArgs[0];


console.log(chalk.cyan(banner.print_banner()));

const prompt = new Confirm('Do you confirm operation with param: ' + datetime + ' ?');

  prompt.run()
  .then(function(answer) {
    if(answer){
        execute();
    }
    else{
        return;
    }
  });

  function execute(){
    if(datetime=="today"){
        allDay(new Date());
    }
    else if(datetime=="yesterday"){
        yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1)
        allDay(yesterday);
    }
    else{
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
        api.send(datetime,true);
    }
    
    function allDay(startDate){
        startDate.setHours(9,random.interval(0,5),random.secounds(),0);
    
        pauseDate = new Date(startDate);
        pauseDate.setMinutes(random.interval(0,5))
        pauseDate.setSeconds(random.secounds())
        pauseDate.setHours(startDate.getHours()+3)
    
        returnDate = new Date(pauseDate);
        returnDate.setMinutes(returnDate.getMinutes() + random.interval(0,2))
        returnDate.setSeconds(random.secounds())
        returnDate.setHours(pauseDate.getHours()+1)
    
        endDate = new Date(startDate);
        endDate.setMinutes(random.interval(2,5))
        endDate.setSeconds(random.secounds())
        endDate.setHours(startDate.getHours()+9)
    
        workedTimeInMinutes = Math.round((((endDate - returnDate) + (pauseDate - startDate))/1000)/60);
        const expectedWorkedTimeInMinutes = 480;
    
        if(workedTimeInMinutes<expectedWorkedTimeInMinutes){
            let missigingWorkedTimeInMinutes = (expectedWorkedTimeInMinutes - workedTimeInMinutes);
            endDate.setMinutes(endDate.getMinutes()+missigingWorkedTimeInMinutes)
            workedTimeInMinutes = Math.round((((endDate - returnDate) + (pauseDate - startDate))/1000)/60);
        }
    
        console.info(chalk.bgYellow.black("Total worked time: " + workedTimeInMinutes + " minutes"))
        
    
        api.send(startDate,true);
        api.send(pauseDate,true);
        api.send(returnDate,true);
        api.send(endDate,true);
    }
  }



