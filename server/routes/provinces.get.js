export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('https://provinces.open-api.vn/api/p')
    return response
  } catch (error) {
    console.error('Error fetching provinces:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch provinces'
    })
  }
})
