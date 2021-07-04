import React, { useState, useContext } from "react"

import { SessionContext } from "contexts/session"
import { CliaWaiverContext } from "contexts/cliaWaiver"

import { useHasuraClaims, useSuperAdmin } from "hooks"

import NavbarLinks from "../nav-bar-links"
import NavbarSettings from "../nav-bar-settings"

import * as S from "./styles"

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const { openModal, hasHCPEnteredCLIAWaiverNumber } = useContext(
    CliaWaiverContext
  )
  const { user, targetUser } = useContext(SessionContext)
  const { isHCPAdmin } = useHasuraClaims(user)
  const { isTargetUserHCPAdmin } = useSuperAdmin(user, targetUser)

  return (
    <S.Navigation>
      <S.NavConatiner>
        <S.Navbox open={navbarOpen}>
          <NavbarLinks openMobileNav={navbarOpen} />
        </S.Navbox>
        <S.Toggle
          navbarOpen={navbarOpen}
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <S.Hamburger open={navbarOpen} />
        </S.Toggle>

        {!navbarOpen && (
          <S.Navbox>
            {(isHCPAdmin || isTargetUserHCPAdmin) && (
              <S.CliaWaiverButton
                onClick={openModal}
                data-cy="change-clia-waiver"
              >
                {hasHCPEnteredCLIAWaiverNumber
                  ? "Change CLIA Waiver"
                  : "Enter CLIA Waiver"}
              </S.CliaWaiverButton>
            )}

            <NavbarSettings />
          </S.Navbox>
        )}
      </S.NavConatiner>
    </S.Navigation>
  )
}

export default Navbar
