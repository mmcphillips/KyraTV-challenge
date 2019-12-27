require('dotenv').config();
const pgp = require('pg-promise')({ capSQL: true });

const db = pgp({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

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

const createUploadObject = function (item) {
  // create single upload objects with pertinent information to update into db.
  // pg-promise offers performant way to multi line insert.
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
    // const selectQuery = `SELECT * FROM uploads where channelname = ?`;
    // db.one(selectQuery, params)
    return db.many({
      text: 'SELECT * FROM uploads WHERE channelname = $1',
      values: params,
    });
  },
  // add new records to the database
  async update(videoList) {
    const uploadsObjects = videoList.map((video) => createUploadObject(video));
    // in instance where there are conflicts, do not insert.
    const query = `${pgp.helpers.insert(uploadsObjects, csUploads)}ON CONFLICT (vidid) DO NOTHING`;
    await db.none(query);
  },
};
