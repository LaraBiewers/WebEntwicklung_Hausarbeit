import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';
import syllabificate from 'syllabificate';
import { error } from 'console';

const namesCsv = 'backend/src/assets/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv';

(async function () {
  let client = null;

  try {
    client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();
    console.log('connection etablished');
  } catch (error) {
    console.log(`Failed to connect to MongoDB: ${error}`);
    process.exit(-1);
  }

  try {
    await fillData(client, namesCsv);
  } catch (error) {
    console.log(error);
  }
})();

async function fillData (client, csvPath) {
  const db = client.db('nameDB');
  // Clean Database
  try {
    const collections = await db.listCollections().toArray();
    // Clean names Collection
    const namesCollectionExists = collections.some(col => col.name === 'names');
    if (namesCollectionExists) {
      if (await db.collection('names').drop()) {
        console.log('Collection names cleaned');
      } else {
        throw error('Something went wrong with the cleaning of the names-Collection');
      }
    }
    // Clean watchlist Collection
    const watchlistCollectionExists = collections.some(col => col.name === 'watchlist');
    if (watchlistCollectionExists) {
      if (await db.collection('watchlist').drop()) {
        console.log('Collection watchlist cleaned');
      } else {
        throw error('Something went wrong with the cleaning of the watchlist-Collection');
      }
    }
  } catch (error) {
    console.log(error);
    client.close();
    process.exit(-1);
  }
  const collection = db.collection('names');
  const promises = [];

  console.log('seeding');
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        const syllables = syllabificate.countSyllables(row.vorname);
        const promise = collection.insertOne({ name: row.vorname, geschlecht: row.geschlecht, silben: syllables });
        promises.push(promise);
      })
      .on('end', async () => {
        try {
          await Promise.all(promises);
          resolve();
        } catch (error) {
          reject(error);
        }
        client.close();
        console.log('database initialized');
      })
      .on('error', reject);
  });
}
