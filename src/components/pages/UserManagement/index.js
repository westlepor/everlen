import React from "react"
import { Router, Redirect, useMatch } from "@reach/router"
import { Row, Col } from "@everlywell/leaves"

import RestrictedRoute from "components/route/restrictedRoute"

import Groups from "./Groups"
import Users from "./Users"

import Group from "./Group"
import User from "./User"

import * as S from "./style"

const UserManagement = props => {
  const { uri } = props

  const groupsURL = `${uri}/groups`
  const usersURL = `${uri}/users`

  return (
    <S.Container>
      <Row>
        <Col md={3}>
          <S.Wrapper>
            <S.H4>User Management</S.H4>
            <S.SideBar>
              <S.MenuItem
                to={groupsURL}
                isActive={useMatch(`${groupsURL}/*`)}
                data-cy="user-mgr-groups"
              >
                Groups
              </S.MenuItem>
              <S.MenuItem
                to={usersURL}
                isActive={useMatch(`${usersURL}/*`)}
                data-cy="user-mgr-users"
              >
                Users
              </S.MenuItem>
            </S.SideBar>
          </S.Wrapper>
        </Col>

        <Col md={9}>
          <Router>
            <RestrictedRoute {...props} path="groups" component={Groups} />
            <RestrictedRoute {...props} path="users" component={Users} />
            <RestrictedRoute {...props} path="groups/:id" component={Group} />
            <RestrictedRoute {...props} path="users/:id/*" component={User} />
            <Redirect from="/" to="groups" noThrow />
          </Router>
        </Col>
      </Row>
    </S.Container>
  )
}

export default UserManagement
