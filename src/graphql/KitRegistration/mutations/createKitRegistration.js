import gql from "graphql-tag"

const CREATE_KIT_REGISTRATION = gql`
  mutation CreateKitRegistration(
    $kit_id: String!
    $third_party_member_id: String
    $email: String
    $first_name: String!
    $last_name: String!
    $phone: String
    $gender: String!
    $dob: String!
    $race: String!
    $ethnicity: String
    $is_pregnant: Boolean
    $symptoms_level: String
    $symptoms_start_date: String
    $exposure: String
    $first_COVID_test: String
    $employed_healthcare_setting: String
    $congregate_setting: String
    $comorbidities: String
    $current_ICU: String
    $currently_hospitalized: String
    $collected_at: timestamp
  ) {
    createKitRegistration(
      kit_id: $kit_id
      user: {
        third_party_member_id: $third_party_member_id
        email: $email
        firstname: $first_name
        lastname: $last_name
        phone: $phone
        gender: $gender
        dob: $dob
      }
      registration_data: {
        race: $race
        ethnicity: $ethnicity
        is_pregnant: $is_pregnant
        symptoms_level: $symptoms_level
        symptoms_start_date: $symptoms_start_date
        exposure: $exposure
        first_COVID_test: $first_COVID_test
        employed_healthcare_setting: $employed_healthcare_setting
        congregate_setting: $congregate_setting
        comorbidities: $comorbidities
        current_ICU: $current_ICU
        currently_hospitalized: $currently_hospitalized
        collected_at: $collected_at
      }
    ) {
      id
    }
  }
`

export default CREATE_KIT_REGISTRATION
