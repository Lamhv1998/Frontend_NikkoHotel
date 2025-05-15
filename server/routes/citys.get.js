export default defineEventHandler(() => {
  return fetch(`http://api.opencube.tw/twzipcode/get-citys`).then((response) => response.json())
})
