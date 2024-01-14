import { AcncCharityRecord } from "../models/acnc-charity-record";

const axios = require("axios").default;

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function GetCharityByClassification(classificationId: string): Promise<AcncCharityRecord[]> {
  const searchTerm = "church";
  const urlBase = `https://www.acnc.gov.au/api/dynamics/search/program?classie=${classificationId}&items_per_page=100`;
  console.log(`API-GetCharityByClassification: getting charities from ${urlBase}`);
  var classifications: AcncCharityRecord[] = [];

  let url = urlBase;
  let response;
  try {
    while (true) {
      response = await axios.get(url);
      console.log("API-GetCharityByClassification: parsing response");
      //console.log("charities api response: ", response);
      var totalResults = response.data.pager.total_results;
      var totalPages = response.data.pager.total_pages;
      var currentPage = response.data.pager.current_page;
      console.log(`API-GetCharityByClassification: received ${response.data.results.length} of ${totalResults} charities for page ${currentPage} of ${totalPages}`);
      classifications = classifications.concat(response.data.results as AcncCharityRecord[]);

      const nextPage = currentPage + 1;
      if (nextPage < totalPages) {
        url = `${urlBase}&page=${nextPage}`;
        await new Promise((resolve) => setTimeout(resolve, 10000)); // wait 10 second
      } else {
        break;
      }
    }
    console.log(`API-GetCharityByClassification: received ${classifications.length} charities`);
  } catch (err) {
    console.error(response);
    console.error(`API-GetCharityByClassification: Error - getting charities for ${classificationId} from ${url}`, err);
    console.error(err);
  }
  console.log(`API-GetCharityByClassification: returning total ${classifications.length} charities`);
  return classifications;
}

// "pager": {
//     "total_results": 1167,
//     "total_pages": 12,
//     "items_per_page": 100,
//     "current_page": 1,
//     "items_per_page_options": ["25", "50", "100"],
//     "items_per_page_default": 25
//   },
