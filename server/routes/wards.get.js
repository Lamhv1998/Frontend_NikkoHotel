export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const districtCode = query.districtCode
    
    if (!districtCode) {
      throw createError({
        statusCode: 400,
        statusMessage: 'District code is required'
      })
    }
    
    const response = await $fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
    return response.wards || []
  } catch (error) {
    //.error('Error fetching wards:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch wards'
    })
  }
})
