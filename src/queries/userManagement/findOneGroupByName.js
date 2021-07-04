import { gql } from "@apollo/client"

const FIND_ONE_GROUP_BY_NAME = gql`
  query FindUserGroupByName($name: String!) {
    findUserGroupByName(name: $name) {
      id: _id
    }
  }
`

export default FIND_ONE_GROUP_BY_NAME
