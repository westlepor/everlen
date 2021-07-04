import React, { useState } from "react"
import { navigate } from "gatsby"
import { toast } from "react-toastify"

import { useDeleteGroupMutation, useUpdateGroupMutation } from "hooks"

import { URL } from "utils/constants"

import Toast from "components/common/Toast"

import { GroupModal, DeleteGroupModal } from "../"

import { updateCache } from "./utils"

import * as S from "./style"

const EditGroupModal = ({
  open,
  setOpen,
  id,
  partnerID,
  clientIDs,
  role,
  groupName,
  userCount,
}) => {
  const [updateGroup, { loading }] = useUpdateGroupMutation()
  const [isDeleteGroupModalOpen, toggleDeleteGroupModal] = useState(false)

  const [
    deleteGroup,
    { loading: isGroupBeingDeleted },
  ] = useDeleteGroupMutation()

  const handleSubmit = payload => {
    updateGroup({ variables: { id, ...payload } })
      .then(response => {
        const { id, errors } = response?.data?.updateOktaGroup || {}

        if (!!errors?.value) {
          throw new Error(errors?.value)
        }

        updateCache({ id: id.value, payload })

        toast(
          <Toast
            message={
              <S.Title>
                {`The group ${payload.name} was succesfully updated.`}
              </S.Title>
            }
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "user-management",
            autoClose: 40000,
          }
        )
      })
      .catch(error => console.log({ error }))
      .finally(() => setOpen(false))
  }

  const onDeleteGroupButtonClick = () => {
    if (userCount > 0) {
      toggleDeleteGroupModal(true)
      return
    }

    deleteGroup({ variables: { id } })
      .then(response => {
        const { error } = response?.data?.deleteOktaGroups || {}

        if (!!error?.value) {
          throw new Error(error?.value)
        }

        toast(
          <Toast
            message={
              <S.Title>{`${groupName} group has been deleted.`}</S.Title>
            }
            description={
              <S.Description>
                If this was a mistake or to undo your deletion, contact us.
              </S.Description>
            }
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "user-management",
            autoClose: 4000,
          }
        )
      })
      .catch(error => console.log({ error }))
      .finally(() => {
        setOpen(false)
        navigate(`${URL.userManagement}/groups`)
      })
  }

  return (
    <>
      <GroupModal
        isOpen={open}
        setIsOpen={setOpen}
        title="Edit Group"
        decription="Add groups so you can quickly perform actions across large sets of people."
        defaultPartnerID={partnerID}
        defaultClientIDs={clientIDs}
        defaultRole={role}
        defaultGroupName={groupName}
        loading={loading}
        buttonName="Save Group"
        handleSubmit={handleSubmit}
        isGroupBeingDeleted={isGroupBeingDeleted}
        deleteGroupButton={
          <S.DeleteGroupButton
            disabled={isGroupBeingDeleted}
            onClick={onDeleteGroupButtonClick}
          >
            {isGroupBeingDeleted ? <div className="loader" /> : "Delete Group"}
          </S.DeleteGroupButton>
        }
      />

      {isDeleteGroupModalOpen && (
        <DeleteGroupModal
          isOpen={isDeleteGroupModalOpen}
          setOpenModal={toggleDeleteGroupModal}
          groupName={groupName}
        />
      )}
    </>
  )
}

export default EditGroupModal
