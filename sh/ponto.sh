#!/bin/bash
set -e

BASEDIR=$(dirname "$0")
source ${BASEDIR}/api.sh
source ${BASEDIR}/credentials.sh
source ${BASEDIR}/log_util.sh
source ${BASEDIR}/banner.sh

print_banner

format(){
    datetime=$(gdate -d $1 +%s%N)
    datetime=$((datetime/1000000))
    echo "$datetime"
}

on(){
    datetime=$(gdate +%s%N)
    datetime=$((datetime/1000000))
    echo "Online registration: $datetime"
    ponto $datetime false
}

off(){
    datetime=$(format $1)
    echo "Offline registration: $datetime"
    ponto $datetime true
}

random_min(){
    min=$(shuf -i 0-5 -n 1)
    min=$(printf "%02d" "$min")
    echo "$min"
}

random_sec(){
    sec=$(shuf -i 0-30 -n 1)
    sec=$(printf "%02d" "$sec")
    echo "$sec"
}


day(){
    day="$1"
    
    start="${day}T09:$(random_min):$(random_sec)"

    pause=$(gdate -d "$start $(shuf -i 0-5 -n 1)min" +"%Y-%m-%dT%H:%M:%S")
    pause=$(gdate -d "$pause 3hours" +"%Y-%m-%dT%H:%M:%S")
    pause=$(gdate -d "$pause $(shuf -i 0-5 -n 1)seconds" +"%Y-%m-%dT%H:%M:%S")

    return=$(gdate -d "$pause $(shuf -i 0-2 -n 1)min" +"%Y-%m-%dT%H:%M:%S")
    return=$(gdate -d "$return 1hours" +"%Y-%m-%dT%H:%M:%S")
    return=$(gdate -d "$return $(shuf -i 0-30 -n 1)seconds" +"%Y-%m-%dT%H:%M:%S")

    end=$(gdate -d "$start $(shuf -i 2-5 -n 1)min" +"%Y-%m-%dT%H:%M:%S")
    end=$(gdate -d "$end 9hours" +"%Y-%m-%dT%H:%M:%S")
    end=$(gdate -d "$end $(shuf -i 0-30 -n 1)seconds" +"%Y-%m-%dT%H:%M:%S")

    MPHR=60    # Minutes per hour.

    CURRENT=$(gdate +%s -d ${start})
    TARGET=$(gdate +%s -d ${pause})
    firstPeriod=$(( ($TARGET - $CURRENT) / $MPHR ))
    CURRENT=$(gdate +%s -d ${return})
    TARGET=$(gdate +%s -d ${end})
    secondPeriodo=$(( ($TARGET - $CURRENT) / $MPHR ))

    info "Logging time for....: $(gdate +%d/%m/%y -d ${start})"
    info "Random start time...: $(gdate +%H:%M:%S -d ${start})"
    info "Random pause time...: $(gdate +%H:%M:%S -d ${pause})"
    info "Random return time..: $(gdate +%H:%M:%S -d ${return})"
    info "Random end time.....: $(gdate +%H:%M:%S -d ${end})"
    success "Total worked time...: $(expr $firstPeriod + $secondPeriodo) (min)"

    ponto $(format $start) true
    ponto $(format $pause) true
    ponto $(format $return) true
    ponto $(format $end) true
}

today(){
    today=$(gdate +%F)
    day "$today"
}

yesterday(){
    yesterday=$(gdate +%F -d "yesterday")
    day "$yesterday"
}

someday(){
    day "$1"
}

command="$1"
params="$2"

read -p "Are you sure you want execute ' $command $params' command ? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[YyaA]$ ]]
then
    $command $params
fi

exit 0