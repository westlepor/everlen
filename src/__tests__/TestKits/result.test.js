import { parseResult } from "utils/parseTableData"

describe("Covid Tests", () => {
  /**
   * Result: Normal
   */

  describe("Has summary set to `normal`", () => {
    const data = { summary: "normal" }

    it("shows Normal result", () => {
      expect(parseResult(data)).toBe("Normal")
    })
  })

  /**
   * Result: Needs Review
   */

  describe("Has summary set to `needs_review`", () => {
    const data = { summary: "needs_review" }

    it("shows Normal result", () => {
      expect(parseResult(data)).toBe("Needs Review")
    })
  })

  /**
   * Result: "" (empty string)
   */

  describe("Does not have summary set to any value", () => {
    const data = { summary: null }

    it("shows empty string", () => {
      expect(parseResult(data)).toBe("")
    })
  })
})
