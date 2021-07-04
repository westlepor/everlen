import React, { useContext } from "react"
import { navigate } from "gatsby"

import { useHasuraClaims, useSuperAdmin } from "hooks"
import CsvExporter from "components/molecules/kitStatus/header/CsvExporter"
import { SessionContext } from "contexts/session"
import { URL } from "utils/constants"
import * as S from "./style"

export default ({ title, isLoading }) => {
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const {
    isEverlywellSuperAdmin,
    hasTargetAccessToRegistrationPages
  } = useSuperAdmin(user, targetUser)
  const { hasAccessToRegistrationPages } = useHasuraClaims(user)

  const showRegisterKitPage = isEverlywellSuperAdmin
    ? hasTargetAccessToRegistrationPages
    : hasAccessToRegistrationPages

  return (
    <S.Root>
      <S.LeftSection>
        <S.Title>{title}</S.Title>
        {
          showRegisterKitPage &&
          <S.RegisterKitButton
            data-cy="register"
            Icon={S.AddIcon}
            label="Register Kit"
            onClick={() => navigate(URL.registerKit)}>
          </S.RegisterKitButton>
        }
      </S.LeftSection>
      <CsvExporter isLoading={isLoading} />
    </S.Root>
  )
}
