import { MongoClient } from "mongodb";
import { AcncClassificationSummary } from "../models/acnc-classification-summary";
import { AcncCharityRecord } from "../models/acnc-charity-record";

//const uri = "mongodb+srv://<user>:<password>@127.0.0.1?retryWrites=true&writeConcern=majority";
// TODO: consider adding username/password to the mongo server -- https://hub.docker.com/_/mongo
const uri = "mongodb://dbadmin:3ra24N4p7Ubd6H98hKaX@127.0.0.1?retryWrites=true&writeConcern=majority";

export async function UpsertClassifications(classifications: AcncClassificationSummary[]) {
  const client = new MongoClient(uri);
  console.log(`UpsertClassifications: inserting ${classifications.length} classifications`);
  try {
    await client.connect();
    const database = client.db("churchDB");
    const collection = database.collection<AcncClassificationSummary>("acncClassifications");
    collection.createIndex({ classie_id: 1 }, { unique: true });
    const result = await collection.insertMany(classifications, { ordered: false });
    console.log(`UpsertClassifications: inserted ${result.insertedCount} classifications`);
  } catch (err) {
    console.error(`UpsertClassifications: Error - inserting classifications`, err);
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function CreateIndexes() {
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db("churchDB");
  // add acncClassifications unique index
  const collection = database.collection<AcncClassificationSummary>("acncClassifications");
  collection.createIndex({ classie_id: 1 }, { unique: true });
  // add acncCharityRecords unique index
  const acncCharityRecordsCollection = database.collection<AcncCharityRecord>("acncCharityRecords");
  acncCharityRecordsCollection.createIndex({ uuid: 1 }, { unique: true });
}

export async function UpsertCharities(charities: AcncCharityRecord[]) {
  const client = new MongoClient(uri);
  console.log(`UpsertCharities: inserting ${charities.length} charities`);
  try {
    await client.connect();
    const database = client.db("churchDB");
    const collection = database.collection<AcncCharityRecord>("acncCharityRecords");
    const result = await collection.insertMany(charities, { ordered: false });
    console.log(`UpsertCharities: inserted ${result.insertedCount} charities`);
  } catch (err) {
    console.error(`UpsertCharities: Error - inserting charities`, err);
    console.error(err);
  } finally {
    await client.close();
  }
}
