import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("Name shows up as `-`", () => {
    const { name } = useTestKitDetails(data)

    expect(name).toBe("-")
  })
})

describe("When there are consumer's first name and last name values", () => {
  const data = {
    spree_user: {
      consumer: {
        first_name: "Sofia",
        last_name: "Manzano",
      },
    },
  }

  it("Name shows up properly", () => {
    const { name } = useTestKitDetails(data)

    expect(name).toBe("Sofia Manzano")
  })
})
