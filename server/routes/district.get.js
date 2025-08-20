

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { city, zip_code } = query
  
  console.log('=== DISTRICT API DEBUG ===')
  console.log('Query:', query)
  console.log('City:', city)
  console.log('Zip code:', zip_code)
  
  // Dữ liệu quận/huyện Việt Nam (đơn giản hóa)
  const districtsData = {
    "10000": [
      { "district": "Ba Đình", "zip_code": "10001" },
      { "district": "Hoàn Kiếm", "zip_code": "10002" },
      { "district": "Hai Bà Trưng", "zip_code": "10003" },
      { "district": "Đống Đa", "zip_code": "10004" },
      { "district": "Tây Hồ", "zip_code": "10005" }
    ],
    "70000": [
      { "district": "Quận 1", "zip_code": "70001" },
      { "district": "Quận 2", "zip_code": "70002" },
      { "district": "Quận 3", "zip_code": "70003" },
      { "district": "Quận 4", "zip_code": "70004" },
      { "district": "Quận 5", "zip_code": "70005" }
    ],
    "55000": [
      { "district": "Hải Châu", "zip_code": "55001" },
      { "district": "Thanh Khê", "zip_code": "55002" },
      { "district": "Sơn Trà", "zip_code": "55003" },
      { "district": "Ngũ Hành Sơn", "zip_code": "55004" }
    ],
    "96000": [
      { "district": "Cà Mau", "zip_code": "96001" },
      { "district": "Đầm Dơi", "zip_code": "96002" },
      { "district": "Cái Nước", "zip_code": "96003" },
      { "district": "Phú Tân", "zip_code": "96004" },
      { "district": "Trần Văn Thời", "zip_code": "96005" }
    ]
  }
  
  // Dữ liệu tỉnh/thành phố để tìm zip_code
  const citiesData = {
    "Hà Nội": "10000",
    "TP. Hồ Chí Minh": "70000",
    "Đà Nẵng": "55000",
    "Cà Mau": "96000"
  }
  
  console.log('Available cities:', Object.keys(citiesData))
  console.log('Available zip codes:', Object.keys(districtsData))
  
  // Nếu có zip_code, tìm quận/huyện theo zip_code
  if (zip_code) {
    console.log('Looking for zip_code:', zip_code)
    const districts = districtsData[zip_code] || []
    console.log('Found districts by zip_code:', districts)
    return { data: districts }
  }
  
  // Nếu có city, tìm quận/huyện theo city
  if (city) {
    console.log('Looking for city:', city)
    const cityZipCode = citiesData[city]
    console.log('Found city zip code:', cityZipCode)
    
    if (cityZipCode) {
      const districts = districtsData[cityZipCode] || []
      console.log('Found districts by city:', districts)
      return { data: districts }
    } else {
      console.log('City not found in citiesData')
    }
  }
  
  console.log('No districts found - returning empty array')
  return { data: [] }
})
