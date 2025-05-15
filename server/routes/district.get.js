export default defineEventHandler((event) => {
  const query = getQuery(event)
  const queryString = new URLSearchParams(query).toString()
  const url = `http://api.opencube.tw/twzipcode?${queryString}`
  return fetch(url).then((response) => response.json())
})
