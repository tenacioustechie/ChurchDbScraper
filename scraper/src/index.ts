import { MongoClient } from "mongodb";
import { AcncClassification } from "./models/acnc-classification";
import { GetClassifications } from "./service/AcncClassificationApi";
import { GetCharityResponse, GetCharityDetails } from "./service/AcncCharityDetailApi";
import { GetCharitySummariesByClassification } from "./service/AcncCharitySummaryApi";
import { CreateIndexes, GetCharityRecords, GetCharitySummaries, UpsertCharities, UpsertCharityData, UpsertCharityRecord, UpsertCharitySummaries, UpsertClassifications } from "./service/DbMongoApi";

console.log("Hello World! This is the scraper.");

async function runProgram() {
  // update database structure
  console.warn("Creating indexes in database...");
  await CreateIndexes();
  console.log("done");
  console.log("");

  // get AcncClassifications
  /* console.warn("Getting Classifications...");
  const classifications: AcncClassification[] = await GetClassifications();
  console.warn("Upsert Classifications into database...");
  await UpsertClassifications(classifications);
  console.log(""); /* */

  // get AcncClassifications from DB here
  const classificationsToQuery = await GetClassifications();
  // classificationsToQuery.forEach(async (classification) => { // runs parallel queries
  for (var i = 0; i < classificationsToQuery.length; i++) {
    const classification = classificationsToQuery[i];

    const charitySummaries = await GetCharitySummariesByClassification(classification.classie_id);
    //console.log(charities);
    console.warn(`Found ${charitySummaries.length} charities for ${classification.name}`);

    await UpsertCharitySummaries(charitySummaries);
    break; // temporary break until first successful run
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

  /* var charityUUID = "24ef3439-38af-e811-a962-000d3ad24a0d";
  const response = await GetCharityDetails(charityUUID);
  if (response.success && response.data != null) {
    await UpsertCharityData(response.data.data);
    console.info(`Upserted ${response.data.data.uuid} - ${response.data.data.Name}`);
    console.log(response.data.data);
  } else {
    console.error(`Error getting details for ${charityUUID}`);
  }
  process.exit(0); // temporary /*  */

  // cycle through actual charity records and pull full data
  const charitySummaries = await GetCharitySummaries();
  console.warn(`Found ${charitySummaries.length} charities to get details for`);
  for (var i = 0; i < charitySummaries.length; i++) {
    const charity = charitySummaries[i];

    console.warn(`Getting details for ${charity.CharityUuid} - ${charity.CharityName}`);
    const response = await GetCharityDetails(charity.CharityUuid);
    if (response.success && response.data != null) {
      await UpsertCharityData(response.data.data);
      console.info(`Upserted ${charity.CharityUuid} - ${charity.CharityName}`);
      // console.log(response.data);
    } else {
      console.error(`Error getting details for ${charity.CharityUuid} - ${charity.CharityName}`);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000)); // sleep 10 seconds
  } /* */
  console.log("done");

  // console.log("Response: ", response);
  // console.log("Response: ", response.data.results);
  process.exit(0); // success
}

runProgram();
