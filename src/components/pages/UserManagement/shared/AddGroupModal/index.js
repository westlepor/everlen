import React from "react"
import { navigate } from "gatsby"
import { toast } from "react-toastify"

import { useCreateGroupMutation } from "hooks"

import { URL } from "utils/constants"

import Toast from "components/common/Toast"

import { GroupModal } from "../index"

import { updateCache } from "./utils"

import * as S from "./style"

const AddGroupModal = ({ open, setOpen }) => {
  const [createGroup, { loading }] = useCreateGroupMutation()

  const onToastClick = id => navigate(`${URL.userManagement}/groups/${id}`)

  const handleSubmit = payload => {
    createGroup({ variables: payload })
      .then(response => {
        const { errors, id, oktaId } = response?.data?.createOktaGroup || {}

        if (!!errors?.value) {
          throw new Error(errors?.value)
        }

        updateCache({ id, oktaId, payload })

        toast(
          <Toast
            onClick={() => onToastClick(id.value)}
            message={
              <S.Title>
                {`The group ${payload.name} was succesfully created.`}
              </S.Title>
            }
            description={
              <S.Description>
                Manage this group by searching their name below or{" "}
                <S.ToastLink>visiting the group profile now.</S.ToastLink>
              </S.Description>
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

  return (
    <GroupModal
      isOpen={open}
      setIsOpen={setOpen}
      handleSubmit={handleSubmit}
      loading={loading}
      title="Add Group"
      decription="Add groups so you can quickly perform actions across large sets of people."
      buttonName="Add Group"
    />
  )
}

export default AddGroupModal
