#!/bin/bash
# Direwolf Postgres Bulk Importer

export PGHOST=localhost
export PGDATABASE=direwolf
export PGUSER=testuser
#PGPASSWORD=

if [ -z "$1" ]
  then
    echo "supply direwolf log file path.
    exit 1"
fi

cat -v $1 | sort | uniq -u | iconv -f utf-8 -t utf-8 -c | dos2unix -f | sed 's/\r$//g' | grep -v "IGATE,DISABLED" | grep -v "W0TLM Rocks" | grep -v "Test" | grep -v "{19"| psql -c "COPY logs2 (chan,utime,isotime,source,heard,level,error,dti,name,symbol,latitude,longitude,speed,course,altitude,frequency,coffset,tone,system,status,telemetry,comment) FROM STDIN DELIMITER ',' CSV HEADER;"
