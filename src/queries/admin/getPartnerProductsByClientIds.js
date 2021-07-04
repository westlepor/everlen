import { gql } from "@apollo/client"

const GET_PARTNER_PRODUCTS_BY_CLIENT_IDS = gql`
  query PartnerProductsByIDs($client_ids: [bigint!]) {
    enterprise_partner_products(
      where: {
        lens_orderable: { _eq: true }
        enterprise_client_id: { _in: $client_ids }
      }
    ) {
      id
      enterprise_client_id
      spree_product {
        name
      }
    }
  }
`

export default GET_PARTNER_PRODUCTS_BY_CLIENT_IDS
