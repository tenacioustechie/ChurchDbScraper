import { AcncCharityData, AcncCharityRecord } from "../models/acnc-charity-record";

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

export interface GetCharityResponse {
  data: AcncCharityRecord | null;
  success: boolean;
  responseCode: number;
  responseMessage: string;
}

export async function GetCharityDetails(uuid: string): Promise<GetCharityResponse> {
  const url = `https://www.acnc.gov.au/api/dynamics/entity/${uuid}`;
  let response;
  var charity: AcncCharityRecord = {} as AcncCharityRecord;
  try {
    response = await axios.get(url, {
      headers: {
        accept: "application/json, text/plain, * /*",
        "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        Referer: `https://www.acnc.gov.au/charity/charities/${uuid}/profile`,
        //"Referrer-Policy": "strict-origin-when-cross-origin",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    console.log(`API-GetCharityDetails: parsing response ${response.status} ${response.statusText}`);
    if (response.status != 200) {
      //console.error(response);
      console.error(`API-GetCharityDetails: Error - getting charities for ${uuid} from ${url}`, response.statusText);
      return {
        data: null,
        success: false,
        responseCode: response.status,
        responseMessage: response.data.message || response.statusText,
      };
    }
    //console.log("charities api response: ", JSON.stringify(response.data));
    charity = response.data as AcncCharityRecord;

    console.log(`API-GetCharityDetails: received ${charity.data.Name}`);
  } catch (err) {
    //console.error(response);
    console.error(`API-GetCharityDetails: Error - failed to get charity for ${uuid} from ${url}`, err); //, err);
    //console.error(err);
    return {
      data: null,
      success: false,
      responseCode: 500,
      responseMessage: `Exeption: ${err}`,
    };
  }
  console.log(`API-GetCharityDetails: returning charity ${charity.data.Name}`);
  return {
    data: charity,
    success: true,
    responseCode: response.status,
    responseMessage: "",
  };
}

/*
fetch("https://www.acnc.gov.au/api/dynamics/entity/4ec40a40-39af-e811-a95e-000d3ad24c60", {
  headers: {
    accept: "application/json, text/plain, * /*",
    "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    Referer: "https://www.acnc.gov.au/charity/charities/4ec40a40-39af-e811-a95e-000d3ad24c60/profile",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
}); */
