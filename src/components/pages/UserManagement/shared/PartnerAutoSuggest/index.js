import React, { useRef, useEffect } from "react"

import { usePrevious, useAllEnterprisePartners } from "hooks"

import AutoSuggestSelector from "../AutoSuggestSelector"

const PartnerAutoSuggest = ({ id, label, selectedID, setSelectedID }) => {
  const { data } = useAllEnterprisePartners()
  const items = data?.enterprise_partners || []

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

  const displayName =
    selectedID && items.find(item => item.id === selectedID)?.name

  return (
    <AutoSuggestSelector
      type="Partner"
      items={items}
      inputID={id}
      label={label}
      inputRef={inputRef}
      placeholder="Enter partner name or ID"
      selectedID={selectedID}
      setSelectedID={setSelectedID}
      displayName={displayName}
    />
  )
}

PartnerAutoSuggest.defaultProps = {
  id: "partner-selector",
  label: "Partner Name & ID",
}

export default PartnerAutoSuggest
