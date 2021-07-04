import { getFieldValue, parseResult } from "./parseTableData"
import { KitStatusDesc } from "utils/constants"
import Field from "utils/fields"
import stringify from "csv-stringify"
import { formatDateOfBirth, DATE3_FORMATTER, formatLocalDate } from "./datetime"

export const getHCPCsvHeaders = () => {
  const csvHeaders = [
    "Kit ID",
    "Kit Status",
    "First Name",
    "Last Name",
    "Registered",
    "Sample Collected",
    "Results Entered",
    "Results Released",
  ]

  return csvHeaders.join(",") + "\n"
}

export const getHCPCsvRow = ({ elem }) => {
  const kitId = getFieldValue({ elem, field: Field.id.name })
  let kitStatus = getFieldValue({
    elem,
    field: Field.status.name,
    isHCPAdmin: true,
  })
  kitStatus = KitStatusDesc[kitStatus]?.label
  const registeredAt = getFieldValue({
    elem,
    field: Field.registerTime.name,
    showTimezone: true,
  })
  const collectedAt = getFieldValue({
    elem,
    field: Field.collectTime.name,
    showTimezone: true,
  })
  const resultsEntered = getFieldValue({
    elem,
    field: Field.resultsEntered.name,
  })
  const resultsApprovedAt = getFieldValue({
    elem,
    field: Field.approveTime.name,
    showTimezone: true,
  })

  const consumer =
    elem?.spree_user?.consumer ||
    elem?.barcode?.kit_result?.spree_user?.consumer
  const firstName = consumer?.first_name
  const lastName = consumer?.last_name

  return [
    kitId,
    kitStatus,
    firstName,
    lastName,
    registeredAt,
    collectedAt,
    resultsEntered,
    resultsApprovedAt,
  ]
}

export const getCsvHeaders = ({
  hasClients,
  markerResultNames = [],
  canViewRapidTests = false,
}) => {
  let csvHeaders = canViewRapidTests
    ? [
        "Kit ID",
        "Kit Status",
        "First Name",
        "Last Name",
        "Date of Birth",
        "Email",
        "Third Party Member ID",
        "Phone",
        "Ordered",
        "Registered",
        "Sample Collected",
        "Received by Lab",
        "Results Entered At",
        "Results Entered",
        "Sample Issue",
        "Results Released",
        "Participant Viewed at",
        "Test Name",
        "Result",
        ...markerResultNames,
      ]
    : [
        "Kit ID",
        "Kit Status",
        "First Name",
        "Last Name",
        "Date of Birth",
        "Email",
        "Third Party Member ID",
        "Phone",
        "Ordered",
        "Registered",
        "Received by Lab",
        "Sample Issue",
        "Results Released",
        "Participant Viewed at",
        "Test Name",
        "Result",
        ...markerResultNames,
      ]

  if (hasClients) {
    csvHeaders = ["Client", ...csvHeaders]
  }

  return csvHeaders.join(",") + "\n"
}

export const getCsvRow = ({
  elem,
  hasClients,
  markerResultNames,
  canViewRapidTests = false,
}) => {
  const id = getFieldValue({ elem, field: Field.id.name })
  let status = getFieldValue({
    elem,
    field: Field.status.name,
    canViewRapidTests,
  })
  status = KitStatusDesc[status]?.label
  const rTime = getFieldValue({
    elem,
    field: Field.registerTime.name,
    showTimezone: true,
  })
  const pTime = getFieldValue({
    elem,
    field: Field.receiveTime.name,
    showTimezone: true,
  })
  const aTime = getFieldValue({
    elem,
    field: Field.approveTime.name,
    showTimezone: true,
  })
  const issue = getFieldValue({ elem, field: Field.issue.name })
  const test = getFieldValue({ elem, field: Field.test.name })
  const client = getFieldValue({ elem, field: Field.client.name })

  const result = parseResult(elem)
  const thirdPartyMember = getFieldValue({
    elem,
    field: Field.thirdPartyMember.name,
  })

  const markerResultValues = markerResultNames.map(name => {
    return (elem?.marker_results || [])
      .filter(mr => mr?.name === name)
      .map(mr => mr?.value)
      .join(", ")
  })

  const consumer =
    elem?.spree_user?.consumer ||
    elem?.barcode?.kit_result?.spree_user?.consumer
  const firstName = consumer?.first_name
  const lastName = consumer?.last_name
  const dateOfBirth = formatDateOfBirth(consumer?.dob)

  const ordered = formatLocalDate({
    date: elem?.barcode?.spree_order?.completed_at,
    showTimezone: true,
  })

  const participantViewedAt = formatLocalDate({
    date: elem?.viewed_at,
    showTimezone: true,
  })

  const [completed_kit_registration] =
    elem?.barcode?.completed_kit_registrations || []
  const email = completed_kit_registration?.spree_user?.email || "-"
  const phone = completed_kit_registration?.spree_user?.phone_number || "-"

  const collectedAt = getFieldValue({
    elem,
    field: Field.collectTime.name,
    showTimezone: true,
  })
  const resultsEnteredAt = getFieldValue({
    elem,
    field: Field.resultsEnteredAt.name,
    showTimezone: true,
  })
  const resultsEntered = getFieldValue({
    elem,
    field: Field.resultsEntered.name,
  })

  let csvRow = canViewRapidTests
    ? [
        id,
        status,
        firstName,
        lastName,
        dateOfBirth,
        email,
        thirdPartyMember,
        phone,
        ordered,
        rTime,
        collectedAt,
        pTime,
        resultsEnteredAt,
        resultsEntered,
        issue,
        aTime,
        participantViewedAt,
        test,
        result,
        ...markerResultValues,
      ]
    : [
        id,
        status,
        firstName,
        lastName,
        dateOfBirth,
        email,
        thirdPartyMember,
        phone,
        ordered,
        rTime,
        pTime,
        issue,
        aTime,
        participantViewedAt,
        test,
        result,
        ...markerResultValues,
      ]

  if (hasClients) {
    csvRow = [client, ...csvRow]
  }

  return csvRow
}

export const getOptInCsvHeaders = () => {
  return (
    [
      "First Name",
      "Last Name",
      "Email",
      "Date of Birth",
      "Third Party Member ID",
      "Phone Number",
      "Test",
      "Date Ordered",
      "Order Number",
    ].join(",") + "\n"
  )
}

export const getOptInCsvRow = elem => {
  const email = elem?.email
  const firstName = elem?.ship_address?.firstname
  const lastName = elem?.ship_address?.lastname
  const dob = formatDateOfBirth(elem?.dob)
  const uniqueId = elem?.third_party_member_id
  const phone = elem?.ship_address?.phone
  const test = elem?.spree_line_items[0]?.spree_variant?.spree_product?.name
  const date = formatLocalDate({
    date: elem?.created_at,
    formatter: DATE3_FORMATTER,
    showTimezone: true,
  })
  const number = elem?.number?.substring(0, 10)

  return [firstName, lastName, email, dob, uniqueId, phone, test, date, number]
}

export const getStringifiedRows = data => {
  return new Promise((resolve, reject) => {
    stringify(data, { quoted: true }, (err, results) => {
      if (err) return reject(err)
      resolve(results)
    })
  })
}
