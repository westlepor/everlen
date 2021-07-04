import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("Third Party Member ID shows up as `-`", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("-")
  })
})

describe("When there is ONLY spree_order's third_party_member_id value set", () => {
  const data = {
    barcode: {
      spree_order: {
        third_party_member_id: "W1243525625",
      },
    },
  }

  it("Third Party Member ID shows up as spree_order's third_party_member_id value", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("W1243525625")
  })
})

describe("When there is ONLY only partner_memberships's member_id set and the client and partner match", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: "client_1",
        enterprise_partner_id: "partner_1",
      },
    },
    spree_user: {
      consumer: {
        partner_memberships: [
          {
            enterprise_client_id: "client_1",
            enterprise_partner_id: "partner_1",
            member_id: "W1243525625",
          },
        ],
      },
    },
  }

  it("Third Party Member ID shows up as partner_memberships's member_id value", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("W1243525625")
  })
})

describe("When there are multiple partner_memberships's member_ids set and the client and partner match only one of them", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: "client_1",
        enterprise_partner_id: "partner_1",
      },
    },
    spree_user: {
      consumer: {
        partner_memberships: [
          {
            enterprise_client_id: "client_1",
            enterprise_partner_id: "partner_1",
            member_id: "W1243525625",
          },
          {
            enterprise_client_id: "client_2",
            enterprise_partner_id: "partner_1",
            member_id: "A1243525625",
          },
          {
            enterprise_client_id: "client_3",
            enterprise_partner_id: "partner_1",
            member_id: "B1243525625",
          },
        ],
      },
    },
  }

  it("Third Party Member ID shows up matching partner_memberships's member_id value", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("W1243525625")
  })
})

describe("When there are multiple partner_memberships's member_ids set. Partner matches BUT client does not", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: "client_100",
        enterprise_partner_id: "partner_1",
      },
    },
    spree_user: {
      consumer: {
        partner_memberships: [
          {
            enterprise_client_id: "client_1",
            enterprise_partner_id: "partner_1",
            member_id: "W1243525625",
          },
          {
            enterprise_client_id: "client_2",
            enterprise_partner_id: "partner_1",
            member_id: "A1243525625",
          },
        ],
      },
    },
  }

  it("Third Party Member ID shows up `-`", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("-")
  })
})

describe("When there are multiple partner_memberships's member_ids set. Client matches BUT partner does not", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: "client_1",
        enterprise_partner_id: "partner_100",
      },
    },
    spree_user: {
      consumer: {
        partner_memberships: [
          {
            enterprise_client_id: "client_1",
            enterprise_partner_id: "partner_1",
            member_id: "W1243525625",
          },
          {
            enterprise_client_id: "client_2",
            enterprise_partner_id: "partner_1",
            member_id: "A1243525625",
          },
        ],
      },
    },
  }

  it("", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("-")
  })
})

describe("When there is spree_order's third_party_member_id value set and ALSO there is matching partner_memberships's member_id value set", () => {
  const data = {
    barcode: {
      spree_order: {
        third_party_member_id: "A1243525625",
        enterprise_client_id: "client_1",
        enterprise_partner_id: "partner_1",
      },
    },
    spree_user: {
      consumer: {
        partner_memberships: [
          {
            enterprise_client_id: "client_1",
            enterprise_partner_id: "partner_1",
            member_id: "B1243525625",
          },
        ],
      },
    },
  }

  it("Third Party Member ID defaults to spree_order's third_party_member_id value", () => {
    const { thirdPartyID } = useTestKitDetails(data)

    expect(thirdPartyID).toBe("A1243525625")
  })
})
