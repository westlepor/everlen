const pretendToBeInUniversalTime = () => {
  Date.prototype.getTimezoneOffset = () => 0
}

const pretendToBeInCentralTime = () => {
  Date.prototype.getTimezoneOffset = () => 360
}

const pretendToBeInHawaiianTime = () => {
  Date.prototype.getTimezoneOffset = () => 600
}

it("sets proper offset for Universal Time", () => {
  pretendToBeInUniversalTime()

  expect(Date.prototype.getTimezoneOffset()).toEqual(0)
})

it("sets proper offset for Central Time", () => {
  pretendToBeInCentralTime()

  expect(Date.prototype.getTimezoneOffset()).toEqual(360)
})

it("sets proper offset for Hawaiian Time", () => {
  pretendToBeInHawaiianTime()

  expect(Date.prototype.getTimezoneOffset()).toEqual(600)
})

export {
  pretendToBeInUniversalTime,
  pretendToBeInCentralTime,
  pretendToBeInHawaiianTime,
}
