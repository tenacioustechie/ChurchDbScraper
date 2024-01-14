// Generated by https://quicktype.io

export interface AcncCharityRecord {
  // Added locally for tracking purposes
  dateScraped: Date;
  version: number;
  // Api Properties
  type: string;
  uuid: string;
  data: AcncCharityData;
}

export interface AcncCharityData {
  Name: string;
  Status: string;
  LastReported: string;
  RelatedPartyTransactions: null;
  RelevantTransactions: null;
  OtherDetails: null;
  NextReportDue: string;
  ReportingLate: string;
  OtherNames: any[];
  Abn: string;
  TransparencyRegisterUrl: null;
  AddressLine1: string;
  AddressLine2: null;
  AddressSuburb: string;
  AddressStateOrProvince: string;
  AddressPostalCode: string;
  AddressCountry: string;
  Website: string;
  Email: string;
  Phone: null;
  CharitySize: string;
  Beneficiaries: Beneficiary[];
  DateEstablished: string;
  Countries: any[];
  SummaryOfActivities: string;
  OperatingInStates: OperatingInState[];
  TotalGrossIncomeGovernmentGrants: string;
  TotalGrossIncomeOtherRevenues: string;
  TotalGrossIncomeDonationsAndRequests: string;
  TotalGrossIncomeGoodsOrServices: string;
  TotalGrossIncomeInvestments: string;
  TotalExpensesGrantsAndDonationsInAustralia: string;
  TotalExpensesGrantsAndDonationsOutsideAustralia: string;
  TotalExpensesInterest: string;
  TotalExpensesOther: string;
  TotalExpensesEmployee: string;
  ChooseToProvideAis: string;
  AnnualReports: AnnualReport[];
  Documents: Document[];
  ResponsiblePersons: ResponsiblePerson[];
  CharitySubtypeHistory: CharitySubtypeHistory[];
  RegistrationStatusHistory: RegistrationStatusHistory[];
  EnforcementOutcomes: any[];
  GroupHeadFlag: boolean;
  ParentAccountId: null;
  ParentAccountAbn: null;
  ChildMemberStartDate: null;
  ChildMemberEndDate: null;
  AFSEmail: string;
  BasicReligiousCharityStatus: boolean;
  FinancialYearEnd: string;
  GovernmentAgencies: any[];
  Programs: Program[];
  type: string;
  uuid: string;
  AFSAddressPostalCode: string;
  AddressSuburbStatePostcode: string;
  __normalized: boolean;
}

export interface AnnualReport {
  type: string;
  Year: string;
  IsAIS: boolean;
  DueDate: null | string;
  DateReceived: null | string;
  AISId: null | string;
  Status: string;
  DocumentUuid: null;
  uuid: string;
}

export interface Beneficiary {
  Name: string;
  Description: null;
  uuid: string;
}

export interface CharitySubtypeHistory {
  Purpose: string;
  StartDate: string;
  EndDate: null | string;
  uuid: string;
}

export interface Document {
  type: string;
  Date: string;
  Year: null;
  Title: string;
  Url: string;
  uuid: string;
}

export interface OperatingInState {
  Name: string;
  uuid: string;
}

export interface Program {
  Name: string;
  ProgramLocations: ProgramLocation[];
  OperatesOnline: boolean;
  ProgramBeneficiaries: string[];
  ProgramWeblink: null;
  ProgramClassification: string;
  ProgramClassificationID: string;
  ProgramCountries: any[];
  AisUuid: string;
  uuid: string;
  ProgramClassie: ProgramClassie[];
}

export interface ProgramClassie {
  classie_id: string;
  parent_id: null | string;
  label: string;
  selected: boolean;
}

export interface ProgramLocation {
  Name: string;
  FormattedAddress: string;
  DisplayName: string;
  Marker: Marker;
  uuid: string;
}

export interface Marker {
  Latitude: number;
  Longitude: number;
}

export interface RegistrationStatusHistory {
  EffectiveDate: string;
  TransactionDate: string;
  Status: string;
  uuid: string;
}

export interface ResponsiblePerson {
  Name: string;
  Role: string;
  uuid: string;
}
