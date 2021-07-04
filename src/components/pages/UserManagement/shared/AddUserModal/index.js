import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

import { Options, GroupAutoSuggest } from ".."

import IconArrowRight from "components/atoms/icons/arrowRight2"

import { useOneUserByEmail, useAllGroups } from "hooks"

import { ERROR_CONTENT, EMAIL_REGEX } from "utils/constants"

import * as S from "./style"

const AddUserModal = ({ isOpen, setIsOpen, defaultGroupID }) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    clearErrors,
  } = useForm()

  const { data: groupsData } = useAllGroups()
  let groupItems = groupsData?.allUserGroups?.data || []

  const watchFields = watch()

  const [groupID, setGroupID] = useState(undefined)
  const [canManageAccessCodes, setCanManageAccessCodes] = useState(false)
  const [canViewRapidTests, setCanViewRapidTests] = useState(false)
  const [canRegisterKits, setCanRegisterKits] = useState(false)
  const [isAddAnother, setIsAddAnother] = useState(false)

  const trimmedEmail = watchFields.email ? watchFields.email.trim() : ""
  const { data } = useOneUserByEmail({ email: trimmedEmail })
  const identicalEmailUserID =
    trimmedEmail !== data?.getUserByEmail?.email
      ? undefined
      : data?.getUserByEmail?.id
  const [isValidEmail, setIsValidEmail] = useState(true)

  useEffect(() => {
    setGroupID(defaultGroupID)
  }, [defaultGroupID])

  const clearFields = _ => {
    clearErrors()
    setValue("firstName", "")
    setValue("lastName", "")
    setValue("email", "")
    if (defaultGroupID) {
      setGroupID(defaultGroupID)
    } else {
      setGroupID(undefined)
    }
    setCanManageAccessCodes(false)
    setCanViewRapidTests(false)
    setCanRegisterKits(false)

    setIsAddAnother(false)
  }

  const onSubmit = data => {
    if (!EMAIL_REGEX.test(data.email)) {
      setIsValidEmail(false)
      return
    }

    const group = groupItems.find(g => g.id === groupID)

    let result = {
      ...data,
      groupId: group?.okta_id,
      canManageAccessCodes,
      canViewRapidTests,
      canRegisterKits,
    }

    console.log(result)

    document.getElementById("userModal").childNodes[1].scrollTop = 0
    const firstNameElement = document.getElementById("firstName")
    firstNameElement && firstNameElement.focus()
    setTimeout(_ => {
      firstNameElement && firstNameElement.focus()
    }, 100)

    if (!isAddAnother) {
      handleModalOpen(false)
    } else {
      clearFields()
    }
  }

  const handleModalOpen = open => {
    if (!open) {
      clearFields()
    }
    setIsOpen(open)
  }

  return (
    <S.Modal
      open={isOpen}
      openHandler={handleModalOpen}
      className="user-modal"
      id="userModal"
    >
      <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Add User</S.Title>

        <S.FieldOption>
          <S.Input
            name="firstName"
            id="firstName"
            label="First Name"
            placeholder="First Name"
            ref={register({
              required: "Please enter a valid name",
            })}
            error={errors?.firstName?.message}
            data-lpignore="true"
          />
        </S.FieldOption>

        <S.Field>
          <S.Input
            name="lastName"
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            ref={register({
              required: "Please enter a valid name",
            })}
            error={errors?.lastName?.message}
            data-lpignore="true"
          />
        </S.Field>

        <S.Field>
          <S.Input
            name="email"
            id="email"
            label="Email"
            placeholder="Email"
            ref={register({
              required: "Please enter a valid email",
            })}
            error={errors?.email?.message}
            data-lpignore="true"
            onChange={_ => setIsValidEmail(true)}
            isError={!!identicalEmailUserID || !isValidEmail}
          />
        </S.Field>

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

        <GroupAutoSuggest
          label="Group"
          selectedID={groupID}
          setSelectedID={setGroupID}
        />

        <S.FieldOption>
          <Options
            label="User can manage access codes"
            id="canManageAccessCodes"
            options={[
              { name: "yes", label: "Yes" },
              { name: "no", label: "No" },
            ]}
            defaultSelectedOption={canManageAccessCodes ? "yes" : "no"}
            onChange={option => setCanManageAccessCodes(option === "yes")}
          />
        </S.FieldOption>

        <S.FieldOption>
          <Options
            label="User can view rapid tests"
            id="canViewRapidTests"
            options={[
              { name: "yes", label: "Yes" },
              { name: "no", label: "No" },
            ]}
            defaultSelectedOption={canViewRapidTests ? "yes" : "no"}
            onChange={option => setCanViewRapidTests(option === "yes")}
          />
        </S.FieldOption>

        <S.FieldOption>
          <Options
            label="User can register kits"
            id="canRegisterKits"
            options={[
              { name: "yes", label: "Yes" },
              { name: "no", label: "No" },
            ]}
            defaultSelectedOption={canRegisterKits ? "yes" : "no"}
            onChange={option => setCanRegisterKits(option === "yes")}
          />
        </S.FieldOption>

        <S.Buttons>
          <S.Checkbox
            label="Add another"
            onChange={_ => setIsAddAnother(!isAddAnother)}
            checked={isAddAnother}
            name="isAddAnother"
          />

          <S.SaveUserButton
            type="submit"
            disabled={
              !watchFields.firstName ||
              !watchFields.lastName ||
              !watchFields.email ||
              !groupID ||
              !!identicalEmailUserID
            }
          >
            Add User
          </S.SaveUserButton>
        </S.Buttons>
      </S.Wrapper>
    </S.Modal>
  )
}

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  defaultGroupID: PropTypes.string,
}

AddUserModal.defaultProps = {
  isOpen: false,
  defaultGroupID: undefined,
}

export default AddUserModal
