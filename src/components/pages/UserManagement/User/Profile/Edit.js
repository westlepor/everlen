import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import PropTypes from "prop-types"

import IconArrowRight from "components/atoms/icons/arrowRight2"

import { useOneUserByEmail } from "hooks"

import { ERROR_CONTENT, EMAIL_REGEX } from "utils/constants"

import * as S from "./style"

const EditProfile = ({
  firstName,
  lastName,
  email,
  canManageAccessCodes,
  canViewRapidTests,
  canRegisterKits,
  onCalcelButtonClick,
  onSaveProfileButtonClick,
}) => {
  const initialData = {
    firstName,
    lastName,
    email,
    canManageAccessCodes,
    canViewRapidTests,
    canRegisterKits,
  }

  const [formData, updateFormData] = useState(initialData)

  const trimmedEmail = formData.email.trim()
  const { data } = useOneUserByEmail({ email: trimmedEmail })
  const identicalEmailUserID =
    email === trimmedEmail || trimmedEmail !== data?.getUserByEmail?.email
      ? undefined
      : data?.getUserByEmail?.id
  const [isValidEmail, setIsValidEmail] = useState(true)

  const isSaveButtonDisabled =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    (firstName === formData.firstName &&
      lastName === formData.lastName &&
      email === formData.email &&
      canManageAccessCodes === formData.canManageAccessCodes &&
      canRegisterKits === formData.canRegisterKits &&
      canViewRapidTests === formData.canViewRapidTests) ||
    !!identicalEmailUserID

  useEffect(
    _ => {
      updateFormData({
        firstName,
        lastName,
        email,
        canManageAccessCodes,
        canViewRapidTests,
        canRegisterKits,
      })
    },
    [
      firstName,
      lastName,
      email,
      canManageAccessCodes,
      canViewRapidTests,
      canRegisterKits,
    ]
  )

  const handleSaveButtonClick = () => {
    if (!EMAIL_REGEX.test(formData.email)) {
      setIsValidEmail(false)
      return
    }

    const hasDataChanged =
      JSON.stringify(initialData) !== JSON.stringify(formData)

    if (hasDataChanged) {
      console.log("TODO: submit update mutation")
    }

    console.log({ formData })

    onSaveProfileButtonClick()
  }

  const handleInputChange = ({ target: { name, value } }) =>
    updateFormData(prev => ({ ...prev, [name]: value }))

  const handleRadioButtonChange = ({ target: { name, id } }) =>
    updateFormData(prev => ({ ...prev, [name]: id === `${name}-Yes` }))

  return (
    <S.Wrapper>
      <S.ButtonWrapper>
        <S.CancelButton onClick={onCalcelButtonClick}>Cancel</S.CancelButton>

        <S.SaveProfileButton
          onClick={handleSaveButtonClick}
          disabled={isSaveButtonDisabled}
        >
          Save Profile
        </S.SaveProfileButton>
      </S.ButtonWrapper>

      <S.InputWrapper>
        <S.Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={e => {
            setIsValidEmail(true)
            handleInputChange(e)
          }}
          isError={!!identicalEmailUserID || !isValidEmail}
        />
      </S.InputWrapper>

      {!!identicalEmailUserID && (
        <S.WarningWrapper>
          <S.WarningBody>
            This email is already connected to a user.
          </S.WarningBody>
          <S.WarningLinkWrapper
            onClick={e => {
              navigate(
                `/app/user-management/users/${identicalEmailUserID}/groups`
              )
              e.preventDefault()
            }}
          >
            <S.WarningLink>View user</S.WarningLink>
            <IconArrowRight />
          </S.WarningLinkWrapper>
        </S.WarningWrapper>
      )}

      {!isValidEmail && (
        <S.WarningWrapper>
          <S.InvalidEmail>{ERROR_CONTENT.INVALID_EMAIL}</S.InvalidEmail>
        </S.WarningWrapper>
      )}

      <S.RadioGroupWrapper>
        <S.RadioGroupLabel>User can manage access codes</S.RadioGroupLabel>

        <S.RadioButton
          label="Yes"
          id="canManageAccessCodes-Yes"
          name="canManageAccessCodes"
          onChange={handleRadioButtonChange}
          value={!!formData.canManageAccessCodes}
          checked={!!formData.canManageAccessCodes}
        />

        <S.RadioButton
          label="No"
          id="canManageAccessCodes-No"
          name="canManageAccessCodes"
          onChange={handleRadioButtonChange}
          checked={!formData.canManageAccessCodes}
          value={!formData.canManageAccessCodes}
        />
      </S.RadioGroupWrapper>

      <S.RadioGroupWrapper>
        <S.RadioGroupLabel>User can view rapid tests</S.RadioGroupLabel>

        <S.RadioButton
          label="Yes"
          id="canViewRapidTests-Yes"
          name="canViewRapidTests"
          onChange={handleRadioButtonChange}
          value={!!formData.canViewRapidTests}
          checked={!!formData.canViewRapidTests}
        />

        <S.RadioButton
          label="No"
          id="canViewRapidTests-No"
          name="canViewRapidTests"
          onChange={handleRadioButtonChange}
          checked={!formData.canViewRapidTests}
          value={!formData.canViewRapidTests}
        />
      </S.RadioGroupWrapper>

      <S.RadioGroupWrapper>
        <S.RadioGroupLabel>User can register kits</S.RadioGroupLabel>

        <S.RadioButton
          label="Yes"
          id="canRegisterKits-Yes"
          name="canRegisterKits"
          onChange={handleRadioButtonChange}
          checked={!!formData.canRegisterKits}
          value={!!formData.canRegisterKits}
        />

        <S.RadioButton
          label="No"
          id="canRegisterKits-No"
          name="canRegisterKits"
          onChange={handleRadioButtonChange}
          checked={!formData.canRegisterKits}
          value={!formData.canRegisterKits}
        />
      </S.RadioGroupWrapper>
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
