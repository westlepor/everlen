import { useTestKitDetails } from "../../../hooks"

import {
  pretendToBeInUniversalTime,
  pretendToBeInCentralTime,
  pretendToBeInHawaiianTime,
} from "../../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

describe("When there is no data", () => {
  const data = {}

  it("Date of Birth shows up as `-`", () => {
    const { dateOfBirth } = useTestKitDetails(data)

    expect(dateOfBirth).toBe("-")
  })
})

describe("When there is consumer's dob value", () => {
  const data = {
    spree_user: {
      consumer: {
        dob: "1950-03-03",
      },
    },
  }

  it("Date of Birth shows up properly", () => {
    const { dateOfBirth } = useTestKitDetails(data)

    expect(dateOfBirth).toBe("03/03/1950")
  })
})

describe("When time zones are different", () => {
  const data = {
    spree_user: {
      consumer: {
        dob: "1988-09-29",
      },
    },
  }

  it("Date of Birth shows up properly", () => {
    pretendToBeInCentralTime()

    const { dateOfBirth } = useTestKitDetails(data)

    expect(dateOfBirth).toBe("09/29/1988")
  })

  it("Date of Birth shows up properly", () => {
    pretendToBeInHawaiianTime()

    const { dateOfBirth } = useTestKitDetails(data)

    expect(dateOfBirth).toBe("09/29/1988")
  })
})
