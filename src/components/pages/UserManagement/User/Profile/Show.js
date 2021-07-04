import React from "react"
import PropTypes from "prop-types"

import { TertiaryButton } from "../../shared"

import * as S from "./style"

const EditProfile = ({
  firstName,
  lastName,
  email,
  canManageAccessCodes,
  canViewRapidTests,
  canRegisterKits,
  onEditProfileButtonClick,
}) => {
  return (
    <S.Wrapper>
      <S.ButtonWrapper>
        <TertiaryButton onClick={onEditProfileButtonClick}>
          Edit Profile
        </TertiaryButton>
      </S.ButtonWrapper>

      <S.Details>
        <S.Label>First Name</S.Label>
        <S.Value>{firstName}</S.Value>
      </S.Details>

      <S.Details>
        <S.Label>Last Name</S.Label>
        <S.Value>{lastName}</S.Value>
      </S.Details>

      <S.Details>
        <S.Label>Email</S.Label>
        <S.Value>{email}</S.Value>
      </S.Details>

      <S.Details>
        <S.Label>User can manage access codes</S.Label>
        <S.Value>{canManageAccessCodes ? "Yes" : "No"}</S.Value>
      </S.Details>

      <S.Details>
        <S.Label>User can view rapid tests</S.Label>
        <S.Value>{canViewRapidTests ? "Yes" : "No"}</S.Value>
      </S.Details>

      <S.Details>
        <S.Label>User can register kits</S.Label>
        <S.Value>{canRegisterKits ? "Yes" : "No"}</S.Value>
      </S.Details>
    </S.Wrapper>
  )
}

EditProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  canManageAccessCodes: PropTypes.bool,
  canViewRapidTests: PropTypes.bool,
  canRegisterKits: PropTypes.bool,
}

EditProfile.defaultProps = {
  canManageAccessCodes: false,
  canViewRapidTests: false,
  canRegisterKits: false,
}

export default EditProfile
