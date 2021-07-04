import { colors } from "@everlywell/leaves"

import { customColors } from "utils/styles"

export const cellType = {
  MARK: "mark",
  TIME: "time",
  ISSUE: "issue",
}

export const URL = {
  login: "/app/login",
  account: "/app/account",
  kitStatus: "/app/kit_status",
  settings: "/app/settings",
  accessCode: "/app/access_codes",
  createAccessCode: "/app/create-access-code",
  editAccessCode: "/app/edit-access-code/:code",
  registerKit: "/app/register-kit",
  userManagement: "/app/user-management",
}

export const TABLE_MAX_ROWS = 50
export const TABLE_PAGER_COUNT = 5

export const STORAGE_REDIRECT = "redirect"
export const DEFAULT_REDIRECT = URL.account

// Query Status
export const queryStatus = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
}

// Kit Status
export const KitStatusValue = {
  Ordered: "ordered", // Kit Result Status
  Registered: "registered", // Barcode State
  Submitted: "pwn_submitted",
  Approved: "results_approved",
  Archived: "archived",
  Canceled: "cancelled",
  Retrievable: "retrievable_results",
  Processed: "processed", // Barcode State
  SampleCollected: "collected",
  ResultsEntered: "results_entered",
  Any: "any",
}

export const KitStatusDesc = {
  [KitStatusValue.Ordered]: {
    label: "Registered",
    color: colors.teal6,
    pointColor: colors.teal3,
  },
  [KitStatusValue.Registered]: {
    label: "Registered",
    color: colors.teal6,
    pointColor: colors.teal3,
  },
  [KitStatusValue.Submitted]: {
    label: "Registered",
    color: colors.teal6,
    pointColor: colors.teal3,
  },
  [KitStatusValue.Approved]: {
    label: "Results Released",
    color: customColors.green6,
    pointColor: colors.green4,
  },
  [KitStatusValue.Archived]: {
    label: "Canceled",
    color: colors.gray4,
    pointColor: colors.gray2,
  },
  [KitStatusValue.Canceled]: {
    label: "Canceled",
    color: colors.gray4,
    pointColor: colors.gray2,
  },
  [KitStatusValue.Retrievable]: {
    label: "Received by Lab",
    color: colors.gray4,
    bgColor: colors.white,
    borderColor: colors.gray4,
    pointColor: colors.gray3,
  },
  [KitStatusValue.Processed]: {
    label: "Received by Lab",
    color: colors.gray4,
    bgColor: colors.white,
    borderColor: colors.gray4,
    pointColor: colors.gray3,
  },
  [KitStatusValue.SampleCollected]: {
    label: "Sample Collected",
    color: colors.orange4,
    pointColor: colors.orange4,
  },
  [KitStatusValue.ResultsEntered]: {
    label: "Results Entered",
    color: colors.green6,
    pointColor: colors.green4,
  },
}

export const InlineFilterDate = ["All", "Today", "Last 7 days", "Last 30 days"]

export const KitResultDesc = {
  Normal: "Normal",
  NeedsReview: "Needs Review",
}

export const KitResultColor = {
  Normal: "#e4f4ea",
  NormalBorder: "#b7d7c2",
  Invalid: "#fff3de",
  InvalidBorder: "#f7dfb7",
  NeedsReview: "#fcb9c1",
  NeedsReviewBorder: "#ff808e",
}

// Table Row Popup Menu
export const ROW_MENUS = {
  DETAILS: "Details",
  PDF: "Download PDF",
}

// Detail/Tracking/Transition
export const getTransitionDesc = to => {
  if (to === "processed") {
    return "Received by Lab"
  }
  return to
}

// Settings fragment
export const SETTINGS_FRAGMENT = {
  Profile: 0,
  Notifications: 1,
}

// Error
export const ERROR_TYPE = {
  NETWORK: "Network Error",
  ACCESS_CODE: "Network Error",
  DOWNLOAD: "Unable to download",
  SUPER_ADMIN: "Super admin error",
}

export const ERROR_CONTENT = {
  NETWORK:
    "We are having some network issues at the moment. Please try again later.",
  CREATE_ACCESS_CODE:
    "We can not create an access code at this time due to a network error. Please try again later.",
  UPDATE_ACCESS_CODE:
    "We can not update an access code at this time due to a network error. Please try again later.",
  PDF: "PDF can't be downloaded due to empty content.",
  NO_RESULT: "The result PDF is not available at this time.",
  NO_USER_FOUND: "This email does not exist.",
  INVALID_EMAIL: "Please input email correctly.",
  CANNOT_MIMIC_SUPERADMIN: "Can't mimic another super admin.",
  CANNOT_MIMIC_YOURSELF: "Can't mimic yourself.",
  KIT_REGISTRATION:
    "We can not register this kit at this time due to a network error. Please try again later.",
}

// Toast Message
export const TOAST_MSG = {
  PDF_DOWNLOADED: "Downloaded",
  CSV_EXPORTED: "Exported",
  CODE_SAVED: "Saved",
  CODE_CREATED: "Access Code created",
  KIT_REGISTERED: "Kit registered",
  CLIA_WAIVER_ENTERED: "Successfully entered CLIA Waiver Number",
  RESULT_ADDED: "You succesfully added {result} results for kit ID {kit_id}",
}

export const TOAST_DESC = {
  PDF_DOWNLOADING: "Result PDF is downloading.",
  CSV_EXPORTED: "Test Kits has been exported.",
  CODE_SAVED: "This access code has been updated.",
  CODE_CREATED: "This code will be ready to use.",
  KIT_REGISTERED: "This kit has been successfully registered.",
  CLIA_WAIVER_ENTERED: "",
  RESULT_ADDED: "You have 60 seconds to change this selection.",
}

export const SEARCH_CELL_KEYS = ["id", "status", "name", "test"]

export const HASURA_ROLE = {
  partner: "enterprise_partner_clinical_admin",
  client: "enterprise_client_clinical_admin",
  access: "access_code_admin",
  superAdmin: "everlywell_super_admin",
}

export const FAKE_ROW_COUNT = 10

export const FULFILLMENT_PROVIDERS = {
  rrd: {
    formatKitId: kitId => {
      return kitId.replace(/(.{3})(.{3})(.{3})/g, "$1-$2-$3")
    },
  },
  spectrum: {
    formatKitId: kitId => {
      return kitId.replace(/(.{3})(.{3})(.{3})/g, "$1-$2-$3")
    },
  },
  gbf: {
    formatKitId: kitId => {
      return kitId.replace(/(.{3})(.{4})(.{4})/g, "$1-$2-$3")
    },
  },
}

export const DEFAULT_SEARCH_COLUMNS = {
  kit_id: true,
  kit_status: true,
  participant: true,
  test_name: true,
}

export const DEFAULT_COLUMN_PREFERENCE = {
  client: true,
  kit_id: true,
  kit_status: true,
  participant: true,
  date_of_birth: false,
  email: false,
  third_party_member_id: false,
  phone: false,
  ordered: false,
  registered: true,
  collected: false,
  received_by_lab: true,
  results_entered_at: false,
  results_entered: false,
  sample_issue: false,
  results_released: true,
  participant_viewed_at: false,
  test_name: true,
  result: true,
}

export const HCP_COLUMN_PREFERENCE = {
  participant: true,
  kit_id: true,
  kit_status: true,
  registered: true,
  collected: true,
  results_entered: true,
  results_released: true,
}

export const DISABLED_COLUMNS = ["kit_id", "kit_status", "result"]

export const DELIVERY_OPTIONS = [
  {
    id: 7,
    title: "USPS Standard Shipping",
    description: "Estimated 1-3 business days",
  },
  {
    id: 12,
    title: "UPS Overnight Shipping",
    description: "Estimated next business day",
  },
]

export const RACES = [
  {
    value: "American Indian or Alaska Native",
  },
  {
    value: "Asian",
  },
  {
    value: "Black or African American",
  },
  {
    value: "Native Hawaiian or Other Pacific Islander",
  },
  {
    value: "Two or More Races",
  },
  {
    value: "White",
  },
  {
    value: "Other",
  },
  {
    value: "Prefer Not To Answer",
  },
]

export const ETHNICITIES = [
  {
    value: "Latino or Hispanic",
  },
  {
    value: "Not Latino or Hispanic",
  },
  {
    value: "Prefer Not To Answer",
  },
]

export const SYMPTOMS_LABELS = {
  "no symptoms": "No symptoms or symptoms not listed",
  mild: `One or more of the following symptoms: fever, cough sore throat, runny or stuffy nose,
    shortness of breath that is not limiting his or her ability to speak, diarrhea, nausea or vomiting,
    feeling tired, headache, body aches, belly pain, new loss of taste or smell, low appetite`,
  severe: `One or more of the following symptoms: a fever that is accompanied by a rash,
    a temperature of 100.3°F or higher for more than 48 hours, or a temperature of 102.2°F despite
    using fever-reducing medications, appears ill or is acting unusual or less active than normal,
    less appetite than normal over the past 48 hours`,
}

export const EXPOSURE_LABELS = {
  "not exposed": "They have not been exposed to COVID-19",
  "area community spread": `They live in or have visited a place where people reside, meet, or gather in close proximity
    (includes group homes, homeless shelters, detention centers, playgroups, schools, church, camp, daycare, etc.)`,
  "sick contact":
    "Child's school or public health department has requested child get tested.",
  "known exposure": `Child has been in close proximity to someone who has been diagnosed with or presumed to have COVID-19.
    Close proximity is defined as (within 6 ft of the person for a total of 15 minutes over a 24-hour period or
    been coughed or sneezed on)`,
}
export const US_STATES = [
  { value: "Select State", id: "default-select", text: "Select State" },
  { value: "AL", id: "AL", text: "Alabama" },
  { value: "AK", id: "AK", text: "Alaska" },
  { value: "AZ", id: "AZ", text: "Arizona" },
  { value: "AR", id: "AR", text: "Arkansas" },
  { value: "CA", id: "CA", text: "California" },
  { value: "CO", id: "CO", text: "Colorado" },
  { value: "CT", id: "CT", text: "Connecticut" },
  { value: "DE", id: "DE", text: "Delaware" },
  { value: "DC", id: "DC", text: "District Of Columbia" },
  { value: "FL", id: "FL", text: "Florida" },
  { value: "GA", id: "GA", text: "Georgia" },
  { value: "HI", id: "HI", text: "Hawaii" },
  { value: "ID", id: "ID", text: "Idaho" },
  { value: "IL", id: "IL", text: "Illinois" },
  { value: "IN", id: "IN", text: "Indiana" },
  { value: "IA", id: "IA", text: "Iowa" },
  { value: "KS", id: "KS", text: "Kansas" },
  { value: "KY", id: "KY", text: "Kentucky" },
  { value: "LA", id: "LA", text: "Louisiana" },
  { value: "ME", id: "ME", text: "Maine" },
  { value: "MD", id: "MD", text: "Maryland" },
  { value: "MA", id: "MA", text: "Massachusetts" },
  { value: "MI", id: "MI", text: "Michigan" },
  { value: "MN", id: "MN", text: "Minnesota" },
  { value: "MS", id: "MS", text: "Mississippi" },
  { value: "MO", id: "MO", text: "Missouri" },
  { value: "MT", id: "MT", text: "Montana" },
  { value: "NE", id: "NE", text: "Nebraska" },
  { value: "NV", id: "NV", text: "Nevada" },
  { value: "NH", id: "NH", text: "New Hampshire" },
  { value: "NJ", id: "NJ", text: "New Jersey" },
  { value: "NM", id: "NM", text: "New Mexico" },
  { value: "NY", id: "NY", text: "New York" },
  { value: "NC", id: "NC", text: "North Carolina" },
  { value: "ND", id: "ND", text: "North Dakota" },
  { value: "OH", id: "OH", text: "Ohio" },
  { value: "OK", id: "OK", text: "Oklahoma" },
  { value: "OR", id: "OR", text: "Oregon" },
  { value: "PA", id: "PA", text: "Pennsylvania" },
  { value: "RI", id: "RI", text: "Rhode Island" },
  { value: "SC", id: "SC", text: "South Carolina" },
  { value: "SD", id: "SD", text: "South Dakota" },
  { value: "TN", id: "TN", text: "Tennessee" },
  { value: "TX", id: "TX", text: "Texas" },
  { value: "UT", id: "UT", text: "Utah" },
  { value: "VT", id: "VT", text: "Vermont" },
  { value: "VA", id: "VA", text: "Virginia" },
  { value: "WA", id: "WA", text: "Washington" },
  { value: "WV", id: "WV", text: "West Virginia" },
  { value: "WI", id: "WI", text: "Wisconsin" },
  { value: "WY", id: "WY", text: "Wyoming" },
]

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
