export default defineEventHandler(async (event) => {
  console.log('=== TEST DISTRICT API CALLED ===')
  const query = getQuery(event)
  console.log('Test query:', query)
  
  return { 
    message: 'Test API working',
    query: query,
    timestamp: new Date().toISOString()
  }
})
