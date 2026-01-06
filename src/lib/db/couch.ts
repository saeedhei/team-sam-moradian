import nano from 'nano';

const COUCHDB_URL = process.env.COUCHDB_URL;
const DB_NAME = process.env.COUCHDB_DB;

// Saeed's requested safety checks
if (!COUCHDB_URL) {
  throw new Error('COUCHDB_URL is not defined');
}

if (!DB_NAME) {
  throw new Error('COUCHDB_DB is not defined');
}

const couch = nano(COUCHDB_URL);

// We define this helper once
const initDb = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await couch.db.create(DB_NAME);
      console.log(`✅ Database ${DB_NAME} created/verified.`);
    } catch (e: any) {
      if (e.statusCode !== 412) console.error('CouchDB Init Error:', e);
    }
  }
};

// Run the init once when the server starts
initDb();

export const getDb = () => {
  // Saeed's requested synchronous return
  return couch.use(DB_NAME);
};
