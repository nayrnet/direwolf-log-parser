CREATE TABLE logs (
  id SERIAL,
  chan VARCHAR(15),
  utime INTEGER,
  isotime DATE,
  source VARCHAR(15),
  heard VARCHAR(15),
  level VARCHAR(15),
  error VARCHAR(15),
  dti VARCHAR(10),
  name VARCHAR(15),
  symbol VARCHAR(10),
  latitude NUMERIC,
  longitude NUMERIC,
  speed NUMERIC,
  course NUMERIC,
  altitude NUMERIC,
  frequency NUMERIC,
  coffset NUMERIC,
  tone VARCHAR(50),
  system VARCHAR(120),
  status VARCHAR(50),
  telemetry TEXT,
  comment TEXT,
  PRIMARY KEY (id),
  UNIQUE (utime, name, heard, level, dti, speed, course, comment, telemetry)
);
CREATE INDEX on logs (utime,name,heard);
