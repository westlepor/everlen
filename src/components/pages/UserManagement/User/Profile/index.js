import React, { useState } from "react"
import PropTypes from "prop-types"

import ShowProfile from "./Show"
import EditProfile from "./Edit"

const Profile = props => {
  const [isEditModeOn, toggleEditMode] = useState(false)

  const onEditProfileButtonClick = () => toggleEditMode(true)

  const onCalcelButtonClick = () => toggleEditMode(false)
  const onSaveProfileButtonClick = () => toggleEditMode(false)

  return isEditModeOn ? (
    <EditProfile
      {...props}
      onCalcelButtonClick={onCalcelButtonClick}
      onSaveProfileButtonClick={onSaveProfileButtonClick}
    />
  ) : (
    <ShowProfile
      {...props}
      onEditProfileButtonClick={onEditProfileButtonClick}
    />
  )
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  canManageAccessCodes: PropTypes.bool,
  canViewRapidTests: PropTypes.bool,
  canRegisterKits: PropTypes.bool,
}

Profile.defaultProps = {
  canManageAccessCodes: false,
  canViewRapidTests: false,
  canRegisterKits: false,
}

export default Profile
