var fs = require("fs");
import * as Db from "./service/DbMongoApi";
import { Log, LogLevel } from "./service/Log";

Log(LogLevel.INFO, "Hello World! This is the scraper export v1.");

async function runProgram() {
  // cycle through actual charity records and pull full data
  const charityData = await Db.GetCharityData();
  const total = charityData.length;
  Log(LogLevel.INFO, `Found ${total} charities to export`);
  var header = `"uuid,"Name","AFSEmail","Abn","AddressLine1","AddressLine2","AddressSuburb","AddressPostalCode","AddressStateOrProvince","AddressCountry","CharitySize","Phone","ResponsiblePersons","Status","Email","Website","SummaryOfActivities","TotalExpensesEmployee","TotalExpensesGrantsAndDonationsInAustralia","TotalExpensesGrantsAndDonationsOutsideAustralia","TotalExpensesInterest","TotalExpensesOther","TotalGrossIncomeDonationsAndRequests","TotalGrossIncomeGoodsOrServices","TotalGrossIncomeGovernmentGrants","TotalGrossIncomeInvestments","TotalGrossIncomeOtherRevenues","ParentAccountId","ParentAccountAbn","DateEstablished","LastReported","NextReportDue","ReportingLate\n"`;
  fs.writeFile("charity-data-v1.csv", line, "utf8", function (err) {
    if (err) {
      Log(LogLevel.ERROR, `Some error occurred - file either not saved or corrupted file saved. ${err}`);
    }
  });

  // write out all data
  for (var i = 0; i < charityData.length; i++) {
    const c = charityData[i];
    // log every 10% of charities
    if (i % (total / 10) == 0) {
      var progress = i % (total / 10);
      Log(LogLevel.INFO, `Exporting data ${progress}% done`);
    }

    // export charity to csv
    var line = `${c.uuid},"${c.Name}","${c.AFSEmail}","${c.Abn}","${c.AddressLine1}","${c.AddressLine2}","${c.AddressSuburb}","${c.AddressPostalCode}","${c.AddressStateOrProvince}","${c.AddressCountry}","${c.CharitySize}","${c.Phone}","${c.ResponsiblePersons}","${c.Status}","${c.Email}","${c.Website}","${c.SummaryOfActivities}","${c.TotalExpensesEmployee}","${c.TotalExpensesGrantsAndDonationsInAustralia}","${c.TotalExpensesGrantsAndDonationsOutsideAustralia}","${c.TotalExpensesInterest}","${c.TotalExpensesOther}","${c.TotalGrossIncomeDonationsAndRequests}","${c.TotalGrossIncomeGoodsOrServices}","${c.TotalGrossIncomeGovernmentGrants}","${c.TotalGrossIncomeInvestments}","${c.TotalGrossIncomeOtherRevenues}","${c.ParentAccountId}","${c.ParentAccountAbn}","${c.DateEstablished}","${c.LastReported}","${c.NextReportDue}","${c.ReportingLate}"\n`;
    fs.writeFile("charity-data-v1.csv", line, "utf8", function (err) {
      if (err) {
        Log(LogLevel.ERROR, `Some error occurred - file either not saved or corrupted file saved. ${err}`);
      }
    });
  } /* */

  Log(LogLevel.INFO, "done");
  process.exit(0); // success
}

runProgram();
