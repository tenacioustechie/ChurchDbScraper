import { AcncCharityData, AcncCharityRecord } from "../models/acnc-charity-record";
import { AcncCharitySummary, AcncCharitySummaryData } from "../models/acnc-charity-summary";
import { Log, LogLevel } from "./Log";

const axios = require("axios").default;

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function GetCharitySummariesByClassification(classificationId: string): Promise<AcncCharitySummaryData[]> {
  const searchTerm = "church";
  const urlBase = `https://www.acnc.gov.au/api/dynamics/search/program?classie=${classificationId}&items_per_page=100`;
  console.log(`API-GetCharityByClassification: getting charities from ${urlBase}`);
  var charitySummaries: AcncCharitySummaryData[] = [];

  let url = urlBase;
  let response;
  try {
    while (true) {
      Log(LogLevel.INFO, `API-GetCharitySummariesByClassification: getting charities from api ${url}`);
      response = await axios.get(url);
      //console.log("charities api response: ", response);
      var totalResults = response.data.pager.total_results;
      var totalPages = response.data.pager.total_pages;
      var currentPage = response.data.pager.current_page;
      Log(LogLevel.INFO, `API-GetCharitySummariesByClassification: received ${response.data.results.length} of ${totalResults} charities for page ${currentPage} of ${totalPages}`);
      var list = response.data.results as AcncCharitySummary[];
      charitySummaries = charitySummaries.concat(list.map((item) => item.data));

      const nextPage = currentPage + 1;
      if (nextPage < totalPages) {
        url = `${urlBase}&page=${nextPage}`;
        await new Promise((resolve) => setTimeout(resolve, 10000)); // wait 10 second
      } else {
        break;
      }
    }
    Log(LogLevel.INFO, `API-GetCharitySummariesByClassification: received ${charitySummaries.length} charities`);
  } catch (err) {
    Log(LogLevel.ERROR, response);
    Log(LogLevel.ERROR, `API-GetCharitySummariesByClassification: ERROR - getting charities for ${classificationId} from ${url}`);
    Log(LogLevel.ERROR, JSON.stringify(err));
  }
  Log(LogLevel.INFO, `API-GetCharitySummariesByClassification: returning total ${charitySummaries.length} charities`);
  return charitySummaries;
}
