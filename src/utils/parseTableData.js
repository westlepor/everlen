import {
  cellType,
  KitResultDesc,
  KitStatusValue,
  FAKE_ROW_COUNT,
} from "./constants"
import Field from "./fields"
import { formatKitID } from "./helper"
import { formatLocalDate, formatDateOfBirth } from "utils/datetime"
import { getUnixTimestamp } from "./datetime/common"

export const parseResult = data => {
  if (data?.summary === "normal") {
    return KitResultDesc.Normal
  }

  if (data?.summary === "needs_review") {
    return KitResultDesc.NeedsReview
  }

  return ""
}

const getTime = (kit_result, type, showTimezone = false) => {
  const stateTransitions = !!kit_result?.barcode?.barcode_state_transitions ?
    kit_result.barcode.barcode_state_transitions.filter(
      transition => transition.to === type
    ) : []
  // Get most recent transition event
  const [ latestTransition ] = stateTransitions.sort(
    (a, b) => getUnixTimestamp(b?.created_at) - getUnixTimestamp(a?.created_at)
  )
  let date = latestTransition?.created_at

  if (type === "registered") {
    date = date || kit_result?.created_at
  } else if (type === "processed") {
    /**
     * For the concept of "Received by Lab"
     * Barcode.delivered_to_lab_notifications_sent_at will use the time that a kit is delivered to the lab (if we get a delivery scan from UPS/USPS)
     * otherwise it will use the normal processing scan
     */
    date = kit_result?.barcode?.delivered_to_lab_notifications_sent_at || date
  }

  if (!!date) {
    return formatLocalDate({ date: date, showTimezone })
  }

  return "-"
}

export const buildHeader = ({
  isFake = false,
  columns = {},
  isHCPAdmin,
  canViewRapidTests,
}) => {
  const header = {
    cells: [],
  }

  if (isFake) {
    for (let i = 0; i < FAKE_ROW_COUNT; i++) {
      header.cells.push({ isFake })
    }
  }

  if (!!columns.client) {
    header.cells.push({
      value: Field.client.name,
      minWidth: Field.client.minWidth,
    })
  }

  if (!!columns.kit_id) {
    header.cells.push({
      value: Field.id.name,
      minWidth: Field.id.minWidth,
    })
  }

  if (!!columns.kit_status) {
    header.cells.push({
      value: Field.status.name,
      minWidth: Field.status.minWidth,
    })
  }

  if (!!columns.participant) {
    header.cells.push({
      value: Field.name.name,
      minWidth: Field.name.minWidth,
    })
  }

  if (!!columns.date_of_birth) {
    header.cells.push({
      value: Field.dob.name,
      minWidth: Field.dob.minWidth,
    })
  }

  if (!!columns.email) {
    header.cells.push({
      value: Field.email.name,
      minWidth: Field.email.minWidth,
    })
  }

  if (!!columns.third_party_member_id) {
    header.cells.push({
      value: Field.thirdPartyMember.name,
      minWidth: Field.thirdPartyMember.minWidth,
    })
  }

  if (!!columns.phone) {
    header.cells.push({
      value: Field.phone.name,
      minWidth: Field.phone.minWidth,
    })
  }

  if (!!columns.ordered) {
    header.cells.push({
      value: Field.ordered.name,
      minWidth: Field.ordered.minWidth,
    })
  }

  if (!!columns.registered) {
    header.cells.push({
      value: Field.registerTime.name,
      minWidth: Field.registerTime.minWidth,
    })
  }

  if (!!columns.collected && (isHCPAdmin || canViewRapidTests)) {
    header.cells.push({
      value: Field.collectTime.name,
      minWidth: Field.collectTime.minWidth,
    })
  }

  if (!!columns.received_by_lab) {
    header.cells.push({
      value: Field.receiveTime.name,
      minWidth: Field.receiveTime.minWidth,
    })
  }

  if (!!columns.results_entered_at && (isHCPAdmin || canViewRapidTests)) {
    header.cells.push({
      value: Field.resultsEnteredAt.name,
      minWidth: Field.resultsEnteredAt.minWidth,
    })
  }

  if (!!columns.results_entered && (isHCPAdmin || canViewRapidTests)) {
    header.cells.push({
      value: Field.resultsEntered.name,
      minWidth: Field.resultsEntered.minWidth,
    })
  }

  if (!!columns.sample_issue) {
    header.cells.push({
      value: Field.issue.name,
      minWidth: Field.issue.minWidth,
    })
  }

  if (!!columns.results_released) {
    header.cells.push({
      value: Field.approveTime.name,
      minWidth: Field.approveTime.minWidth,
    })
  }

  if (!!columns.participant_viewed_at) {
    header.cells.push({
      value: Field.participantViewedAt.name,
      minWidth: Field.participantViewedAt.minWidth,
    })
  }

  if (!!columns.test_name) {
    header.cells.push({
      value: Field.test.name,
      minWidth: Field.test.minWidth,
    })
  }

  if (!!columns.result) {
    header.cells.push({
      value: Field.result.name,
      minWidth: Field.result.minWidth,
    })
  }

  header.cells.push({ value: "", width: Field.menu.width })

  return header
}

export const getIssue = elem => {
  let issues = "-"

  if (!elem.barcode) {
    return issues
  }

  if (!elem.barcode.issues) {
    return issues
  }

  const issueNames = elem.barcode.issues.map(e => e.issue_group?.name)

  if (issueNames.length) {
    // remove duplications
    const filteredNames = [...new Set(issueNames)]
    issues = filteredNames.join(", ")
  }

  return issues
}

const isRapidTest = ({ testKit }) => {
  const rapidTestId = parseInt(process.env.GATSBY_RAPID_TEST_ID)

  return !!testKit?.rapid_test && testKit?.test_id === rapidTestId
}

export const getStatus = ({ elem, isHCPAdmin, canViewRapidTests }) => {
  const status = elem?.status

  // Results Released
  if (status === KitStatusValue.Approved) {
    return KitStatusValue.Approved
  }

  // Canceled
  if (status === KitStatusValue.Archived) {
    return KitStatusValue.Canceled
  }

  if ((isHCPAdmin || canViewRapidTests) && isRapidTest({ testKit: elem })) {
    const displayStatus = elem?.rapid_test?.displayStatus

    return displayStatus
  }

  // Registered
  const isRegistered = elem?.barcode?.state === KitStatusValue.Registered
  if (status !== KitStatusValue.Approved && isRegistered) {
    return KitStatusValue.Registered
  }

  // Received by Lab
  const isProcessed = elem?.barcode?.state === KitStatusValue.Processed
  if (status !== KitStatusValue.Approved && isProcessed) {
    return KitStatusValue.Retrievable
  }

  return "-"
}

export const getFieldValue = ({
  elem,
  field,
  isHCPAdmin = false,
  canViewRapidTests = false,
  showTimezone = false,
}) => {
  if (field === Field.id.name) {
    let serialNum =
      elem.barcode && elem.barcode.serial_number
        ? elem.barcode.serial_number
        : ""

    if (serialNum) {
      // get provider for specific formatting
      let provider = elem.barcode.fulfillment_provider.name

      // adding hyphen for each serial_number
      serialNum = formatKitID(serialNum, provider)
    }

    return serialNum
  } else if (field === Field.status.name) {
    return getStatus({ elem, isHCPAdmin, canViewRapidTests })
  } else if (field === Field.name.name) {
    const consumer =
      elem?.spree_user?.consumer ||
      elem?.barcode?.kit_result?.spree_user?.consumer

    return `${consumer?.first_name} ${consumer?.last_name}`
  } else if (field === Field.dob.name) {
    const consumer =
      elem?.spree_user?.consumer ||
      elem?.barcode?.kit_result?.spree_user?.consumer
    return formatDateOfBirth(consumer?.dob)
  } else if (field === Field.email.name) {
    const [completed_kit_registration] =
      elem?.barcode?.completed_kit_registrations || []
    return completed_kit_registration?.spree_user?.email || "-"
  } else if (field === Field.phone.name) {
    const [completed_kit_registration] =
      elem?.barcode?.completed_kit_registrations || []
    return completed_kit_registration?.spree_user?.phone_number || "-"
  } else if (field === Field.ordered.name) {
    return formatLocalDate({
      date: elem.barcode.spree_order?.completed_at,
      showTimezone,
    })
  } else if (field === Field.registerTime.name) {
    return getTime(elem, "registered", showTimezone)
  } else if (field === Field.receiveTime.name) {
    return getTime(elem, "processed", showTimezone)
  } else if (field === Field.collectTime.name) {
    return formatLocalDate({
      date: elem?.rapid_test?.collectedAt,
      showTimezone,
    })
  } else if (field === Field.resultsEntered.name) {
    return elem?.rapid_test?.result
  } else if (field === Field.resultsEnteredAt.name) {
    return formatLocalDate({
      date: elem?.rapid_test?.resultsEnteredAt,
      showTimezone,
    })
  } else if (field === Field.approveTime.name) {
    return formatLocalDate({ date: elem.results_approved_at, showTimezone })
  } else if (field === Field.participantViewedAt.name) {
    return formatLocalDate({ date: elem?.viewed_at, showTimezone })
  } else if (field === Field.issue.name) {
    return getIssue(elem)
  } else if (field === Field.test.name) {
    return elem.test && elem.test.display_name ? elem.test.display_name : "-"
  } else if (field === Field.client.name) {
    return elem?.barcode?.spree_order?.enterprise_client?.name
  } else if (field === Field.thirdPartyMember.name) {
    const spreeOrderThirdPartyMemberId =
      elem?.barcode?.spree_order?.third_party_member_id

    const partner_id = elem?.barcode?.spree_order?.enterprise_partner_id
    const client_id = elem?.barcode?.spree_order?.enterprise_client_id
    const partnerMembership = elem?.spree_user?.consumer?.partner_memberships?.find(
      m =>
        m.enterprise_partner_id === partner_id &&
        m.enterprise_client_id === client_id
    )

    return spreeOrderThirdPartyMemberId || partnerMembership?.member_id
  }
}

const buildPageRows = ({
  kitResults = [],
  columns = {},
  isHCPAdmin,
  canViewRapidTests,
}) => {
  const rows = kitResults.map(elem => {
    const id = getFieldValue({ elem, field: Field.id.name })
    const status = getFieldValue({
      elem,
      field: Field.status.name,
      isHCPAdmin,
      canViewRapidTests,
    })
    const name = getFieldValue({ elem, field: Field.name.name })
    const thirdPartyMember = getFieldValue({
      elem,
      field: Field.thirdPartyMember.name,
    })
    const email = getFieldValue({ elem, field: Field.email.name })
    const dob = getFieldValue({ elem, field: Field.dob.name })
    const phone = getFieldValue({ elem, field: Field.phone.name })
    const ordered = getFieldValue({ elem, field: Field.ordered.name })
    const rTime = getFieldValue({ elem, field: Field.registerTime.name })
    const cTime = getFieldValue({ elem, field: Field.collectTime.name })
    const reTime = getFieldValue({ elem, field: Field.resultsEnteredAt.name })
    const pTime = getFieldValue({ elem, field: Field.receiveTime.name })
    const aTime = getFieldValue({ elem, field: Field.approveTime.name })
    const participantViewedAt = getFieldValue({
      elem,
      field: Field.participantViewedAt.name,
    })
    const issue = getFieldValue({ elem, field: Field.issue.name })
    const test = getFieldValue({ elem, field: Field.test.name })
    const r = parseResult(elem)
    const resultsEntered = getFieldValue({
      elem,
      field: Field.resultsEntered.name,
    })

    let cells = []

    if (!!columns.client) {
      const client = getFieldValue({ elem, field: Field.client.name })

      cells.push({
        key: "client",
        value: client,
        minWidth: Field.client.minWidth,
      })
    }

    if (!!columns.kit_id) {
      cells.push({
        key: "id",
        value: id,
        minWidth: Field.id.minWidth,
      })
    }

    if (!!columns.kit_status) {
      cells.push({
        key: "status",
        value: status,
        type: cellType.MARK,
        minWidth: Field.status.minWidth,
      })
    }

    if (!!columns.participant) {
      cells.push({
        key: "name",
        value: name,
        minWidth: Field.name.minWidth,
      })
    }

    if (!!columns.date_of_birth) {
      cells.push({
        key: "dob",
        value: dob,
        minWidth: Field.dob.minWidth,
      })
    }

    if (!!columns.email) {
      cells.push({
        key: "email",
        value: email,
        minWidth: Field.email.minWidth,
      })
    }

    if (!!columns.third_party_member_id) {
      cells.push({
        key: "thirdyPartyMember",
        value: thirdPartyMember,
        minWidth: Field.thirdPartyMember.minWidth,
      })
    }

    if (!!columns.phone) {
      cells.push({
        key: "phone",
        value: phone,
        minWidth: Field.phone.minWidth,
      })
    }

    if (!!columns.ordered) {
      cells.push({
        key: "ordered",
        value: ordered,
        type: cellType.TIME,
        minWidth: Field.ordered.minWidth,
      })
    }

    if (!!columns.registered) {
      cells.push({
        key: "registerTime",
        value: rTime,
        type: cellType.TIME,
        minWidth: Field.registerTime.minWidth,
      })
    }

    if (!!columns.collected && (isHCPAdmin || canViewRapidTests)) {
      cells.push({
        key: "collectTime",
        value: cTime,
        type: cellType.TIME,
        minWidth: Field.collectTime.minWidth,
      })
    }

    if (!!columns.received_by_lab) {
      cells.push({
        key: "arrivalTime",
        value: pTime,
        type: cellType.TIME,
        minWidth: Field.receiveTime.minWidth,
      })
    }

    if (!!columns.results_entered_at && (isHCPAdmin || canViewRapidTests)) {
      cells.push({
        key: "resultsEnteredAt",
        value: reTime,
        type: cellType.TIME,
        minWidth: Field.resultsEnteredAt.minWidth,
      })
    }

    if (!!columns.results_entered && (isHCPAdmin || canViewRapidTests)) {
      cells.push({
        key: "resultsEntered",
        value: resultsEntered,
        type: resultsEntered ? cellType.MARK : "",
        minWidth: Field.resultsEntered.minWidth,
      })
    }

    if (!!columns.sample_issue) {
      cells.push({
        key: "issue",
        value: issue,
        type: cellType.ISSUE,
        minWidth: Field.issue.minWidth,
      })
    }

    if (!!columns.results_released) {
      cells.push({
        key: "approveTime",
        value: aTime,
        type: cellType.TIME,
        minWidth: Field.approveTime.minWidth,
      })
    }

    if (!!columns.participant_viewed_at) {
      cells.push({
        key: "arrivalTime",
        value: participantViewedAt,
        type: cellType.TIME,
        minWidth: Field.participantViewedAt.minWidth,
      })
    }

    if (!!columns.test_name) {
      cells.push({
        key: "test",
        value: test,
        minWidth: Field.test.minWidth,
      })
    }

    if (!!columns.result) {
      cells.push({
        key: "result",
        value: r,
        type: r ? cellType.MARK : "",
        minWidth: Field.result.minWidth,
      })
    }

    const kitValues = elem.kit_values

    const rowData = {
      row: {
        cells,
        id: elem.id,
        isPdfExist: !!kitValues,
      },
    }
    return rowData
  })

  return rows
}

export const buildFakeCells = () => {
  let cells = []
  let fakeCounts = [1, 1, 1, 2, 2, 2, 2, 1, 1]

  for (let i = 0; i < fakeCounts.length; i++) {
    cells.push({
      value: "",
      isFake: true,
      fakes: fakeCounts[i],
    })
  }
  return cells
}

export const buildFakeRows = () => {
  let rows = []

  for (let i = 0; i < FAKE_ROW_COUNT; i++) {
    rows.push({ row: { cells: buildFakeCells(), isFake: true } })
  }

  return rows
}

export const parseKitResults = ({
  data,
  columns,
  isHCPAdmin,
  canViewRapidTests,
}) => {
  const kitResults = data?.kit_results || []

  // build header of table
  const header = buildHeader({
    isFake: false,
    columns,
    isHCPAdmin,
    canViewRapidTests,
  })

  // build rows for the current page
  const rows = buildPageRows({
    kitResults,
    columns,
    isHCPAdmin,
    canViewRapidTests,
  })

  return {
    header,
    rows,
  }
}
