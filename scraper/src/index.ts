import { MongoClient } from "mongodb";
import { GetClassifications } from "./service/AcncApi";
import { CreateIndexes, GetCharityRecords, UpsertCharities, UpsertCharityRecord, UpsertClassifications } from "./service/DbMongoApi";
import { AcncClassificationSummary } from "./models/acnc-classification-summary";
import { GetCharityByClassification, GetCharityDetails } from "./service/AcncCharityApi";

console.log("Hello World! This is the scraper.");

async function runProgram() {
  // update database structure
  console.warn("Creating indexes in database...");
  await CreateIndexes();
  console.log("done");
  console.log("");

  // get AcncClassifications
  /*
  console.warn("Getting Classifications...");
  const classifications: AcncClassificationSummary[] = await GetClassifications();
  console.warn("Upsert Classifications into database...");
  await UpsertClassifications(classifications);
  console.log(""); /* */

  // TODO: return classifications from DB here
  /*
  const classificationsToQuery = await GetClassifications();
  // classificationsToQuery.forEach(async (classification) => { // runs parallel queries
  for (var i = 0; i < classificationsToQuery.length; i++) {
    const classification = classificationsToQuery[i];

    const charities = await GetCharityByClassification(classification.classie_id);
    //console.log(charities);
    console.warn(`Found ${charities.length} charities for ${classification.name}`);

    await UpsertCharities(charities);
  } /* */

  /* 
  // error 400
  var uuid = "65261b42-2876-ee11-8179-002248935564";
  let charityDetails = await GetCharityDetails(uuid);
  // 200 - surry hills
  uuid = "4ec40a40-39af-e811-a95e-000d3ad24c60";
  charityDetails = await GetCharityDetails(uuid);
  // 200 - hillsong
  uuid = "d4028457-39af-e811-a960-000d3ad24282";
  charityDetails = await GetCharityDetails(uuid);

  process.exit(0); */

  // cycle through actual charity records and pull full data
  const charities = await GetCharityRecords();
  console.warn(`Found ${charities.length} charities to get details for`);
  for (var i = 0; i < charities.length; i++) {
    const charity = charities[i];

    console.warn(`Getting details for ${charity.uuid} - ${charity.data.Name}`);
    const response = await GetCharityDetails(charity.data.CharityUuid);
    if (response.success && response.data != null) {
      UpsertCharityRecord(response.data);
      console.info(`Upserted ${charity.uuid} - ${charity.data.Name}`);
      console.log(response.data);

      // temporary break until first successful run
      break;
    } else {
      console.error(`Error getting details for ${charity.uuid} - ${charity.data.Name}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 10000)); // sleep 10 seconds
  }

  // console.log("Response: ", response);
  // console.log("Response: ", response.data.results);
  process.exit(0); // success
}

runProgram();
