import React, { useContext } from "react"

import { SessionContext } from "contexts/session"

import { useHasuraClaims } from "hooks"

import NotifyRow from "components/molecules/settings/notifications/notifyRow"

import Switch from "components/atoms/settings/userDigestSwitch"
import Toggle from "components/atoms/common/toggle"

import * as S from "./styles"

const UserProfile = () => {
  const { user } = useContext(SessionContext)
  const { faunaId } = useHasuraClaims(user)

  return (
    <S.Container>
      <S.Row>
        <S.Title>Test Kit Overview</S.Title>
      </S.Row>

      <NotifyRow
        switchComponent={
          !!faunaId ? (
            <Switch />
          ) : (
            <Toggle width={64} height={32} isChecked={false} isDisabled />
          )
        }
        label="Email me a summary of the prior day’s results, sample issues and kit status"
        desc="Email will be sent at 7:00am CST for the prior day's activity."
      />
    </S.Container>
  )
}

export default UserProfile
