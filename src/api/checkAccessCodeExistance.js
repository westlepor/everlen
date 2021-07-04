import axios from "axios"

const checkAccessCodeExistance = (code, callback) => {
  return axios
    .post(process.env.GATSBY_ACCESS_CODE_EXISTENCE_CHECKER_ENDPOINT, { code })
    .then(response => {
      callback(response?.status)
    })
    .catch(error => {
      callback(error?.response?.status)
    })
}

export default checkAccessCodeExistance
