# Direwolf CSV to Postgres Logging

Work in progress, I'm still proving this in my environment before cleanup.. more details later.

## Environment Required
 * PGHOST
 * PGUSER
 * PGDATABASE
 * PGPASSWORD

## Install
```
git clone https://github.com/nayrnet/direwolf-log-parser.git
apt install npm
npm install pg
npm install fs-tail-stream
npm install csv-parser
export PGHOST=localhost
export PGUSER=testuser
export PGDATABASE=direwolf
export PGPASSWORD=[REDACTED]
./dw-log-parser.js
```
