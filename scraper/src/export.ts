import fs from "fs";
import * as Db from "./service/DbMongoApi";
import { Log, LogLevel } from "./service/Log";
import { AcncCharityData } from "./models/acnc-charity-record";

Log(LogLevel.INFO, "Hello World! This is the scraper export v1.");

function formatField(field: any): string {
  if (field === null || field === undefined) {
    return "";
  }
  var fieldString = field.toString();
  return fieldString.replace(/"/g, "'");
}

function getCharityDataLine(c: AcncCharityData): string {
  var line = formatField(c.uuid);
  line += `,"${formatField(c.Name)}"`;
  line += `,"${formatField(c.AFSEmail)}"`;
  line += `,"=""${formatField(c.Phone)}"""`;
  line += `,"${formatField(c.Email)}"`;
  line += `,"${formatField(c.Website)}"`;
  line += `,"=""${formatField(c.Abn)}"""`;
  line += `,"${formatField(c.ResponsiblePersons.map((p) => `${p.Name}(${p.Role})`).join(";"))}"`;
  line += `,"${formatField(c.Status)}"`;
  line += `,"${formatField(c.CharitySize)}"`;
  line += `,"${formatField(c.AddressLine1)}"`;
  line += `,"${formatField(c.AddressLine2)}"`;
  line += `,"${formatField(c.AddressSuburb)}"`;
  line += `,"${formatField(c.AddressPostalCode)}"`;
  line += `,"${formatField(c.AddressStateOrProvince)}"`;
  line += `,"${formatField(c.AddressCountry)}"`;
  line += `,"${formatField(c.SummaryOfActivities)}"`;
  line += `,"${formatField(c.ParentAccountId)}"`;
  line += `,"${formatField(c.ParentAccountAbn)}"`;
  line += `,"${formatField(c.DateEstablished)}"`;
  line += `,"${formatField(c.LastReported)}"`;
  line += `,"${formatField(c.NextReportDue)}"`;
  line += `,"${formatField(c.ReportingLate)}"`;
  line += `,"${formatField(c.TotalExpensesEmployee)}"`;
  line += `,"${formatField(c.TotalExpensesGrantsAndDonationsInAustralia)}"`;
  line += `,"${formatField(c.TotalExpensesGrantsAndDonationsOutsideAustralia)}"`;
  line += `,"${formatField(c.TotalExpensesInterest)}"`;
  line += `,"${formatField(c.TotalExpensesOther)}"`;
  line += `,"${formatField(c.TotalGrossIncomeDonationsAndRequests)}"`;
  line += `,"${formatField(c.TotalGrossIncomeGoodsOrServices)}"`;
  line += `,"${formatField(c.TotalGrossIncomeGovernmentGrants)}"`;
  line += `,"${formatField(c.TotalGrossIncomeInvestments)}"`;
  line += `,"${formatField(c.TotalGrossIncomeOtherRevenues)}"`;
  line += `,"${formatField(c.OperatingInStates.map((s) => s.Name).join(";"))}"`;
  line += "\n";
  return line;
}

async function runProgram() {
  // cycle through actual charity records and pull full data
  const charityData = await Db.GetCharityData();
  const total = charityData.length;
  Log(LogLevel.INFO, `Found ${total} charities to export`);
  var header = `"uuid","Name","AFSEmail","Phone","Email","Website","Abn","ResponsiblePersons","Status","CharitySize","AddressLine1","AddressLine2","AddressSuburb","AddressPostalCode","AddressStateOrProvince","AddressCountry","SummaryOfActivities","ParentAccountId","ParentAccountAbn","DateEstablished","LastReported","NextReportDue","ReportingLate","TotalExpensesEmployee","TotalExpensesGrantsAndDonationsInAustralia","TotalExpensesGrantsAndDonationsOutsideAustralia","TotalExpensesInterest","TotalExpensesOther","TotalGrossIncomeDonationsAndRequests","TotalGrossIncomeGoodsOrServices","TotalGrossIncomeGovernmentGrants","TotalGrossIncomeInvestments","TotalGrossIncomeOtherRevenues","OperatingInStates"\n`;
  fs.writeFileSync("charity-data-v1.csv", header);

  // write out all data
  var last = 0;
  for (var i = 0; i < charityData.length; i++) {
    const charity = charityData[i];
    // log every 5% of charities
    var progress = Math.round((i / total) * 100);
    if (progress % 5 == 0 && progress != last) {
      last = progress;
      Log(LogLevel.INFO, `Exporting data ${progress}% done`);
    }

    // export charity to csv
    var line = getCharityDataLine(charity);
    fs.appendFileSync("charity-data-v1.csv", line);
  } /* */

  Log(LogLevel.INFO, "done");
  process.exit(0); // success
}

runProgram();
