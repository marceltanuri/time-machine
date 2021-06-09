const credentials = require('./credentials')
const axios = require('axios')
const geo = require('./geo')
const chalk = require('chalk');

function send(datetime, offline){
  console.log("Starting API calling...")
  console.log(chalk.blue("Time to be entered: " + new Date(datetime)))
    let cords = {latitude:"", longitude:""}
    geo.getCoordinates().then(x=>{
      if(x!=null){
        cords.latitude = x.latitude; cords.longitude = x.longitude; 
        callAPI(datetime, offline, cords)
      }else{
        console.error("Unable to get geolocation. Try again soon")
      }
    })
}


function callAPI(datetime, offline, cords){
  let urlArray=['h','t','t','p','s',':','/','/','w','w','w','.','a','h','g','o','r','a','.','c','o','m','.','b','r','/','b','a','t','i','d','a','o','n','l','i','n','e','/','v','e','r','i','f','y','I','d','e','n','t','i','f','i','c','a','t','i','o','n'];
  let url = urlArray.join("")
  
  axios
    .post(url, {
      identity 	         : credentials.config.machinecode,
      account            : credentials.config.user,
      password 	         : credentials.config.pass,
      logon 	         : false,
      longitude          : cords.longitude,
      latitude 	         : cords.latitude,
      accuracy	         : 100,
      timestamp_loc      : datetime,
      provider           : "network/wifi",
      offline   	     : offline,
      timestamp 	     : datetime,
      origin		     : "chr",
      version		     : "1.0.25",
      identification_type: "matricula_senha"
  },
  {headers: {'Cookie': 'company='+credentials.companyId}})
  .then(function (response) {
    if(response.data.result==true){
      console.log(chalk.bgGreen.black("Marcação de ponto realizada com sucesso! Horário da batida: " + new Date(datetime)));
    }else{
      console.log(chalk.bgRed.black("Marcação de ponto não pode ser concluída :("));
    }
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports.send = send;