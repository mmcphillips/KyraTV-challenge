DROP DATABASE IF EXISTS ytuploads;

create Database ytuploads WITH ENCODING 'UTF8';

\c ytuploads;

DROP TABLE IF EXISTS uploads;

CREATE TABLE uploads(
  id serial Primary Key,
  channelid TEXT,
  channelname TEXT,
  vidid TEXT UNIQUE,
  title TEXT,
  published TEXT,
  tdefault TEXT,
  medium TEXT,
  high TEXT,
  tstandard TEXT,
  tmax TEXT
);
--Emojis will cripple postgres and render SELECT queries impossible without converting encoding to UTF-8
SET client_encoding = 'UTF8';
UPDATE pg_database set encoding = pg_char_to_encoding('UTF8') where datname = 'ytuploads';
