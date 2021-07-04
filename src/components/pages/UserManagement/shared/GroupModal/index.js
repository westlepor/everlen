import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import { ClientAutoSuggests, PartnerAutoSuggest, GroupRoleSelector } from "../"
import {
  useAllEnterprisePartners,
  useEnterprisePartnerClients,
  useOneGroupByConfiguration,
  useLazyOneGroupByName,
} from "hooks"

import { colors } from "@everlywell/leaves"

import { CLIENT_ROLE_MAPPING } from "../../constants"

import SubmitButton from "../SubmitButton"

import * as S from "./style"

const equals = (a, b) => {
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()

  return sortedA.toString() === sortedB.toString()
}

const GroupModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  defaultPartnerID,
  defaultClientIDs,
  defaultRole,
  defaultGroupName,
  buttonName,
  handleSubmit,
  deleteGroupButton,
  isGroupBeingDeleted,
  loading,
}) => {
  const [partnerID, setPartnerID] = useState()
  const [addingClient, setAddingClient] = useState(true)
  const [currentClientID, setCurrentClientID] = useState()
  const [clientIDs, setClientIDs] = useState([])
  const [role, setRole] = useState()
  const [groupName, setGroupName] = useState("")
  const [groupNameError, setGroupNameError] = useState("")
  const [isGroupNameFocused, setIsGroupNameFocused] = useState(false)
  const [identicalGroupID, setIdenticalGroupID] = useState()

  const { data: partners } = useAllEnterprisePartners()
  const { data: clients } = useEnterprisePartnerClients({
    enterprisePartnerID: partnerID,
  })

  const { data: groups } = useOneGroupByConfiguration({
    enterprisePartnerID: partnerID,
    enterpriseClientIDs: [...clientIDs],
    role,
  })

  const identicalGroups = groups?.findUserGroupByConfiguration
  const partnerItems = partners?.enterprise_partners || []
  const clientItems = clients?.enterprise_clients || []

  const hasExistingGrouNotpBeenModified =
    defaultPartnerID === partnerID &&
    equals(defaultClientIDs, clientIDs) &&
    defaultRole === role &&
    defaultGroupName === groupName

  useEffect(() => {
    setPartnerID(defaultPartnerID)
    setClientIDs([...defaultClientIDs])
    setRole(defaultRole)
    setGroupName(defaultGroupName)

    if (defaultClientIDs.length > 0) {
      setAddingClient(false)
      setCurrentClientID(defaultClientIDs[defaultClientIDs.length - 1])
    }
  }, [defaultPartnerID, defaultClientIDs, defaultRole, defaultGroupName])

  const changeGroupName = (partnerID, clientIDs) => {
    setGroupNameError("")

    if (!partnerID) {
      setGroupName("")
      setIdenticalGroupID(undefined)
      return
    }

    const partnerName = partnerItems.find(item => item.id === partnerID)?.name

    if (clientIDs && clientIDs.length > 0) {
      const clientNames = clientIDs
        .map(clientID => clientItems.find(item => item.id === clientID)?.name)
        .join(", ")

      setGroupName(`${partnerName}: ${clientNames}`)
    } else {
      setGroupName(partnerName)
    }
    setIdenticalGroupID(undefined)
  }

  const changePartnerID = id => {
    if (!id || (role && CLIENT_ROLE_MAPPING[role])) {
      setRole()
    }

    setClientIDs([])
    setAddingClient(true)
    setCurrentClientID(undefined)
    setPartnerID(id)
    changeGroupName(id, [])
    setIdenticalGroupID(undefined)
  }

  const changeRole = role => {
    setRole(role)

    setIdenticalGroupID(false)

    if (role.match(/hcp/)) {
      setGroupName(prev => `${prev} (HCP)`)
    } else {
      setGroupName(prev => prev.replace(" (HCP)", ""))
    }
  }

  const handleGroupCompleted = groupByName => {
    let groupNameError =
      groupName.length > 255
        ? "Group Name cannot exceed 255 characters."
        : groupByName?.findUserGroupByName?.id
        ? "Group Name is already in use. Please choose another name."
        : ""

    setGroupNameError(groupNameError)

    const isEditGroup = !!deleteGroupButton
    let existingGroupID = undefined

    if (!!identicalGroups && identicalGroups.length > 0) {
      existingGroupID = identicalGroups[0].id

      if (
        isEditGroup &&
        partnerID === defaultPartnerID &&
        equals(clientIDs, defaultClientIDs) &&
        role === defaultRole
      ) {
        existingGroupID = undefined
      }
    }

    if (existingGroupID) {
      setIdenticalGroupID(existingGroupID)
    } else if (!groupNameError) {
      handleSubmit({
        name: groupName,
        role,
        enterprise_partner_id: partnerID,
        enterprise_client_ids: clientIDs,
      })
    }
  }

  const [
    getGroupByName,
    { loading: loadingGroupByName },
  ] = useLazyOneGroupByName({
    name: groupName,
    handleCompleted: handleGroupCompleted,
  })

  const onSubmit = () => {
    getGroupByName()
  }

  const handleModalOpen = open => {
    if (!open) {
      if (!deleteGroupButton) {
        setPartnerID()
        setClientIDs([])
        setRole()
        setGroupName("")
        setAddingClient(true)
      } else {
        setPartnerID(defaultPartnerID)
        setClientIDs([...defaultClientIDs] || [])
        setRole(defaultRole)
        setGroupName(defaultGroupName)
        if (defaultClientIDs.length > 0) {
          setAddingClient(false)
        } else {
          setAddingClient(true)
        }
      }
    }
    setIsOpen(open)
  }

  return (
    <S.Modal
      open={isOpen}
      openHandler={handleModalOpen}
      className="add-group-modal"
    >
      <S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>

        <S.Field>
          <PartnerAutoSuggest
            selectedID={partnerID}
            setSelectedID={changePartnerID}
          />
        </S.Field>

        <ClientAutoSuggests
          {...{
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
          }}
        />

        <GroupRoleSelector
          role={role}
          setRole={changeRole}
          isPartner={!!partnerID}
          isClient={clientIDs.length > 0}
        />

        <S.GroupNameHeader>
          <S.GroupNameLabel
            focused={isGroupNameFocused}
            isError={!!groupNameError}
          >
            Group Name
          </S.GroupNameLabel>

          <S.Tooltip
            content={
              "This group name is auto-generated, but you can still edit it."
            }
            arrow="left"
            position="top"
            animationSpeed="fast"
            tooltipBoxClass="badge-tooltip"
          >
            <S.InfoIcon size={20} />
          </S.Tooltip>
        </S.GroupNameHeader>

        <S.GroupName
          value={groupName}
          onChange={e => {
            setGroupName(e.target.value)
            setGroupNameError("")
          }}
          onFocus={() => setIsGroupNameFocused(true)}
          onBlur={() => setIsGroupNameFocused(false)}
          error={groupNameError}
        />

        {identicalGroupID && (
          <S.WarnWrapper>
            <S.WarnIcon width={24} height={24} color={colors.red3} />
            <S.WarnRight>
              <S.WarnLabel>
                This group configuration is already in use.
              </S.WarnLabel>

              <S.WarnBody>
                <S.WarnGuide>To view this group,&nbsp;</S.WarnGuide>
                <S.WarnLink
                  onClick={_ => {
                    navigate("/app/user-management/groups/" + identicalGroupID)
                    handleModalOpen(false)
                  }}
                >
                  click here.
                </S.WarnLink>
              </S.WarnBody>
            </S.WarnRight>
          </S.WarnWrapper>
        )}

        <S.Buttons>
          <SubmitButton
            onClick={onSubmit}
            disabled={
              hasExistingGrouNotpBeenModified ||
              !partnerID ||
              !role ||
              !groupName ||
              identicalGroupID ||
              isGroupBeingDeleted ||
              loading
            }
            loading={loading || loadingGroupByName}
            isPadding={!deleteGroupButton}
          >
            {buttonName}
          </SubmitButton>

          {deleteGroupButton}
        </S.Buttons>
      </S.Wrapper>
    </S.Modal>
  )
}

GroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  defaultPartnerID: PropTypes.number,
  defaultClientIDs: PropTypes.array,
  defaultRole: PropTypes.string,
  defaultGroupName: PropTypes.string,
  buttonName: PropTypes.string,
  deleteGroupButton: PropTypes.node,
}

GroupModal.defaultProps = {
  isOpen: false,
  defaultClientIDs: [],
  defaultRole: "",
  defaultGroupName: "",
}

export default GroupModal
