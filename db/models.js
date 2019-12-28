// methods for manipulating database entries
require('dotenv').config();
// pg-promise offers performant way to multi line insert for large queries using transactions.
const pgp = require('pg-promise')({ capSQL: true });

// psql configuration object
const db = pgp({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// column set names for uploading bulk entries with pg-promise
const csUploads = new pgp.helpers.ColumnSet([
  'channelid',
  'channelname',
  'vidid',
  'title',
  'published',
  'tdefault',
  'medium',
  'high',
  'tstandard',
  'tmax',
], { table: 'uploads' });

// create single upload objects with pertinent information to update into db.
const createUploadObject = function (item) {
  return {
    channelid: item.channelid,
    channelname: item.channelname,
    vidid: item.vidid,
    title: item.title,
    published: item.published,
    tdefault: item.tdefault,
    medium: item.medium,
    high: item.high,
    tstandard: item.tstandard,
    tmax: item.tmax,
  };
};

module.exports = {
  // return existing records from database based on channel id
  get(params) {
    return db.many({
      text: 'SELECT * FROM uploads WHERE channelname = $1',
      values: params,
    });
  },
  // add new records to the database in bulk insertion queries
  async update(videoList) {
    const uploadsObjects = videoList.map((video) => createUploadObject(video));
    // in instance where there are conflicts, do not insert.
    const query = `${pgp.helpers.insert(uploadsObjects, csUploads)}ON CONFLICT (vidid) DO NOTHING`;
    await db.none(query);
  },
};
