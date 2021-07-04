import { findUniqueOptInPortalUrls } from "utils/accessCodes"

describe("Admin has undefined urls", () => {
  const data = undefined

  it("returns an empty object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({})
  })
})

describe("Admin has no urls", () => {
  const data = []

  it("returns an empty object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({})
  })
})

describe("Admin has single empty url", () => {
  const data = [
    {
      client: { name: "Client A" },
      partner: { name: "Partner A" },
      portal: { url: "" },
    },
  ]

  it("returns an empty object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({})
  })
})

describe("Admin has multiple empty urls", () => {
  const data = [
    {
      client: { name: "Client A" },
      partner: { name: "Partner A" },
      portal: { url: "" },
    },
    {
      client: { name: "Client B" },
      partner: { name: "Partner C" },
      portal: { url: "" },
    },
  ]

  it("returns an empty object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({})
  })
})

describe("Admin has single client url", () => {
  const data = [
    {
      client: { name: "Client A" },
      portal: { url: "http://client-a.portal.com" },
    },
  ]

  it("returns client url/name in object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({
      "http://client-a.portal.com": "Client A",
    })
  })
})

describe("Admin has multiple client url", () => {
  const data = [
    {
      client: { name: "Client A" },
      portal: { url: "http://client-a.portal.com" },
    },
    {
      client: { name: "Client B" },
      portal: { url: "http://client-b.portal.com" },
    },
  ]

  it("returns client urls/names in object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({
      "http://client-a.portal.com": "Client A",
      "http://client-b.portal.com": "Client B",
    })
  })
})

describe("Admin has single partner url", () => {
  const data = [
    {
      client: null,
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
  ]

  it("returns partner url/name in object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({
      "http://partner-a.portal.com": "Partner A",
    })
  })
})

describe("Admin has repetitive partner and client urls", () => {
  const data = [
    {
      client: null,
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
    {
      client: { name: "Client A" },
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
    {
      client: { name: "Client B" },
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
  ]

  it("returns partner url/name in object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({
      "http://partner-a.portal.com": "Partner A",
    })
  })
})

describe("Admin has partially repetitive partner and client urls", () => {
  const data = [
    {
      client: { name: "Client A" },
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
    {
      client: null,
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
    {
      client: { name: "Client B" },
      partner: { name: "Partner A" },
      portal: { url: "http://client-b.portal.com" },
    },
  ]

  it("returns partner and client urls/names in object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({
      "http://partner-a.portal.com": "Partner A",
      "http://client-b.portal.com": "Client B",
    })
  })
})

describe("Admin has unique partner and client urls", () => {
  const data = [
    {
      client: null,
      partner: { name: "Partner A" },
      portal: { url: "http://partner-a.portal.com" },
    },
    {
      client: { name: "Client A" },
      partner: { name: "Partner A" },
      portal: { url: "http://client-a.portal.com" },
    },
    {
      client: { name: "Client B" },
      partner: { name: "Partner A" },
      portal: { url: "http://client-b.portal.com" },
    },
  ]

  it("returns partner and client urls/names in object", () => {
    expect(findUniqueOptInPortalUrls(data)).toEqual({
      "http://partner-a.portal.com": "Partner A",
      "http://client-a.portal.com": "Client A",
      "http://client-b.portal.com": "Client B",
    })
  })
})
