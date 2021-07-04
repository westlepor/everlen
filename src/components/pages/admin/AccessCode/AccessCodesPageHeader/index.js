import React from "react"
import { Link } from "gatsby"

import ViewParticipantOptInSideSelector from "./ViewParticipantOptInSideSelector"

import * as S from "./style"

const AccessCodesPageHeader = ({ user, targetUser }) => {
  return (
    <S.OuterWrapper>
      <S.InnerWrapper>
        <S.Title>Access Codes</S.Title>
        <Link to="/app/create-access-code">
          <S.StyledButton appearance="primary" data-cy="create-access-code">
            Create Access Code
          </S.StyledButton>
        </Link>
      </S.InnerWrapper>

      <ViewParticipantOptInSideSelector user={user} targetUser={targetUser} />
    </S.OuterWrapper>
  )
}

export default AccessCodesPageHeader
