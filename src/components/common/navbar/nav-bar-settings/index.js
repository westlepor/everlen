import React, { useRef, useState, useEffect, useContext } from "react"
import { StreamApp, NotificationDropdown } from "react-activity-feed"
import { navigate } from "gatsby"

import { isBrowser } from "utils/environment"
import { DEFAULT_REDIRECT, SUPPORT_PDF_URL } from "utils/constants"
import { URL } from "utils/constants"

import { SessionContext, AnonymousUser } from "contexts/session"

import { logout } from "components/auth/login"

import NotificationGroup from "components/molecules/notifications/group"
import Header from "components/molecules/notifications/header"

import SupportIcon from "components/atoms/icons/support"
import ProfileIcon from "components/atoms/icons/profile"
import IconLogout from "components/atoms/icons/logout"

import "./styles/notifications.css"

import * as S from "./styles"

import NotificationIconBadge from "./NotificationIconBadge"

import { useSuperAdmin, useHasuraClaims } from "hooks"

const NavbarSettings = () => {
  const wrapperRef = useRef(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const {
    isEverlywellSuperAdmin,
    isTargetUserHCPAdmin,
    targetRole,
  } = useSuperAdmin(user, targetUser)
  const { isHCPAdmin } = useHasuraClaims(user)

  const lastUrlItem =
    isBrowser && window.location.pathname.split("/").slice(-1)[0]

  const handleLogOut = event => {
    event.preventDefault()

    logout(() => {
      session.setUser(AnonymousUser)
      navigate(DEFAULT_REDIRECT)
    })
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
    }
  })

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSettingsOpen(false)
    }
  }

  return user.isLoggedIn ? (
    <>
      {targetUser.getstream_token ? (
        <StreamApp
          apiKey={process.env.GATSBY_STREAM_ACCESS_KEY}
          appId={process.env.GATSBY_STREAM_APP_ID}
          token={targetUser.getstream_token}
        >
          <S.NavSettingMasquerade>
            <NotificationDropdown
              notify
              Icon={NotificationIconBadge}
              Group={NotificationGroup}
              Header={Header}
            />
          </S.NavSettingMasquerade>
        </StreamApp>
      ) : isEverlywellSuperAdmin && !targetRole ? (
        <></>
      ) : (
        user?.idToken?.claims?.streamToken && (
          <StreamApp
            apiKey={process.env.GATSBY_STREAM_ACCESS_KEY}
            appId={process.env.GATSBY_STREAM_APP_ID}
            token={user.idToken.claims.streamToken}
          >
            <S.NavSetting>
              <NotificationDropdown
                notify
                Icon={NotificationIconBadge}
                Group={NotificationGroup}
                Header={Header}
              />
            </S.NavSetting>
          </StreamApp>
        )
      )}

      {(isHCPAdmin || isTargetUserHCPAdmin) && (
        <S.NavSetting
          onClick={() => window.open(SUPPORT_PDF_URL, "_blank")}
          data-cy="support-pdf-icon"
        >
          <S.SettingContainer>
            <S.SupportIconWrapper>
              <SupportIcon />
            </S.SupportIconWrapper>
          </S.SettingContainer>
        </S.NavSetting>
      )}

      <S.NavSettingProfile
        data-cy="navbar-profile"
        onClick={() => setSettingsOpen(!settingsOpen)}
        ref={wrapperRef}
      >
        <S.SettingContainer>
          <S.ImageView>
            <ProfileIcon />
          </S.ImageView>

          <S.NavSettingName>{user.name.split(" ")[0]}</S.NavSettingName>
        </S.SettingContainer>

        <S.UserSettings open={settingsOpen ? true : false}>
          <S.SettingsItemSettings data-cy="navbar-profile-dropdown">
            <S.StyledUserName>{user.name}</S.StyledUserName>

            <S.StyledUserEmail>{user.email}</S.StyledUserEmail>

            <S.StyledSettingsBtn
              appearance="secondary"
              onClick={() => navigate(URL.settings)}
            >
              Settings
            </S.StyledSettingsBtn>
          </S.SettingsItemSettings>

          <S.SettingsItemLogOut onClick={handleLogOut}>
            <S.Icon>
              <IconLogout />
            </S.Icon>
            Log Out
          </S.SettingsItemLogOut>
        </S.UserSettings>
      </S.NavSettingProfile>
    </>
  ) : (
    <S.NavItem to={URL.login} active={lastUrlItem === "login" ? 1 : 0}>
      <S.NavLinkName>Log in</S.NavLinkName>
    </S.NavItem>
  )
}

export default NavbarSettings
