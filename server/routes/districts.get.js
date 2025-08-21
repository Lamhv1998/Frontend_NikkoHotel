export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const provinceCode = query.provinceCode
    
    if (!provinceCode) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Province code is required'
      })
    }
    
    const response = await $fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
    return response.districts || []
  } catch (error) {
    console.error('Error fetching districts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch districts'
    })
  }
})
