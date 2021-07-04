import React, { useState } from "react"

import { Search, SearchSuggestion, Badges, Link } from "../"

import { useAllEnterpriseClients } from "hooks"

const PLACEHOLDER = "Search groups"
const MAX_BADGE_WIDTH = 203

const GroupsSearch = ({
  rows,
  loading,
  setFilter,
  searchText,
  setSearchText,
}) => {
  const { data: clients } = useAllEnterpriseClients()
  const enterpriseClients = clients?.enterprise_clients || []

  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(true)

  const data = searchText && rows.length > 0 ? rows : null

  const onChange = ({ target: { value } }) => setSearchText(value)

  const onReset = () => {
    setSearchText("")
    setFilter("")
  }

  const columns = [
    {
      accessor: "name",
      Cell: ({
        row: {
          original: { id, name },
        },
      }) => (
        <Link to={id} tabIndex="-1">
          {name}
        </Link>
      ),
      width: 256,
    },
    {
      accessor: "client_ids",
      Cell: ({ value = [] }) => {
        const items = enterpriseClients.filter(c => value.includes(c.id))

        return (
          <Badges
            id="search"
            items={items.length > 0 ? [items[0]] : []}
            maxWidth={MAX_BADGE_WIDTH}
            showDash={false}
          />
        )
      },
      width: 203,
    },
    {
      accessor: "user_count",
      width: 53,
      textAlign: "right",
    },
  ]

  return (
    <Search
      placeholder={PLACEHOLDER}
      value={searchText}
      loading={loading}
      onChange={onChange}
      onReset={onReset}
      setShouldShowSuggestions={setShouldShowSuggestions}
      setFilter={setFilter}
    >
      {shouldShowSuggestions && (
        <SearchSuggestion type="groups" columns={columns} data={data} />
      )}
    </Search>
  )
}

export default GroupsSearch
