import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("hasAnySampleIssues get set to FALSE", () => {
    const { hasAnySampleIssues } = useTestKitDetails(data)

    expect(hasAnySampleIssues).toBe(false)
  })

  it("Sample Issues shows up as `-`", () => {
    const { sampleIssues } = useTestKitDetails(data)

    expect(sampleIssues).toBe("-")
  })
})

describe("When issues array is empty", () => {
  const data = {
    barcode: {
      issues: [],
    },
  }

  it("hasAnySampleIssues get set to FALSE", () => {
    const { hasAnySampleIssues } = useTestKitDetails(data)

    expect(hasAnySampleIssues).toBe(false)
  })

  it("Sample Issues shows up as `-`", () => {
    const { sampleIssues } = useTestKitDetails(data)

    expect(sampleIssues).toBe("-")
  })
})

describe("When there is only one sample issue", () => {
  const data = {
    barcode: {
      issues: [
        {
          issue_group: {
            name: "Improper Packing",
          },
        },
      ],
    },
  }

  it("hasAnySampleIssues get set to TRUE", () => {
    const { hasAnySampleIssues } = useTestKitDetails(data)

    expect(hasAnySampleIssues).toBe(true)
  })

  it("Sample Issues shows up properly - one issue name", () => {
    const { sampleIssues } = useTestKitDetails(data)

    expect(sampleIssues).toBe("Improper Packing")
  })
})

describe("When there are multipe sample issues", () => {
  const data = {
    barcode: {
      issues: [
        {
          issue_group: {
            name: "Improper Packing",
          },
        },
        {
          issue_group: {
            name: "Rejected - Missing Identifiers",
          },
        },
      ],
    },
  }

  it("hasAnySampleIssues get set to TRUE", () => {
    const { hasAnySampleIssues } = useTestKitDetails(data)

    expect(hasAnySampleIssues).toBe(true)
  })

  it("Sample Issues shows up properly - comma separated multiple issue names", () => {
    const { sampleIssues } = useTestKitDetails(data)

    expect(sampleIssues).toBe(
      "Improper Packing, Rejected - Missing Identifiers"
    )
  })
})
