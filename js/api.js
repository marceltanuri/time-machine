const credentials = require('./credentials')
const axios = require('axios')
const geo = require('./geo')

function send(datetime, offline){
    let cords = {latitude:"", longitude:""}
    geo.getCoordinates().then(x=>{cords.latitude = x.latitude; cords.longitude = x.longitude; callAPI(datetime, offline, cords)});   
}


function callAPI(datetime, offline, cords){
  let urlArray=['h','t','t','p','s',':','/','/','w','w','w','.','a','h','g','o','r','a','.','c','o','m','.','b','r','/','b','a','t','i','d','a','o','n','l','i','n','e','/','v','e','r','i','f','y','I','d','e','n','t','i','f','i','c','a','t','i','o','n'];
  let url = "";
  urlArray.forEach(element => {
    url = url + element;
  });
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
      console.log("Marcação de ponto realizada com sucesso! Horário da batida: " + new Date(datetime));
    }else{
      console.log("Marcação de ponto realizada não pode ser concluída :( Horário que seria a batida: " + new Date(datetime));
    }
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports.ponto = send;


