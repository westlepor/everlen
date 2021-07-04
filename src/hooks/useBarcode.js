import { useLazyQuery } from "react-apollo"

import { queryOptions } from "utils/helper"

import GET_BARCODE_BY_SERIAL_NUMBER from "../queries/barcode/getBySerialNumber"

import { useHasuraClaims, useSuperAdmin } from "hooks"

const useBarcode = (user = {}, targetUser = {}, serial_number) => {
  const { enterprisePartnerId, enterpriseClientIds } = useHasuraClaims(user)

  const {
    isEverlywellSuperAdmin,
    targetPartnerId,
    targetClientIds,
  } = useSuperAdmin(user, targetUser)

  const partnerId = isEverlywellSuperAdmin
    ? targetPartnerId
    : enterprisePartnerId
  const clientIds = isEverlywellSuperAdmin
    ? targetClientIds
    : enterpriseClientIds

  return useLazyQuery(GET_BARCODE_BY_SERIAL_NUMBER, {
    ...queryOptions(user),
    variables: {
      serial_number,
      partner_id: partnerId,
      client_ids: clientIds,
      include_enterprise_partner: !!partnerId,
    },
  })
}

export default useBarcode
