import React, { useState } from "react"
import Popup from "reactjs-popup"
import { toast } from "react-toastify"

import { useSuspendUserMutation } from "hooks"

import { displayError } from "components/molecules/common/popup/toast"
import Toast from "components/common/Toast"

import {
  SuspendUserModal,
  ResetPasswordModal,
  ResetMultifactorAuthenticationModal,
} from "../"

import { updateCache } from "./utils"

import * as S from "./style"

import ArrowUpIcon from "./ArrowUpIcon"
import ArrowDownIcon from "./ArrowDownIcon"

const UserActionsSelector = ({ oktaId, userName }) => {
  const [isResetPasswordModalOpen, toggleResetPasswordModal] = useState(false)
  const [isResetMultifactorModalOpen, toggleResetMultifactorModal] = useState(
    false
  )
  const [isSuspendUserModalOpen, toggleSuspendUserModal] = useState(false)

  const [
    suspendUser,
    { loading: isUserBeingSuspended },
  ] = useSuspendUserMutation()

  const onSuspendUserButtonClick = () => {
    suspendUser({ variables: { oktaId } })
      .then(({ data }) => {
        const { error, id, status } = data?.suspendOktaUser || {}

        if (!!error?.value) {
          throw new Error(error?.value)
        }

        updateCache({ id: id?.value, payload: { status: status?.value } })

        toast(
          <Toast
            type="warning"
            message={
              <S.Title>{`The user ${userName} has been suspended.`}</S.Title>
            }
            description={
              <S.Description>
                To reactive this user, click the activate button on the top
                right of the page.
              </S.Description>
            }
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "user-management-warning",
            autoClose: 40000,
          }
        )
      })
      .catch(error => {
        displayError("Unable to Suspend", error.message)
      })
      .finally(() => {
        toggleSuspendUserModal(false)
      })
  }

  const onSendButtonClick = ({ option }) => {
    console.log("Reset Password", option)
  }

  const onResetFactorsButtonClick = ({ isOktaVerifyChecked }) => {
    console.log("Reset Multifactor Authentication", isOktaVerifyChecked)
  }

  return (
    <div>
      <Popup
        offsetX={0}
        offsetY={0}
        trigger={open => (
          <S.DropdownTrigger isOpen={open}>
            <S.Text>User Actions</S.Text>

            <S.ArrowWrapper>
              {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </S.ArrowWrapper>
          </S.DropdownTrigger>
        )}
        position="bottom left"
        on={["click"]}
        arrow={false}
        contentStyle={{
          padding: 0,
          border: "none",
          width: "142px",
          boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {close => (
          <>
            <S.Option
              onClick={() => {
                toggleResetPasswordModal(true)
                close()
              }}
            >
              Reset Password
            </S.Option>

            <S.Option
              onClick={() => {
                toggleResetMultifactorModal(true)
                close()
              }}
            >
              Reset Multifactor
            </S.Option>

            <S.Option
              onClick={() => {
                toggleSuspendUserModal(true)
                close()
              }}
            >
              Suspend User
            </S.Option>
          </>
        )}
      </Popup>

      {isSuspendUserModalOpen && (
        <SuspendUserModal
          isOpen={isSuspendUserModalOpen}
          setOpenModal={toggleSuspendUserModal}
          userName={userName}
          loading={isUserBeingSuspended}
          onSuspendUserButtonClick={onSuspendUserButtonClick}
        />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          setOpenModal={toggleResetPasswordModal}
          userName={userName}
          onSendButtonClick={onSendButtonClick}
        />
      )}

      {isResetMultifactorModalOpen && (
        <ResetMultifactorAuthenticationModal
          isOpen={isResetMultifactorModalOpen}
          setOpenModal={toggleResetMultifactorModal}
          onResetFactorsButtonClick={onResetFactorsButtonClick}
        />
      )}
    </div>
  )
}

export default UserActionsSelector
