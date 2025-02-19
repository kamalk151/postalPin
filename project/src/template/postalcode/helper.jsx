export const fetchMethod = async (url) => {
  const response = await fetch(url)
  const address = await response.json()
  return address
}