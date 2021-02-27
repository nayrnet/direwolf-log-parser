#!/usr/bin/node
/*

 Direwolf Postgres Logger

 author: Ryan Hunt <admin@nayr.net>

 description: This simple daemon tails the direwolf csv log file and dumps it into Postgres

 environment: postgres environment variables required

*/

const { Pool, Client } = require('pg');
const fs = require('fs');
const fst = require('fs-tail-stream');
const csv = require('csv-parser')

// Direwolf Log Config
const log = "/var/log/direwolf/direwolf.log"
const query = "INSERT INTO logs (chan,utime,isotime,source,heard,level,error,dti,name,symbol,latitude,longitude,speed,course,altitude,frequency,coffset,tone,system,status,telemetry,comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)"
const headers = ["chan", "utime", "isotime", "source", "heard", "level", "error", "dti", "name", "symbol", "latitude", "longitude", "speed", "course", "altitude", "frequency", "coffset", "tone", "system", "status", "telemetry", "comment"]

const pool = new Pool()

pool.connect().then(client => {
  let done = () => {
    client.release();
  }
  fst.createReadStream(log, {
      encoding: 'ascii',
      tail: true,
    })
    .pipe(csv(headers))
    .on('data', (data) => {
      client.query(query, [data.chan, data.utime, data.isotime, data.source, data.heard, data.level, data.error, data.dti, data.name, data.symbol, Number(data.latitude), Number(data.longitude), Number(data.speed), Number(data.course), Number(data.altitude), Number(data.frequency), Number(data.offset), Number(data.tone), data.system, data.status, data.telemetry, data.comment], (err, res) => {
        if (err) {
	  if (err['routine'] == '_bt_check_unique') { process.stdout.write("*") }
	  else if (err['routine'] == 'PreventCommandIfReadOnly') {
		console.log('[SQL ERROR]: Database Read Only!') // TODO Recover from this gracefully.
		done();
	  } else { console.log('[SQL ERROR]: ', err) }
        } else {
          process.stdout.write("^");
        }
      })
    })
    .on('end', () => {});

  let onError = strErr => {
    console.error('[ERROR]: ', strErr);
    done();
  };
});

