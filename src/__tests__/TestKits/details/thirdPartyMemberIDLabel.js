import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("isThirdPartyIDEnabled get set to be FALSE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(false)
  })

  it("Third Party Member ID defaults to `Third Party Member ID`", () => {
    const { thirdPartyIDLabel } = useTestKitDetails(data)

    expect(thirdPartyIDLabel).toBe("Third Party Member ID")
  })
})

describe("When there is enterprise_client_id present on spree_order BUT Third Party ID is not enabled", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: 1,
        enterprise_client: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: false,
              third_party_id_order_enabled: false,
              third_party_id: {},
            },
          ],
        },
        enterprise_partner: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: false,
              third_party_id_order_enabled: true,
              third_party_id: {
                label: "Employee ID",
                regex_format: "^[a-z0-9]{8}$",
                client_specific: false,
              },
            },
          ],
        },
      },
    },
  }

  it("isThirdPartyIDEnabled get set to be FALSE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(false)
  })
})

describe("When there is enterprise_client_id present on spree_order AND Third Party ID is enabled by third_party_id_registration_enabled", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: 1,
        enterprise_client: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: true,
              third_party_id_order_enabled: false,
              third_party_id: {
                label: "Employee ID",
                regex_format: "^[a-z0-9]{8}$",
                client_specific: false,
              },
            },
          ],
        },
        enterprise_partner: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: false,
              third_party_id_order_enabled: true,
              third_party_id: {
                label: "Student ID",
                regex_format: "^[a-z0-9]{8}$",
                client_specific: false,
              },
            },
          ],
        },
      },
    },
  }

  it("isThirdPartyIDEnabled get set to be TRUE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(true)
  })

  it("Third Party Member ID show up as `Employee ID`", () => {
    const { thirdPartyIDLabel } = useTestKitDetails(data)

    expect(thirdPartyIDLabel).toBe("Employee ID")
  })
})

describe("When there is enterprise_client_id present on spree_order AND Third Party ID is enabled by third_party_id_order_enabled", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: 1,
        enterprise_client: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: true,
              third_party_id_order_enabled: false,
              third_party_id: {
                label: "Employee ID",
                regex_format: "^[a-z0-9]{8}$",
                client_specific: false,
              },
            },
          ],
        },
      },
    },
  }

  it("isThirdPartyIDEnabled get set to be TRUE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(true)
  })

  it("Third Party Member ID show up as `Employee ID`", () => {
    const { thirdPartyIDLabel } = useTestKitDetails(data)

    expect(thirdPartyIDLabel).toBe("Employee ID")
  })
})

describe("When there is enterprise_client_id is NOT present on spree_order BUT Third Party ID is not enabled", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: null,
        enterprise_partner: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: false,
              third_party_id_order_enabled: false,
              third_party_id: {},
            },
          ],
        },
      },
    },
  }

  it("isThirdPartyIDEnabled get set to be FALSE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(false)
  })
})

describe("When there is enterprise_client_id is NOT present on spree_order AND Third Party ID is enabled by third_party_id_registration_enabled", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: null,
        enterprise_partner: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: false,
              third_party_id_order_enabled: true,
              third_party_id: {
                label: "Employee ID",
                regex_format: "^[a-z0-9]{8}$",
                client_specific: false,
              },
            },
          ],
        },
      },
    },
  }

  it("isThirdPartyIDEnabled get set to be TRUE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(true)
  })

  it("Third Party Member ID show up as `Employee ID`", () => {
    const { thirdPartyIDLabel } = useTestKitDetails(data)

    expect(thirdPartyIDLabel).toBe("Employee ID")
  })
})

describe("When there is enterprise_client_id is NOT present on spree_order AND Third Party ID is enabled by third_party_id_order_enabled", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client_id: null,
        enterprise_partner: {
          enterprise_partner_configs: [
            {
              third_party_id_registration_enabled: true,
              third_party_id_order_enabled: false,
              third_party_id: {
                label: "Employee ID",
                regex_format: "^[a-z0-9]{8}$",
                client_specific: false,
              },
            },
          ],
        },
      },
    },
  }

  it("isThirdPartyIDEnabled get set to be TRUE", () => {
    const { isThirdPartyIDEnabled } = useTestKitDetails(data)

    expect(isThirdPartyIDEnabled).toBe(true)
  })

  it("Third Party Member ID show up as `Employee ID`", () => {
    const { thirdPartyIDLabel } = useTestKitDetails(data)

    expect(thirdPartyIDLabel).toBe("Employee ID")
  })
})
