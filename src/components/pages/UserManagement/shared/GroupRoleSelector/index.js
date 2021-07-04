import React, { useState } from "react"

import Popup from "reactjs-popup"

import {
  ROLE_MAPPING,
  CLIENT_ROLE_MAPPING,
  PARTNER_ROLE_MAPPING,
  SUPER_ADMIN_ROLE,
  SUPER_ADMIN_ROLE_LABEL,
} from "../../constants"

import * as S from "./style"

export default ({ isPartner, isClient, role, setRole }) => {
  const [open, setOpen] = useState(false)

  let roles = ROLE_MAPPING
  if (isPartner && isClient) {
    roles = CLIENT_ROLE_MAPPING
  } else if (isPartner) {
    roles = PARTNER_ROLE_MAPPING
  }

  const handleKeyDown = e => {
    if (e.key === "Tab") {
      return
    }
    if (e.key === "Enter") {
      setOpen(true)
    } else if (e.key === "ArrowDown") {
      if (!open) {
        setOpen(true)
      } else {
        const firstRoleItem = document.getElementById("roleItem0")
        if (firstRoleItem) {
          firstRoleItem.focus()
        }
      }
    } else if (e.key === "ArrowUp") {
      if (open) {
        const lastRoleItem = document.getElementById(
          `roleItem${Object.keys(roles).length - 1}`
        )
        if (lastRoleItem) {
          lastRoleItem.focus()
        }
      }
    }
    e.preventDefault()
  }

  const handleMenuKeyDown = e => {
    e.preventDefault()
    if (e.key === "Enter") {
      setOpen(false)
      setRole(e.target.getAttribute("data-id"))
    }
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      if (document.activeElement.nextElementSibling) {
        document.activeElement.nextElementSibling.focus()
      } else {
        document.getElementById("roleLabel").focus()
      }
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      if (document.activeElement.previousElementSibling) {
        document.activeElement.previousElementSibling.focus()
      } else {
        document.getElementById("roleLabel").focus()
      }
    }
  }

  const label = !role
    ? "Select role"
    : role === SUPER_ADMIN_ROLE
    ? SUPER_ADMIN_ROLE_LABEL
    : roles[role]

  if (role === SUPER_ADMIN_ROLE) {
    return (
      <div>
        <S.Field>Role</S.Field>
        <S.Container tabIndex="0" id="roleLabel" disabled>
          <S.Label disabled>{label}</S.Label>
        </S.Container>
      </div>
    )
  }

  return (
    <Popup
      open={open}
      trigger={() => (
        <div>
          <S.Field open={open}>Role</S.Field>
          <S.Container
            open={open}
            tabIndex="0"
            onKeyDown={handleKeyDown}
            id="roleLabel"
          >
            <S.Label disabled={!role}>{label}</S.Label>
            {!open && <S.IconArrowDown />}
            {open && <S.IconArrowUp />}
          </S.Container>
        </div>
      )}
      on={["click"]}
      contentStyle={{
        width: "100%",
        margin: "2px 0 0",
        padding: "0",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      arrow={false}
      closeOnDocumentClick
    >
      {close => (
        <>
          {Object.keys(roles).map((key, index) => (
            <S.MenuItem
              key={key}
              onClick={() => {
                close()
                setRole(key)
              }}
              tabIndex="0"
              onKeyDown={handleMenuKeyDown}
              id={`roleItem${index}`}
              data-id={key}
            >
              {roles[key]}
            </S.MenuItem>
          ))}
        </>
      )}
    </Popup>
  )
}
