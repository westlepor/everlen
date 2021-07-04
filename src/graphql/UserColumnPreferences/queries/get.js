import { gql } from "@apollo/client"

import TEST_KIT_TABLE_CONFIG_FRAGMENT from "../fragments/testKitTableConfigFragment"

const GET_USER_COLUMN_PREFERENCE = gql`
  query UserColumnPreference($id: ID!) {
    findUserByID(id: $id) {
      test_kit_table_config {
        ...TestKitTableConfigFragment
      }
    }
  }

  ${TEST_KIT_TABLE_CONFIG_FRAGMENT}
`

export default GET_USER_COLUMN_PREFERENCE
