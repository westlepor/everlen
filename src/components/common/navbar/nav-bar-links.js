import React, { useContext } from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"
import { useMatch } from "@reach/router"

import { H5, colors } from "@everlywell/leaves"

import { SessionContext, AnonymousUser } from "contexts/session"

import { useHasuraClaims, useSuperAdmin } from "hooks"

import { logout } from "components/auth/login"

import Logo from "components/atoms/icons/logo"
import { isBrowser } from "utils/environment"
import { DEFAULT_REDIRECT, URL } from "utils/constants"

const NavHead = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${colors.teal6};
  margin: auto 3rem auto 0;
  position: relative;
`

const NavItem = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${colors.teal6};
  margin-right: 3rem;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: ${props => (props.active === 1 ? "100%" : "0%")};
    content: ".";
    color: transparent;
    background: ${props => (!!props.isadmin ? "#c6394c" : colors.teal6)};
    height: 4px;
  }

  :hover {
    color: ${props => (!!props.isadmin ? "#c6394c" : colors.teal6)};
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    margin: unset;
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`

const NavName = styled(H5)`
  font-size: 16px;
  color: ${colors.green4};
  margin: auto 0;
`

const NavLogOut = styled.div`
  display: flex;
  text-decoration: none;
  color: ${colors.teal6};
  margin-right: 2rem;
  position: relative;

  @media (max-width: 768px) {
    margin: unset;
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`

const getLastUrlItem = () =>
  isBrowser && window.location.pathname.split("/").slice(-1)[0]

const DesktopNav = () => {
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const { hasAccessToAdministrationPages } = useHasuraClaims(user)
  const {
    isMasqueradeMode,
    isEverlywellSuperAdmin,
    isUserManagementFeatureOn,
    hasTargetAccessToAdministrationPages,
  } = useSuperAdmin(user, targetUser)
  const showAdminPage = isEverlywellSuperAdmin
    ? hasTargetAccessToAdministrationPages
    : hasAccessToAdministrationPages

  const lastUrlItem = getLastUrlItem()

  const isAdministrateTabActive =
    useMatch(URL.editAccessCode) ||
    ["access_codes", "create-access-code"].includes(lastUrlItem)

  const isUserManagementTabActive = useMatch(`${URL.userManagement}/*`)

  return (
    <>
      <NavHead to={URL.kitStatus}>
        <Logo />
      </NavHead>

      <NavItem to={URL.kitStatus} active={lastUrlItem === "kit_status" ? 1 : 0}>
        <NavName>Test Kits</NavName>
      </NavItem>

      {showAdminPage && (
        <NavItem
          to={URL.accessCode}
          active={isAdministrateTabActive ? 1 : 0}
          isadmin="true"
          data-cy="admin"
        >
          <NavName>Administration</NavName>
        </NavItem>
      )}

      {!isUserManagementFeatureOn &&
        isEverlywellSuperAdmin &&
        !isMasqueradeMode && (
          <NavItem
            to={URL.userManagement}
            active={isUserManagementTabActive ? 1 : 0}
          >
            <NavName>User Management</NavName>
          </NavItem>
        )}
    </>
  )
}

const MobileNav = () => {
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const { hasAccessToAdministrationPages } = useHasuraClaims(user)
  const {
    isUserManagementFeatureOn,
    isEverlywellSuperAdmin,
    isMasqueradeMode,
  } = useSuperAdmin(user, targetUser)
  const lastUrlItem = getLastUrlItem()

  const isAdministrateTabActive =
    useMatch(URL.editAccessCode) ||
    ["access_codes", "create-access-code"].includes(lastUrlItem)

  const isUserManagementTabActive = useMatch(URL.userManagement)

  const handleLogOut = event => {
    event.preventDefault()
    logout(() => {
      session.setUser(AnonymousUser)
      navigate(DEFAULT_REDIRECT)
    })
  }

  return (
    <>
      <NavItem to={URL.kitStatus} active={lastUrlItem === "kit_status" ? 1 : 0}>
        <NavName>Test Kits</NavName>
      </NavItem>

      {hasAccessToAdministrationPages && (
        <NavItem
          to={URL.accessCode}
          active={isAdministrateTabActive ? 1 : 0}
          admin
        >
          <NavName>Administration</NavName>
        </NavItem>
      )}

      {!isUserManagementFeatureOn &&
        isEverlywellSuperAdmin &&
        !isMasqueradeMode && (
          <NavItem
            to={URL.userManagement}
            active={isUserManagementTabActive ? 1 : 0}
          >
            <NavName>User Management</NavName>
          </NavItem>
        )}

      {user.isLoggedIn && (
        <>
          <NavItem
            to={URL.settings}
            active={lastUrlItem === "settings" ? 1 : 0}
          >
            <NavName>Profile</NavName>
          </NavItem>

          <NavLogOut onClick={handleLogOut}>
            <NavName>Log out</NavName>
          </NavLogOut>
        </>
      )}
    </>
  )
}

const NavbarLinks = ({ openMobileNav }) => {
  return !openMobileNav ? <DesktopNav /> : <MobileNav />
}

export default NavbarLinks
