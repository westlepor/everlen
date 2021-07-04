import { gql } from "@apollo/client"

const filterOnRapidTestId = ({ rapidTestId }) => {
  return `test_id: {_eq: ${rapidTestId}}`
}

const makeParams = clients => {
  let params = ""
  clients.forEach(c => {
    params += `
      $client${c.id}: Int`
  })

  return params
}

const makeNoneParams = () => {
  return `
    $none: Int`
}

const makeLines = (clients, superAdminWhereClause, isHCPAdmin, rapidTestId) => {
  let lines = ""

  clients.forEach(c => {
    lines += `
      client${c.id}: kit_results_aggregate(
        where: {
          ${isHCPAdmin ? filterOnRapidTestId({ rapidTestId }) : ""}

           barcode: {
             spree_order: {
               enterprise_client_id: {
                 _eq: $client${c.id}
                }
                ${superAdminWhereClause}
              }
            }
          }) {
        aggregate {
          count
        }
      }`
  })

  return lines
}

const makeNoneLines = (
  superAdminWhereClause,
  isEverlywellSuperAdmin,
  isHCPAdmin,
  rapidTestId
) => {
  return `
    none: kit_results_aggregate(
      where: {
        ${isHCPAdmin ? filterOnRapidTestId({ rapidTestId }) : ""}
        
        barcode: {
          spree_order: {
            enterprise_client_id: {
              ${
                superAdminWhereClause || !isEverlywellSuperAdmin
                  ? "_is_null: true"
                  : "_eq: -1"
              }
            }
        ${superAdminWhereClause}}}
      }
    ) {
      aggregate {
        count
      }
    }`
}

const makeSuperAdminWhereClause = ({
  isEnterprisePartnerClinicalAdmin,
  isEverlywellSuperAdmin,
  enterprisePartnerId,
  targetPartnerId,
}) => {
  if (isEnterprisePartnerClinicalAdmin && enterprisePartnerId) {
    return `, enterprise_partner_id:{_eq:$partner_id}`
  } else if (isEverlywellSuperAdmin && targetPartnerId) {
    return `, enterprise_partner_id:{_eq:$partner_id}`
  } else {
    return ""
  }
}

const makeSuperAdminParams = ({
  isEnterprisePartnerClinicalAdmin,
  isEverlywellSuperAdmin,
  enterprisePartnerId,
  targetPartnerId,
}) => {
  if (
    (isEnterprisePartnerClinicalAdmin && enterprisePartnerId) ||
    (isEverlywellSuperAdmin && targetPartnerId)
  ) {
    return "$partner_id: Int"
  } else {
    return ""
  }
}

const query = ({
  clients,
  isEnterprisePartnerClinicalAdmin,
  isEverlywellSuperAdmin,
  enterprisePartnerId,
  targetPartnerId,
  isHCPAdmin,
  rapidTestId,
}) => {
  if (clients && clients.length > 0) {
    const superAdminWhereClause = makeSuperAdminWhereClause({
      isEnterprisePartnerClinicalAdmin,
      isEverlywellSuperAdmin,
      enterprisePartnerId,
      targetPartnerId,
    })
    return gql`
      query MyQuery(
        ${makeParams(clients)}
        ${makeNoneParams()}
        ${makeSuperAdminParams({
          isEnterprisePartnerClinicalAdmin,
          isEverlywellSuperAdmin,
          enterprisePartnerId,
          targetPartnerId,
        })}
      ) {
        ${makeLines(clients, superAdminWhereClause, isHCPAdmin, rapidTestId)}
        ${makeNoneLines(
          superAdminWhereClause,
          isEverlywellSuperAdmin,
          isHCPAdmin,
          rapidTestId
        )}
      }
    `
  }

  return null
}

export default query
