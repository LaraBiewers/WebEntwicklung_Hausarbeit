import fs from 'fs';
import { MongoClient } from 'mongodb';
import syllabificate from 'syllabificate';

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
    client = new MongoClient('mongodb://localhost:27017');
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
