import { getIssue } from "../utils/parseTableData"
import * as mockKitResults from "./mockKitResults.json"

describe("Display Issues", () => {
  it("shows sample issues because it has issues and the status is not Results Released", () => {
    const result = getIssue(mockKitResults.data.kit_results[0], false)
    expect(result).toBe("Fake Name 1, Fake Name 2")
  })
})

describe("Hide Issues", () => {
  it("doesn't display sample issues because it has issues but the status is Results Released", () => {
    const result = getIssue(mockKitResults.data.kit_results[1], false)
    expect(result).toBe("-")
  })
})

describe("Empty Issues", () => {
  it("doesn't display sample issues because it doesn't has issues", () => {
    const result = getIssue(mockKitResults.data.kit_results[2], false)
    expect(result).toBe("-")
  })
})
