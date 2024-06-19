import { v4 } from "uuid";
import {
  AirbnbLogo,
  FigmaLogo,
  IndiaIcon,
  NotionLogo,
  QontoLogo,
  StripeLogo,
  UnitedStatesIcon,
} from "~lib/assets";

export enum DrawerId {
  PRIMARY_SIDENAV = "primarySidenav",
  SETTINGS_SIDENAV = "settingsSidenav",
  COMMAND_PALLETE = "commandPallete",
}

export enum DropdownId {
  CREATE_PROSPECT = "createProspect",
  CELL_DATETIME = "cellDatetime",
  CELL_COMPANY = " cellCompany",
  CELL_PHONE = "cellPhone",
  CELL_PHONE_CODE = "cellPhoneCode",
  CELL_STRING = "cellString",
  CELL_URL = "cellUrl",
  CELL_EMAIL = "cellEmail",
}

export enum FieldType {
  NAME,
  EMAIL,
  STRING,
  NUMBER,
  PHONE,
  URL,
  COMPANY,
  DATETIME,
  CHECKBOX,
  BOOLEAN,
}

export const Companies = [
  { id: v4(), name: "Figma", url: FigmaLogo },
  { id: v4(), name: "Airbnb", url: AirbnbLogo },
  { id: v4(), name: "Stripe", url: StripeLogo },
  { id: v4(), name: "Qonto", url: QontoLogo },
  { id: v4(), name: "Notion", url: NotionLogo },
];
export const CountryCodes = [
  { id: v4(), name: "United States (+1)", icon: UnitedStatesIcon, code: "1" },
  { id: v4(), name: "India (+91)", icon: IndiaIcon, code: "91" },
];
