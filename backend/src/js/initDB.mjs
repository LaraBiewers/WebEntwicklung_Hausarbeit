import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';
import syllabificate from 'syllabificate';
import { error } from 'console';

const names_csv = 'backend/src/assets/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv';


(async function () {
  let client = null;

  try {
    client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();
    console.log("connection etablished");
  }
  catch (error) {
    console.log(`Failed to connect to MongoDB: ${error}`);
    process.exit(-1);
  }

  try {
    await fillData(client, names_csv);
  } catch (error) {
    console.log(error);
  }
})();

async function fillData(client, csv_path) {
  const db = client.db("nameDB");
  try {
    const collections = await db.listCollections().toArray();
    const namesCollectionExists = collections.some(col => col.name === "names");
    if (namesCollectionExists) {
      if (await db.collection("names").drop()){
        console.log("database cleaned")
      } else {
        throw error("Something went wrong with the cleaning of the database");
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
  const collection = db.collection("names");
  const promises = [];

  console.log("seeding");
  return new Promise((resolve, reject) => {
    fs.createReadStream(csv_path)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        let syllables = syllabificate.countSyllables(row['vorname']);
        let promise = collection.insertOne({ name: row['vorname'], geschlecht: row['geschlecht'], silben: syllables });
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
      })
      .on('error', reject);
  });
}


/*
// Lese die CSV-Datei ein

let rows = 0;

try {
  const fileContent = fs.readFileSync('backend/src/assets/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv', 'utf8');
  rows = fileContent.split('\n').map(row => row.split(';'));
} catch (error) {
  console.error(error);
}

(async function () {
  // Verbindung zur MongoDB

  let client = null;

  try {
    client = new MongoClient('mongodb://127.0.0.1:27017/');
    await client.connect();
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }

  // Befülle Datenbank

  try {
    const dbName = 'dbCollection';
    const db = client.db(dbName);

    // Wenn collection bereits vorhanden, nicht neu erstellen!

    const collectionName = 'alleNamen';
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(coll => coll.name === collectionName);

    if (collectionExists) {
      console.log(`Die Collection "${collectionName}" in der Datenbank "${dbName}" existiert bereits.`);
    } else {
      const collection = db.collection(collectionName);
      for (const [vorname, geschlecht] of rows) {
        const anzahlSilben = syllabificate.countSyllables(vorname);
        await collection.insertOne({ vorname, geschlecht, anzahlSilben });
      }
      console.log('Datenbank erfolgreich befüllt!');
    }

    // Inhalt der Collection "alleNamen" als JSON-File abspeichern.

    const collection = db.collection(collectionName);
    const collectionContent = await collection.find({}).toArray();
    const outputFilePath = 'backend/src/assets/Collection_alleNamen.json';

    try {
      fs.writeFileSync(outputFilePath, JSON.stringify(collectionContent, null, 2));
      console.log(`Der Inhalt der Collection "${collectionName}" wurde als JSON in die Datei "${outputFilePath}" geschrieben.`);
    } catch {
      console.log('Fehler beim erstellen der Collection als .JSON-File.');
    }
  } catch (err) {
    console.error('Fehler beim Befüllen der Datenbank:', err);
  } finally {
    await client.close();
  }
})();
*/