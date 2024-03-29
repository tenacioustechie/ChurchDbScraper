// Generated by https://quicktype.io

// export interface AcncCharitySummary {
//   // Added locally for tracking purposes
//   dateScraped: Date;
//   version: number;
//   // Api Properties
//   classie_id: string;
//   charity_uuid: string;
//   charity_name: string;
//   program_uuid: string;
//   program_name: string;
//   location_uuid: string;
//   address: string;
//   marker: string;
//   distance: string;
//   classie_label: string;
// }

// Generated by https://quicktype.io

export interface AcncCharitySummary {
  type: string;
  uuid: string;
  data: AcncCharitySummaryData;
}

export interface AcncCharitySummaryData {
  uuid: string;
  Name: string;
  ProgramBeneficiaries: string[];
  ProgramCountries: any[];
  ProgramLocations: ProgramLocation[];
  ProgramClassie: ProgramClassie[];
  CharityName: string;
  CharityUuid: string;
  _score: number;
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
