const compare = (target, search) => {
  return target
    ?.toLowerCase()
    ?.includes(search?.toString()?.trim()?.toLowerCase())
}

const compareUser = (user, filter) => {
  return compare(user.full_name, filter) || compare(user.email, filter)
}

export { compareUser }
