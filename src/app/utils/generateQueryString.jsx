export const queryFilter = (filter) => {
  const params = new URLSearchParams()

  for (let [key, value] of Object.entries(filter)) {
    if (Array.isArray(filter[key]) && filter[key].length > 0) {
      for (let z of filter[key]) {
        params.append(key, z)
      }
    } else if (filter[key] !== '' && !Array.isArray(filter[key]) && filter[key] !== null) {
      params.set(key, value)
    }
  }

  return params.toString().replace(/%2B/g, '+')
}
