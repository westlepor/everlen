import React, { useRef, useEffect } from "react"

import { usePrevious, useAllGroups } from "hooks"

import AutoSuggestSelector from "../AutoSuggestSelector"

const SEARCHABLES = ["name", "partner_id", "client_ids"]

const GroupAutoSuggest = ({
  id,
  label,
  hideLabel,
  selectedID,
  excludeIDs,
  setSelectedID,
}) => {
  const { data } = useAllGroups()
  let items = data?.allUserGroups?.data || []
  if (!selectedID) {
    items = items.filter(e => !excludeIDs.includes(e.id))
  }

  const inputRef = useRef()

  const wasSelected = usePrevious(!!selectedID)

  useEffect(() => {
    if (wasSelected && !selectedID) {
      inputRef.current.focus()
    } else if (inputRef.current) {
      inputRef.current.blur()
    }
    // eslint-disable-next-line
  }, [selectedID])

  const { name, partner_id, client_ids } =
    items.find(item => item.id === selectedID) || {}

  const displayName = name
  const displayID =
    !!client_ids && client_ids.length > 0
      ? client_ids.join(", ")
      : partner_id || " "

  const type = !!client_ids && client_ids.length > 0 ? "Client" : "Partner"

  return (
    <AutoSuggestSelector
      type={type}
      items={items}
      inputID={id}
      label={hideLabel ? undefined : label}
      inputRef={inputRef}
      placeholder="Enter group name or ID"
      selectedID={selectedID}
      setSelectedID={setSelectedID}
      displayName={displayName}
      displayID={displayID}
      searchables={SEARCHABLES}
    />
  )
}

GroupAutoSuggest.defaultProps = {
  id: "group-selector",
  label: "Groups",
  excludeIDs: [],
}

export default GroupAutoSuggest
