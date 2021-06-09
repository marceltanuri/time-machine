# time-machine

Here is automation tool for consuming Company entering time API. It was created to help employees to register their forgoten datetime.

You have two ways to user this tools - with NodeJS or with Bash:

## With NodeJS
1. Clone de repository
2. Install NodeJS if you haven't already.
3. Go to `js` directory in this project and...
4. Run `npm install`
5. Config your credentials in `credentials.js` file. *Read the instructions sections below "Before you start*"
6. All set! To enter time using API run the following...
7. `node ponto.js yyyy-MM-ddTHH:mm:ss`. 
   
   For example, if you want to register your time for Jun, 8th at 6pm: `node ponto.js 2021-06-08T18:00:00`

---------------

## With Bash
1. Clone de repository
2. Go to `sh` directory in this project and...
3. Setup your credentials in the credentials.sh file
4. Execute the program with one of the following sintax: 
   * `sh ./ponto.sh on` To register your presence with current datetime: 
   * `sh ./ponto.sh off 2021-30-04T09:00:00` To register your presence in some past date, i.e: April 30, at 09:00AM (your local time)
Notes: 
* Only tested on MacOs for now
* run `brew install coreutils` to install gdate command required in the program
* Some credentials data like machinecode and companyID are hidden in the chrome extension app. Element inspection will be needed to get them.

----------------------------------------------------------------

### Before you start!!
### Configurando o seu arquivo de configuração

Como obter seu machinecode:
1. Clique na estensao do agora como se fosse marcar seu ponto.
2. Inpecione qualquer elemento da extensão, por exemplo o botão Bater Ponto
3. Será aberto o mode desenvolvedor, clique na aba Console
4. Execute o comando: `chrome.storage.local.get('machinecode', function(result){console.log(result)});`
5. Pronto! Cole se machinecode no arquivo de configurações `sh/credentials.sh` ou `js/credentials.js`

Como obter o seu companyId:
1. Esse dado é enviado pelo RH no email de ativação

Como obter sua geolocalização (somente se estiver no modo bash).
1. Se tiver NodeJS em sua máquina pode simplesmente executar `node sh/geo.js` aplique os valores de lat e lon no arquivo de configurações.
2. Caso nao queria exeutar via node então acesse algum site de geolocation e obtenha os valores, por exemplo http://ipwhois.app/json/8.8.4.4

## Pronto! seu arquivo de configuração está configurado, o time-machine está pronto para ser executado =D