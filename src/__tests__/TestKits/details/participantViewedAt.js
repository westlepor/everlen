import { useTestKitDetails } from "../../../hooks"

import { pretendToBeInUniversalTime } from "../../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

describe("When there is no data", () => {
  const data = {}

  it("isParticipantViewedAt get set to FALSE", () => {
    const { isParticipantViewedAt } = useTestKitDetails(data)

    expect(isParticipantViewedAt).toBe(false)
  })

  it("participantViewedAt shows up as `-`", () => {
    const { participantViewedAt } = useTestKitDetails(data)

    expect(participantViewedAt).toBe("-")
  })
})

describe("", () => {
  const data = {
    viewed_at: "2020-08-27T22:34:05.452538",
  }

  it("isParticipantViewedAt get set to TRUE", () => {
    const { isParticipantViewedAt } = useTestKitDetails(data)

    expect(isParticipantViewedAt).toBe(true)
  })

  it("participantViewedAt shows up properly", () => {
    const { participantViewedAt } = useTestKitDetails(data)

    expect(participantViewedAt).toBe("08/27/2020 @ 10:34 PM")
  })
})
