import { MongoClient, UpdateResult } from "mongodb";
import { AcncClassification } from "../models/acnc-classification";
import { AcncCharityData, AcncCharityRecord } from "../models/acnc-charity-record";
import { AcncCharity } from "../models/acnc-charity";
import { AcncCharitySummary, AcncCharitySummaryData } from "../models/acnc-charity-summary";

const dbName = "churchDB2";
const collectionNameCharityRecords = "acncCharityRecords";
const collectionNameCharityData = "acncCharityData";
const collectionNameCharitySummaries = "acncCharitySummaries";
const collectionNameClassifications = "acncClassifications";

//const uri = "mongodb+srv://<user>:<password>@127.0.0.1?retryWrites=true&writeConcern=majority";
// TODO: consider adding username/password to the mongo server -- https://hub.docker.com/_/mongo
//const uri = "mongodb://dbadmin:3ra24N4p7Ubd6H98hKaX@127.0.0.1?retryWrites=true&writeConcern=majority";
const uri = "mongodb://dbadmin:3ra24N4p7Ubd6H98hKaX@10.25.3.189:27017?retryWrites=true&writeConcern=majority";

export async function UpsertClassifications(classifications: AcncClassification[]) {
  const client = new MongoClient(uri);
  console.log(`UpsertClassifications: inserting ${classifications.length} classifications`);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncClassification>(collectionNameClassifications);
    collection.createIndex({ classie_id: 1 }, { unique: true });
    let updated = 0;
    let inserted = 0;
    for (let i = 0; i < classifications.length; i++) {
      const classification = classifications[i];
      const result = await collection.updateOne({ classie_id: classification.classie_id }, { $set: classification }, { upsert: true });
      if (result.upsertedCount > 0) {
        inserted++;
      } else if (result.modifiedCount > 0) {
        updated++;
      }
    }
    //const result = await collection.insertMany(classifications, { ordered: false });
    console.log(`UpsertClassifications: inserted ${inserted}, updated ${updated} classifications`);
    const result = await collection.updateMany({ scrapeMe: { $exists: false } }, { $set: { scrapeMe: false } });
    console.log(`UpsertClassifications: updated ${result.modifiedCount} classifications inserted and set to NOT scrape data`);
  } catch (err) {
    console.error(`UpsertClassifications: Error - inserting classifications`, err);
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function GetClassifications(): Promise<AcncClassification[]> {
  const client = new MongoClient(uri);
  console.log(`GetClassifications: getting classifications`);
  var classifications: AcncClassification[] = [];

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncClassification>(collectionNameClassifications);
    const cursor = collection.find({ scrapeMe: true });
    classifications = await cursor.toArray();
    console.log(`GetClassifications: received ${classifications.length} classifications`);
  } catch (err) {
    console.error(`GetClassifications: Error - getting classifications`, err);
    console.error(err);
  } finally {
    await client.close();
  }
  return classifications;
}

// TODO: fix indexes
export async function CreateIndexes() {
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db(dbName);
  // add acncClassifications unique index
  const collection = database.collection<AcncClassification>(collectionNameClassifications);
  collection.createIndex({ classie_id: 1 }, { unique: true });
  // add acncCharityRecords unique index
  const acncCharitySummaryCollection = database.collection<AcncCharitySummaryData>(collectionNameCharitySummaries);
  acncCharitySummaryCollection.createIndex({ CharityUuid: 1 }, { unique: true });
  // add acncCharityRecords unique index
  const acncCharityRecordsCollection = database.collection<AcncCharityRecord>(collectionNameCharityRecords);
  acncCharityRecordsCollection.createIndex({ uuid: 1 }, { unique: true });
  // add acncCharityData unique index
  const acncCharityDataCollection = database.collection<AcncCharityData>(collectionNameCharityData);
  acncCharityDataCollection.createIndex({ uuid: 1 }, { unique: true });
}

export async function UpsertCharitySummaries(charities: AcncCharitySummaryData[]) {
  const client = new MongoClient(uri);
  console.log(`UpsertCharitySummaries: inserting ${charities.length} charities`);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncCharitySummaryData>(collectionNameCharitySummaries);
    collection.createIndex({ CharityUuid: 1 }, { unique: true });

    //const result = await collection.insertMany(charities, { ordered: false });
    let updated = 0;
    let inserted = 0;
    //let result : UpdateResult<AcncCharityRecord>;
    for (let i = 0; i < charities.length; i++) {
      // insert to mongo
      const charity = charities[i];
      const result = await collection.updateOne({ CharityUuid: charity.CharityUuid }, { $set: charity }, { upsert: true });
      if (result.upsertedCount > 0) {
        updated++;
        console.log(`UpsertCharitySummaries: inserted ${charity.CharityUuid} - ${charity.CharityName}`);
      } else if (result.modifiedCount > 0) {
        inserted++;
        console.log(`UpsertCharitySummaries: updated ${charity.CharityUuid} - ${charity.CharityName}`);
      }
    }

    console.log(`UpsertCharitySummaries: inserted ${inserted} and updated ${updated} charities`);
    const result = await collection.updateMany({ dateScraped: { $exists: false } }, { $set: { dateScraped: new Date() } });
    console.log(`UpsertCharitySummaries: updated ${result.modifiedCount} classifications inserted and set scrape data`);
  } catch (err) {
    console.error(`UpsertCharitySummaries: Error - inserting charities`, err);
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function GetCharitySummaries(): Promise<AcncCharitySummaryData[]> {
  const client = new MongoClient(uri);
  console.log(`GetCharitySummaries: getting classifications`);
  var charities: AcncCharitySummaryData[] = [];

  try {
    await client.connect();
    const database = client.db(dbName);
    // TODO: change collection name to acncCharitySummaries
    const collection = database.collection<AcncCharitySummaryData>(collectionNameCharitySummaries);
    const cursor = collection.find({});
    charities = await cursor.toArray();
    console.log(`GetCharitySummaries: received ${charities.length} charities`);
  } catch (err) {
    console.error(`GetCharitySummaries: Error - getting classifications`, err);
    console.error(err);
  } finally {
    await client.close();
  }
  return charities;
}

export async function UpsertCharities(charities: AcncCharityRecord[]) {
  const client = new MongoClient(uri);
  console.log(`UpsertCharities: inserting ${charities.length} charities`);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncCharityRecord>(collectionNameCharityRecords);
    collection.createIndex({ uuid: 1 }, { unique: true });

    //const result = await collection.insertMany(charities, { ordered: false });
    let updated = 0;
    let inserted = 0;
    //let result : UpdateResult<AcncCharityRecord>;
    for (let i = 0; i < charities.length; i++) {
      // insert to mongo
      const charity = charities[i];
      const result = await collection.updateOne({ uuid: charity.uuid }, { $set: charity }, { upsert: true });
      if (result.upsertedCount > 0) {
        updated++;
        console.log(`UpsertCharities: inserted ${charity.uuid} - ${charity.data.Name}`);
      } else if (result.modifiedCount > 0) {
        inserted++;
        console.log(`UpsertCharities: updated ${charity.uuid} - ${charity.data.Name}`);
      }
    }

    console.log(`UpsertCharities: inserted ${inserted} and updated ${updated} charities`);
    const result = await collection.updateMany({ dateScraped: { $exists: false } }, { $set: { dateScraped: new Date() } });
    console.log(`UpsertCharities: updated ${result.modifiedCount} classifications inserted and set scrape data`);
  } catch (err) {
    console.error(`UpsertCharities: Error - inserting charities`, err);
    console.error(err);
  } finally {
    await client.close();
  }
} /*  */

export async function UpsertCharityRecord(charity: AcncCharityRecord) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncCharityRecord>(collectionNameCharityRecords);
    collection.createIndex({ uuid: 1 }, { unique: true });

    let updated = 0;
    let inserted = 0;
    let result = await collection.updateOne({ uuid: charity.uuid }, { $set: charity }, { upsert: true });
    if (result.upsertedCount > 0) {
      updated++;
      console.log(`UpsertCharityRecord: inserted ${charity.uuid} - ${charity.data.Name}`);
    } else if (result.modifiedCount > 0) {
      inserted++;
      console.log(`UpsertCharityRecord: updated ${charity.uuid} - ${charity.data.Name}`);
    }

    console.log(`UpsertCharityRecord: inserted ${inserted} and updated ${updated} charities`);
    result = await collection.updateMany({ dateScraped: { $exists: false } }, { $set: { dateScraped: new Date() } });
    console.log(`UpsertCharityRecord: updated ${result.modifiedCount} classifications inserted and set scrape data`);
  } catch (err) {
    console.error(`UpsertCharityRecord: Error - inserting charities`, err);
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function GetCharityRecords(): Promise<AcncCharityRecord[]> {
  const client = new MongoClient(uri);
  console.log(`GetCharityRecords: getting classifications`);
  var charities: AcncCharityRecord[] = [];

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncCharityRecord>(collectionNameCharityRecords);
    const cursor = collection.find({});
    charities = await cursor.toArray();
    console.log(`GetCharityRecords: received ${charities.length} charities`);
  } catch (err) {
    console.error(`GetCharityRecords: Error - getting classifications`, err);
    console.error(err);
  } finally {
    await client.close();
  }
  return charities;
}

export async function UpsertCharityData(charity: AcncCharityData) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncCharityData>(collectionNameCharityData);
    collection.createIndex({ uuid: 1 }, { unique: true });

    let updated = 0;
    let inserted = 0;
    let result = await collection.updateOne({ uuid: charity.uuid }, { $set: charity }, { upsert: true });
    if (result.upsertedCount > 0) {
      updated++;
      console.log(`UpsertCharityData: inserted ${charity.uuid} - ${charity.Name}`);
    } else if (result.modifiedCount > 0) {
      inserted++;
      console.log(`UpsertCharityData: updated ${charity.uuid} - ${charity.Name}`);
    }

    console.log(`UpsertCharityData: inserted ${inserted} and updated ${updated} charities`);
  } catch (err) {
    console.error(`UpsertCharityData: Error - inserting charities`, err);
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function GetCharityData(): Promise<AcncCharityData[]> {
  const client = new MongoClient(uri);
  console.log(`GetCharityData: getting classifications`);
  var charities: AcncCharityData[] = [];

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection<AcncCharityData>(collectionNameCharityData);
    const cursor = collection.find({});
    charities = await cursor.toArray();
    console.log(`GetCharityData: received ${charities.length} charities`);
  } catch (err) {
    console.error(`GetCharityData: Error - getting classifications`, err);
    console.error(err);
  } finally {
    await client.close();
  }
  return charities;
}
