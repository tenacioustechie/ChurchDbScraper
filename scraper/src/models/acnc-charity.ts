import { AcncCharityRecord } from "./acnc-charity-record";
import { AcncCharitySummary } from "./acnc-charity-summary";

export interface AcncCharity {
  Id: string;
  acncUuid: string;
  name: string;
  shouldCollect: boolean;
  records: AcncCharityRecord[];
  summaryRecords: AcncCharitySummary[];
}
