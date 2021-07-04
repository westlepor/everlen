import { getThirdPartyMemberId, findThirdPartyIdConfig } from "utils/details"
import { getIssue } from "utils/parseTableData"
import {
  formatLocalDate,
  formatDateOfBirth,
  DATE2_FORMATTER,
  getUnixTimestamp,
} from "utils/datetime"

const useTestKitDetails = (data = {}) => {
  const consumer = data?.spree_user?.consumer
  const { kit_result_status_transitions } = data
  const { barcode_state_transitions, delivered_to_lab_notifications_sent_at } =
    data?.barcode || {}
  const [completed_kit_registration] =
    data?.barcode?.completed_kit_registrations || []

  /*******************
   * IDs
   *******************/

  const kitResultId = data?.id

  const testId = data?.test_id

  const enterpriseClientId = data?.barcode?.spree_order?.enterprise_client_id
  const enterprisePartnerId = data?.barcode?.spree_order?.enterprise_partner_id

  /*******************
   * Status
   *******************/

  const isCanceled = data?.status === "archived"

  /*******************
   * Details
   *******************/

  const barcodeSerialNumber = data?.barcode?.serial_number

  /*******************
   * Participant
   *******************/

  const name = consumer ? `${consumer.first_name} ${consumer.last_name}` : "-"
  const dateOfBirth = formatDateOfBirth(consumer?.dob)
  const email = completed_kit_registration?.spree_user?.email || "-"
  const phone = completed_kit_registration?.spree_user?.phone_number || "-"

  /**
   * Third Party Member ID
   */
  const config = findThirdPartyIdConfig(data)

  const isThirdPartyIDEnabled =
    !!config?.third_party_id_registration_enabled ||
    !!config?.third_party_id_order_enabled
  const thirdPartyIDLabel =
    config?.third_party_id?.label || "Third Party Member ID"

  const thirdPartyID = getThirdPartyMemberId(data)

  /*******************
   * Test Information
   *******************/

  const testName = data?.test?.display_name
  const client = data?.barcode?.spree_order?.enterprise_client?.name
  const pwnOrderNumber = data?.pwn_order_number

  /*******************
   * Tracking Details
   *******************/

  /**
   * Ordered
   */
  const isOrdered = !!data?.barcode?.spree_order?.completed_at
  const orderedAt = formatLocalDate({
    date: data?.barcode?.spree_order?.completed_at,
    formatter: DATE2_FORMATTER,
  })

  /**
   * Registered
   */
  const registeredTransitions = barcode_state_transitions?.filter(
    transition => transition.to === "registered"
  ) || []
  // Get most recent registration event
  const [ registeredTransition ] = registeredTransitions?.sort(
    (a, b) => getUnixTimestamp(b.created_at) - getUnixTimestamp(a.created_at)
  )
  const isRegistered = !!registeredTransition
  const registeredAt = formatLocalDate({
    date: registeredTransition?.created_at,
    formatter: DATE2_FORMATTER,
  })

  /**
   * Collected
   */
  const isCollected = !!data?.rapid_test?.collectedAt
  const collectedAt = formatLocalDate({
    date: data?.rapid_test?.collectedAt,
    formatter: DATE2_FORMATTER,
  })

  /**
   * Results Entered At
   */
  const isResultsEnteredAt = !!data?.rapid_test?.resultsEnteredAt

  /**
   * Results Entered
   */
  const isResultEntered = !!data?.rapid_test?.result
  // !!data?.rapid_test?.resultsEnteredAt && !!data?.rapid_test?.result
  const resultsEnteredAt = formatLocalDate({
    date: data?.rapid_test?.resultsEnteredAt,
    formatter: DATE2_FORMATTER,
  })

  const resultsEntered = data?.rapid_test?.result

  /**
   * Received by Lab
   */
  const receivedByLabTransition = barcode_state_transitions?.find(
    transition => transition.to === "processed"
  )
  const isReceivedByLab =
    !!delivered_to_lab_notifications_sent_at || !!receivedByLabTransition
  const receivedByLabAt = formatLocalDate({
    date:
      delivered_to_lab_notifications_sent_at ||
      receivedByLabTransition?.created_at,
    formatter: DATE2_FORMATTER,
  })

  /**
   * Sample Issues
   */
  const sampleIssues = getIssue(data)
  const hasAnySampleIssues = sampleIssues !== "-"

  /**
   * Results Released
   */
  const resultsApprovedTransition = kit_result_status_transitions?.find(
    transition => transition.to === "results_approved"
  )
  const isResultApproved = !!resultsApprovedTransition
  const resultsApprovedAt = formatLocalDate({
    date: resultsApprovedTransition?.created_at,
    formatter: DATE2_FORMATTER,
  })

  /**
   * Participant Viewed At
   */
  const isParticipantViewedAt = !!data?.viewed_at
  const participantViewedAt = formatLocalDate({
    date: data?.viewed_at,
    formatter: DATE2_FORMATTER,
  })

  return {
    kitResultId,
    testId,
    enterpriseClientId,
    enterprisePartnerId,
    name,
    dateOfBirth,
    email,
    phone,
    isThirdPartyIDEnabled,
    thirdPartyIDLabel,
    thirdPartyID,
    testName,
    client,
    pwnOrderNumber,
    hasAnySampleIssues,
    sampleIssues,
    isParticipantViewedAt,
    participantViewedAt,
    isOrdered,
    orderedAt,
    isCollected,
    collectedAt,
    isResultsEnteredAt,
    isResultEntered,
    resultsEnteredAt,
    resultsEntered,
    isRegistered,
    registeredAt,
    isReceivedByLab,
    receivedByLabAt,
    isResultApproved,
    resultsApprovedAt,
    isCanceled,
    barcodeSerialNumber,
  }
}

export default useTestKitDetails
