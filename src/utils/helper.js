import dayjs from "dayjs"
import { FULFILLMENT_PROVIDERS } from "./constants"

var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

const formatKitID = (kitId, provider) => {
  if (FULFILLMENT_PROVIDERS[provider]) {
    return FULFILLMENT_PROVIDERS[provider].formatKitId(kitId)
  } else {
    // default
    return kitId.replace(/(.{3})(.{3})(.{4})/g, "$1-$2-$3")
  }
}

const queryOptions = (user, isMutation = false) => {
  const idTokenInst = user.idToken.idToken

  const claims = user?.idToken?.claims || {}
  const role = claims["x-hasura-role"]

  return {
    context: {
      headers: {
        authorization: idTokenInst ? `Bearer ${idTokenInst}` : "",
        "x-hasura-role": role,
      },
    },
    fetchPolicy: isMutation ? "no-cache" : "cache-and-network",
  }
}

// searching for full name
const getLastNameSearchText = preSearchText => {
  if (preSearchText.split(" ").length > 1) {
    return `%${preSearchText.split(" ")[1]}%`
  }
  return `%${preSearchText.replace(/[-]/g, "")}%`
}

const truncate = (text, limit = 21) => {
  if (!text) {
    return ""
  }

  if (text.length <= limit) {
    return text
  }

  const truncatedText = text?.substring(0, limit - 3)?.trim()

  return `${truncatedText}...`
}

// get client ID array from hasura claim
const getHasuraClientIDs = hasuraClaims => {
  const clientIds = hasuraClaims["x-hasura-client-ids"]
  if (clientIds) {
    return clientIds
      .replace(/[{}]/, "")
      .split(",")
      .map(e => parseInt(e))
  }
  return null
}

const isValidDate = date => {
  return date && date.getTime && !isNaN(date.getTime())
}

const capitalize = s => {
  if (typeof s !== "string") return ""

  const text = s?.toLowerCase()?.split("_")?.join(" ")

  return text.charAt(0).toUpperCase() + text.slice(1)
}

const getLabelFromColumn = column => {
  if (column === "collected") {
    return "Sample Collected"
  }

  return column
    .split("_")
    .map(word => {
      let formattedWord

      if (word === "id") {
        formattedWord = "ID"
      } else if (["by", "at"].includes(word)) {
        formattedWord = word
      } else {
        formattedWord = capitalize(word)
      }

      return formattedWord
    })
    .join(" ")
}

const getThirdPartyIdConfig = partnerConfig => {
  const [
    label,
    regex_format,
    third_party_id_registration_enabled,
    user_email_required,
  ] = partnerConfig
    ? [
        partnerConfig.third_party_id.label || "Third Party ID",
        partnerConfig.third_party_id.regex_format,
        partnerConfig.third_party_id_registration_enabled,
        partnerConfig.user_email_required,
      ]
    : ["Third Party ID", "", false, true]

  return {
    label,
    regex_format,
    third_party_id_registration_enabled,
    user_email_required,
  }
}

const isValidId = (value, format) => {
  if (value) {
    const reg = new RegExp(format, "i") // Case-insensitive
    return reg.test(value)
  }
  return false
}

const isValidEmail = value => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export {
  formatKitID,
  queryOptions,
  getLastNameSearchText,
  truncate,
  getHasuraClientIDs,
  isValidDate,
  getLabelFromColumn,
  getThirdPartyIdConfig,
  isValidId,
  isValidEmail,
  capitalize,
}
