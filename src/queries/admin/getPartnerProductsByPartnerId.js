import { gql } from "@apollo/client"

const GET_PARTNER_PRODUCTS_BY_PARTNER_ID = gql`
  query PartnerProductsByPartner($partner_id: bigint) {
    enterprise_partner_products(
      where: {
        lens_orderable: { _eq: true }
        enterprise_partner_id: { _eq: $partner_id }
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

export default GET_PARTNER_PRODUCTS_BY_PARTNER_ID
