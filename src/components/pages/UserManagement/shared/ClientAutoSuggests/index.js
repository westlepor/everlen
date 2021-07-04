import React from "react"

import { ClientAutoSuggest } from "../"

import { PARTNER_ROLE_MAPPING } from "../../constants"

import * as S from "./style"

const ClientAutoSuggests = ({
  addingClient,
  setAddingClient,
  currentClientID,
  setCurrentClientID,
  clientIDs,
  setClientIDs,
  role,
  setRole,
  changeGroupName,
  partnerID,
  setIdenticalGroupID,
}) => {
  const changeClientID = (id, oldID) => {
    if (role && PARTNER_ROLE_MAPPING[role]) {
      setRole()
    }

    let newClientIDs = []
    if (id) {
      clientIDs.push(id)
    } else {
      const index = clientIDs.findIndex(c => c === oldID)
      clientIDs.splice(index, 1)
    }

    newClientIDs = [...clientIDs]

    if (newClientIDs.length === 0) {
      setRole()
      setAddingClient(true)
      setCurrentClientID(undefined)
    } else {
      if (id) {
        setAddingClient(false)
      }
      // the last selector for the currently adding client should become 'label'
      // when not 'addingClient' state.
      // if 'id' is true, it means 'addingClient' becomes false
      if (!addingClient || id) {
        setCurrentClientID(newClientIDs[newClientIDs.length - 1])
      }
    }

    setClientIDs(newClientIDs)
    changeGroupName(partnerID, newClientIDs)
    setIdenticalGroupID(undefined)
  }

  const handleAddClient = _ => {
    setAddingClient(true)
    setCurrentClientID(undefined)
  }

  const handleAddClientKey = e => {
    if (e.key === "Enter") {
      handleAddClient()
      e.preventDefault()
    }
  }

  return (
    <>
      <S.Field>
        {clientIDs.map((clientID, index) => {
          if (index === clientIDs.length - 1 && !addingClient) {
            return <div key={clientID} />
          }

          return (
            <div key={clientID}>
              <ClientAutoSuggest
                id={clientID}
                hideLabel={index !== 0}
                enterprisePartnerID={partnerID}
                selectedID={clientID}
                excludeIDs={clientIDs}
                setSelectedID={id => changeClientID(id, clientID)}
              />
              <S.Devider />
            </div>
          )
        })}
      </S.Field>

      {!currentClientID && <S.FieldDivider />}

      <ClientAutoSuggest
        hideLabel={!!currentClientID && clientIDs.length > 1}
        label={
          clientIDs.length === 0 || (clientIDs.length === 1 && !addingClient)
            ? undefined
            : "Add Another Client"
        }
        enterprisePartnerID={partnerID}
        selectedID={currentClientID}
        excludeIDs={clientIDs}
        setSelectedID={id => changeClientID(id, currentClientID)}
      />

      {!addingClient && (
        <S.AddClient
          onClick={handleAddClient}
          onKeyDown={handleAddClientKey}
          tabIndex="0"
        >
          Add Another Client
        </S.AddClient>
      )}
    </>
  )
}

export default ClientAutoSuggests
