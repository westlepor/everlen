// This data is to be used for testing purposes
// until we get dynamic data working on User Management

import { colors } from "@everlywell/leaves"

const USER_LOGS = [
  {
    id: "1",
    time: "April 14 15:01:43",
    actor: "Everlywell Portal (PublicClentApp)",
    event_info: "OAuth2 access token granted success",
    target: "(User) Access Token (access_token)",
  },
  {
    id: "2",
    time: "April 14 15:01:43",
    actor: "Jessie Davis (User)",
    event_info: "User single-sign on to app success",
    target: "OpenID Connect Client (App instance) Jessie Davis (AppUser)",
  },
]

const ENTERPRISE_MAPPING = {
  partners: [
    { id: 13, name: "Austin Lighting" },
    { id: 53, name: "Bevo’s Chop Shop" },
  ],
  clients: [
    { id: 88, name: "Chicon Automotive: West Riverside" },
    { id: 89, name: "Bevo's Chop Shop Waco" },
    { id: 90, name: "Chicon Automotive: Barton Spring Riverside" },
    { id: 91, name: "Chicon Automotive: East Riverside" },
    { id: 92, name: "Bevo's Chop Shop Dallas" },
  ],
}

const ROLE_MAPPING = {
  enterprise_client_clinical_admin: "Enterprise Client Clinical Admin",
  enterprise_client_hcp: "Enterprise Client HCP",
  enterprise_partner_clinical_admin: "Enterprise Partner Clinical Admin",
  enterprise_partner_hcp: "Enterprise Partner HCP",
}

const ALL_ROLES = {
  enterprise_client_clinical_admin: "Enterprise Client Clinical Admin",
  enterprise_client_hcp: "Enterprise Client HCP",
  enterprise_partner_clinical_admin: "Enterprise Partner Clinical Admin",
  enterprise_partner_hcp: "Enterprise Partner HCP",
  everlywell_super_admin: "Everlywell Super Admin",
}

const CLIENT_ROLE_MAPPING = {
  enterprise_client_clinical_admin: "Enterprise Client Clinical Admin",
  enterprise_client_hcp: "Enterprise Client HCP",
}

const PARTNER_ROLE_MAPPING = {
  enterprise_partner_clinical_admin: "Enterprise Partner Clinical Admin",
  enterprise_partner_hcp: "Enterprise Partner HCP",
}

const SUPER_ADMIN_ROLE = "everlywell_super_admin"
const SUPER_ADMIN_ROLE_LABEL = "Everlywell Super Admin"

const STATUSES = {
  staged: {
    name: "Staged",
    color: colors.blue1,
  },
  provisioned: {
    name: "Pending user action",
    color: colors.teal5,
  },
  active: {
    name: "Active",
    color: colors.green5,
  },
  recovery: {
    name: "Password Reset",
    color: colors.teal5,
  },
  locked_out: {
    name: "Locked out",
    color: colors.orange2,
  },
  password_expired: {
    name: "Password expired",
    color: colors.orange2,
  },
  suspended: {
    name: "Suspended",
    color: colors.gray4,
  },
  deprovisioned: {
    name: "Deactivated",
    color: colors.gray3,
  },
}

export {
  USER_LOGS,
  ENTERPRISE_MAPPING,
  ROLE_MAPPING,
  ALL_ROLES,
  CLIENT_ROLE_MAPPING,
  PARTNER_ROLE_MAPPING,
  SUPER_ADMIN_ROLE,
  SUPER_ADMIN_ROLE_LABEL,
  STATUSES,
}
