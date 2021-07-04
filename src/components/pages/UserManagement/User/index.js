import React from "react"
import { Router, Redirect, useMatch } from "@reach/router"

import RestrictedRoute from "components/route/restrictedRoute"

import { useOneUser } from "hooks"

import { USER_LOGS, STATUSES } from "../constants"

import { Tabs, UserActionsSelector, UserLogsTable } from "../shared"

import Profile from "./Profile"
import Groups from "./Groups"

import * as S from "../style"

const UserLogs = () => {
  return <UserLogsTable rows={USER_LOGS} />
}

const User = props => {
  const { id, uri } = props

  const groupsURL = `${uri}/groups`
  const profileURL = `${uri}/profile`
  const userLogsURL = `${uri}/user-logs`

  const { data } = useOneUser({ id })
  const user = data?.findUserByID || {}

  const statusValue = user?.status?.toLowerCase()
  const status = STATUSES[statusValue]?.name || user?.status

  return (
    <S.Wrapper>
      <S.Link to="/app/user-management/users">{`< Back to Users`}</S.Link>

      <S.TitleButtonWrapper>
        <S.Title>{user.full_name}</S.Title>

        <UserActionsSelector oktaId={user.oktaId} userName={user.full_name} />
      </S.TitleButtonWrapper>

      <S.Description>
        <S.Details>
          <S.Text>Email:</S.Text>
          <S.BoldText>{user.email}</S.BoldText>
        </S.Details>

        <S.Details>
          <S.Text>Status:</S.Text>
          <S.BoldText>{status}</S.BoldText>
        </S.Details>
      </S.Description>

      <Tabs
        tabs={[
          { title: "Groups", to: groupsURL, isActive: !!useMatch(groupsURL) },
          {
            title: "Profile",
            to: profileURL,
            isActive: !!useMatch(profileURL),
          },
          {
            title: "User Logs",
            to: userLogsURL,
            isActive: !!useMatch(userLogsURL),
          },
        ]}
      />

      <Router>
        <RestrictedRoute
          {...props}
          user={user}
          path="groups"
          component={Groups}
        />

        <RestrictedRoute
          {...props}
          {...user}
          path="profile"
          component={Profile}
        />

        <RestrictedRoute {...props} path="user-logs" component={UserLogs} />

        <Redirect from="/" to="groups" noThrow />
      </Router>
    </S.Wrapper>
  )
}

export default User
