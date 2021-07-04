import React, { useState } from "react"

import { URL } from "utils/constants"

import { Search, SearchSuggestion, Status, Link } from "../"

const PLACEHOLDER = "Search users"

const UsersSearch = ({
  rows,
  loading,
  setFilter,
  searchText,
  setSearchText,
}) => {
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(true)

  const data = searchText && rows.length > 0 ? rows : null

  const onChange = ({ target: { value } }) => setSearchText(value)

  const onReset = () => {
    setSearchText("")
    setFilter("")
  }

  const columns = [
    {
      accessor: "id",
      Cell: ({
        row: {
          original: { id, full_name },
        },
      }) => {
        const to = `${URL.userManagement}/users/${id}`

        return (
          <Link to={to} maxWidth={200}>
            {full_name}
          </Link>
        )
      },
    },
    {
      accessor: "email",
      minWidth: 180,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 100,
      Cell: ({ value }) => <Status value={value} />,
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
        <SearchSuggestion type="users" columns={columns} data={data} />
      )}
    </Search>
  )
}

export default UsersSearch
