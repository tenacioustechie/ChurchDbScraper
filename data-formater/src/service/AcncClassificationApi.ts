import { AcncClassification } from "../models/acnc-classification";

const axios = require("axios").default;

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function GetClassifications(): Promise<AcncClassification[]> {
  const searchTerm = "church";
  const url = `https://www.acnc.gov.au/api/classie/search?search=${searchTerm}`;
  console.log(`API-GetClassifications: getting classifications from ${url}`);
  var classifications: AcncClassification[] = [];

  try {
    const response = await axios.get(url);
    console.log("API-GetClassifications: parsing response");
    classifications = response.data.results as AcncClassification[];
    //console.log(classifications);
    console.log(`API-GetClassifications: received ${classifications.length} classifications`);
    // look for sub classifications
    for (var i = 0; i < classifications.length; i++) {
      const classification = classifications[i];
      if (classification.has_children) {
        console.log(`API-GetClassifications: getting sub classifications for ${classification.classie_id} ${classification.name}}`);
        const subClassifications = await GetSubClassifications(classification.classie_id);
        console.log(`API-GetClassifications: received ${subClassifications.length} sub classifications`);
        classifications = classifications.concat(subClassifications);
      }
    }
  } catch (err) {
    console.error(`API-GetClassifications: Error - getting classifications for ${searchTerm} from ${url}`, err);
    console.error(err);
  }
  // set scrapeMe to true
  classifications.forEach((classification) => {
    classification.scrapeMe = true;
  });
  console.log(`API-GetClassifications: returning total ${classifications.length} classifications`);
  return classifications;
}
async function GetSubClassifications(parentId: string): Promise<AcncClassification[]> {
  const url = `https://www.acnc.gov.au/api/classie/search?parent=${parentId}`;
  console.log(`API-GetSubClassifications: getting sub classifications for ${parentId} from ${url}`);
  var classifications: AcncClassification[] = [];

  try {
    const response = await axios.get(url);
    console.log("API-GetSubClassifications: parsing response");
    classifications = response.data.results as AcncClassification[];
  } catch (err) {
    console.error(`API-GetSubClassifications: Error - getting sub classifications for ${parentId} from ${url}`, err);
    console.error(err);
  }
  //console.log(classifications);
  console.log(`Calling API - received ${classifications.length} sub classifications`);
  return classifications;
}
