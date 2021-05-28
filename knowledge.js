const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

const { BOT_DB_VERSION = '1', MONGODB_NAME, MONGODB_URL } = process.env;

const client = MongoClient(MONGODB_URL);


let connectPromise = new Promise((resolve, reject) => {
    client.connect(error => {
        if(error) reject(error);
        else resolve(client.db(MONGODB_NAME));
    });
});

async function getKnowledge() {
    const db = await connectPromise;
    const knowledge = await db.collection('knowledge').findOne({ version: BOT_DB_VERSION });
    return knowledge || {};
}

module.exports.getKnowledge = getKnowledge;

async function saveKnowledge(knowledge) {
    const db = await connectPromise;
    await db.collection('knowledge').update({ version: BOT_DB_VERSION }, knowledge, {
        upsert: true
    });
    return knowledge;
}

module.exports.saveKnowledge = saveKnowledge;

async function log(entry) {
    const db = await connectPromise;
    await db.collection('logs').insertOne({
        date: moment().format(),
        version: BOT_DB_VERSION,
        ...entry,
    });
}

module.exports.log = log;