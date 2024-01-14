import { MongoClient } from "mongodb";
import { GetClassifications } from "./service/AcncApi";
import { UpsertCharities, UpsertClassifications } from "./service/DbMongoApi";
import { AcncClassificationSummary } from "./models/acnc-classification-summary";
import { GetCharityByClassification } from "./service/AcncCharityApi";

console.log("Hello World! This is the scraper.");

async function runProgram() {
  // get AcncClassifications
  console.warn("Getting Classifications...");
  const classifications: AcncClassificationSummary[] = await GetClassifications();
  console.warn("Upsert Classifications into database...");
  await UpsertClassifications(classifications);
  console.log("");

  // TODO: return classifications from DB here
  const classificationsToQuery = classifications;
  // classificationsToQuery.forEach(async (classification) => { // runs parallel queries
  for (var i = 0; i < classificationsToQuery.length; i++) {
    const classification = classificationsToQuery[i];

    const charities = await GetCharityByClassification(classification.classie_id);
    //console.log(charities);
    console.warn(`Found ${charities.length} charities for ${classification.name}`);

    await UpsertCharities(charities);
  }

  // console.log("Response: ", response);
  // console.log("Response: ", response.data.results);
}

runProgram();
