const axios = require("axios").default;

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function GetClassifications() {
  try {
    console.log("Calling API - getting classifications");
    const searchTerm = "church";
    const url = `https://www.acnc.gov.au/api/classie/search?search=${searchTerm}`;
    const response = await axios.get(url);
    console.log("Calling API - parsing response");
    var classifications = response.data.results as [];
    console.log(classifications);
    console.log(`Calling API - received ${classifications.length} classifications`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
