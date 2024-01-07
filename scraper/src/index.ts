import { MongoClient } from "mongodb";
import { GetClassifications } from "./service/AcncApi";

console.log("Hello World! This is the scraper.");

async function runProgram() {
  // get AcncClassifications
  const response = await GetClassifications();
}

runProgram();
