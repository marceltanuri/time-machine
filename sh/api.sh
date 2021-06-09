#!/bin/bash
set -e

function ponto(){
    datetime=$1
    offline=$2
    info "Registering presence: account=$user, datetime=$datetime"

declare -a arr=("h""t""t""p""s"":""/""/""w""w""w"".""a""h""g""o""r""a"".""c""o""m"".""b""r""/""b""a""t""i""d""a""o""n""l""i""n""e""/""v""e""r""i""f""y""I""d""e""n""t""i""f""i""c""a""t""i""o""n")
url=""

## now loop through the above array
for i in "${arr[@]}"
do
   url=$url$i
done

echo "$url"

    curl -w "Type: %{content_type}\nCode: %{response_code}\n" --location --request POST $url \
    --header 'Content-Type: application/json' \
    --header 'Cookie: company='$companyId \
    --data-raw '  {
                "identity" 	         : "'$machinecode'",
                "account"            : '$user',
                "password" 	         : "'$pass'",
                "logon" 	         : false,
                "longitude"          : '$longitude',
                "latitude" 	         : '$latitude',
                "accuracy"	         : 100,
                "timestamp_loc"      : '$datetime',
                "provider"           : "network/wifi",
                "offline"   	     : '$offline',
                "timestamp" 	     : '$datetime',
                "origin"		     : "chr",
                "version"		     : "1.0.25",
                "identification_type": "matricula_senha"
    }'
}