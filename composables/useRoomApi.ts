import type { RoomSearchParams, AvailableRoomParams } from '~/types/room'

export const useRoomApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.roomServiceUrl || 'http://localhost:8087'
  
  console.log('🚀 useRoomApi initialized with baseURL:', baseURL)

  // Lấy tất cả loại phòng (room types)
  const getAllRoomTypes = async () => {
    try {
      console.log('📡 Fetching room types from:', `${baseURL}/api/rooms/types`)
      const response = await $fetch(`${baseURL}/api/rooms/types`)
      console.log('✅ Room types response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room types:', error)
      throw error
    }
  }

  // Lấy thống kê phòng
  const getRoomStatistics = async () => {
    try {
      console.log('📡 Fetching room statistics from:', `${baseURL}/api/rooms/statistics`)
      const response = await $fetch(`${baseURL}/api/rooms/statistics`)
      console.log('✅ Room statistics response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room statistics:', error)
      throw error
    }
  }

  // Lấy tổng số phòng
  const getRoomCount = async () => {
    try {
      console.log('📡 Fetching room count from:', `${baseURL}/api/rooms/count`)
      const response = await $fetch(`${baseURL}/api/rooms/count`)
      console.log('✅ Room count response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room count:', error)
      throw error
    }
  }

  // Lấy số phòng khả dụng
  const getAvailableRoomCount = async () => {
    try {
      console.log('📡 Fetching available room count from:', `${baseURL}/api/rooms/count/available`)
      const response = await $fetch(`${baseURL}/api/rooms/count/available`)
      console.log('✅ Available room count response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching available room count:', error)
      throw error
    }
  }

  // Lấy số phòng đang sử dụng
  const getOccupiedRoomCount = async () => {
    try {
      console.log('📡 Fetching occupied room count from:', `${baseURL}/api/rooms/count/occupied`)
      const response = await $fetch(`${baseURL}/api/rooms/count/occupied`)
      console.log('✅ Occupied room count response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching occupied room count:', error)
      throw error
    }
  }

  // Lấy số phòng đang bảo trì
  const getMaintenanceRoomCount = async () => {
    try {
      console.log(
        '📡 Fetching maintenance room count from:',
        `${baseURL}/api/rooms/count/maintenance`
      )
      const response = await $fetch(`${baseURL}/api/rooms/count/maintenance`)
      console.log('✅ Maintenance room count response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching maintenance room count:', error)
      throw error
    }
  }

  // Lấy tỷ lệ lấp đầy phòng
  const getOccupancyRatio = async () => {
    try {
      console.log('📡 Fetching occupancy ratio from:', `${baseURL}/api/rooms/occupancy-ratio`)
      const response = await $fetch(`${baseURL}/api/rooms/occupancy-ratio`)
      console.log('✅ Occupancy ratio response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching occupancy ratio:', error)
      throw error
    }
  }

  // Lấy danh sách tất cả phòng
  const getAllRooms = async (page = 0, size = 20) => {
    try {
      console.log('📡 Fetching all rooms from:', `${baseURL}/api/rooms?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms?page=${page}&size=${size}`)
      console.log('✅ All rooms response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching all rooms:', error)
      throw error
    }
  }

  // Lấy thông tin phòng theo ID
  const getRoomById = async (roomId: string) => {
    try {
      console.log('📡 Fetching room by ID from:', `${baseURL}/api/rooms/${roomId}`)
      const response = await $fetch(`${baseURL}/api/rooms/${roomId}`)
      console.log('✅ Room by ID response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room by ID:', error)
      throw error
    }
  }

  // Lấy thông tin phòng theo số phòng
  const getRoomByNumber = async (roomNumber: string) => {
    try {
      console.log('📡 Fetching room by number from:', `${baseURL}/api/rooms/number/${roomNumber}`)
      const response = await $fetch(`${baseURL}/api/rooms/number/${roomNumber}`)
      console.log('✅ Room by number response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room by number:', error)
      throw error
    }
  }

  // Tìm kiếm phòng
  const searchRooms = async (params: RoomSearchParams) => {
    try {
      const queryString = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryString.append(key, value.toString())
        }
      })
      
      console.log('📡 Searching rooms from:', `${baseURL}/api/rooms/search?${queryString}`)
      const response = await $fetch(`${baseURL}/api/rooms/search?${queryString}`)
      console.log('✅ Search rooms response:', response)
      return response
    } catch (error) {
      console.error('❌ Error searching rooms:', error)
      throw error
    }
  }

  // Lọc phòng theo trạng thái
  const filterRoomsByStatus = async (status: string, page = 0, size = 20) => {
    try {
      console.log(
        '📡 Filtering rooms by status from:',
        `${baseURL}/api/rooms/filter/status/${status}?page=${page}&size=${size}`
      )
      const response = await $fetch(
        `${baseURL}/api/rooms/filter/status/${status}?page=${page}&size=${size}`
      )
      console.log('✅ Filter rooms by status response:', response)
      return response
    } catch (error) {
      console.error('❌ Error filtering rooms by status:', error)
      throw error
    }
  }

  // Lọc phòng theo loại phòng
  const filterRoomsByType = async (roomType: string, page = 0, size = 20) => {
    try {
      console.log('📡 Filtering rooms by type from:', `${baseURL}/api/rooms/filter/type/${roomType}?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/filter/type/${roomType}?page=${page}&size=${size}`)
      console.log('✅ Filter rooms by type response:', response)
      return response
    } catch (error) {
      console.error('❌ Error filtering rooms by type:', error)
      throw error
    }
  }

  // Lấy phòng theo loại phòng (sử dụng filter/type endpoint)
  const getRoomsByType = async (roomTypeId: string, page = 0, size = 100) => {
    try {
      // Sử dụng endpoint filter/type với roomType parameter (endpoint chính xác từ backend)
      console.log('📡 Filtering rooms by type ID from:', `${baseURL}/api/rooms/filter/type/${roomTypeId}?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/filter/type/${roomTypeId}?page=${page}&size=${size}`)
      console.log('✅ Filter rooms by type response:', response)
      return response
    } catch (error) {
      console.error('❌ Error filtering rooms by type, trying fallback approach:', error)
      
      // Fallback: Lấy tất cả phòng và lọc theo type
      try {
        console.log('🔄 Fallback: Getting all rooms and filtering by type...')
        const allRooms = await getAllRooms(0, 1000) // Lấy nhiều phòng hơn để lọc
        
        if (allRooms && Array.isArray(allRooms)) {
          const filteredRooms = allRooms.filter((room: any) => room.roomTypeId === roomTypeId || room.roomType?.id === roomTypeId)
          console.log('✅ Filtered rooms by type:', filteredRooms)
          return filteredRooms
        } else if (allRooms && typeof allRooms === 'object' && 'content' in allRooms && Array.isArray((allRooms as any).content)) {
          const filteredRooms = (allRooms as any).content.filter((room: any) => room.roomTypeId === roomTypeId || room.roomType?.id === roomTypeId)
          console.log('✅ Filtered rooms by type (from content):', filteredRooms)
          return filteredRooms
        }
        
        console.warn('⚠️ No rooms found or unexpected response format')
        return []
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError)
        throw fallbackError
      }
    }
  }

  // Lấy phòng theo loại phòng (sử dụng filter/type endpoint)
  const getRoomsByTypeFilter = async (roomTypeId: string, page = 0, size = 100) => {
    try {
      // Sử dụng endpoint filter/type với roomType parameter
      console.log('📡 Filtering rooms by type ID from:', `${baseURL}/api/rooms/filter/type/${roomTypeId}?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/filter/type/${roomTypeId}?page=${page}&size=${size}`)
      console.log('✅ Filter rooms by type response:', response)
      return response
    } catch (error) {
      console.error('❌ Error filtering rooms by type:', error)
      throw error
    }
  }

  // Lấy phòng theo tầng
  const filterRoomsByFloor = async (floor: number, page = 0, size = 20) => {
    try {
      console.log('📡 Filtering rooms by floor from:', `${baseURL}/api/rooms/filter/floor/${floor}?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/filter/floor/${floor}?page=${page}&size=${size}`)
      console.log('✅ Filter rooms by floor response:', response)
      return response
    } catch (error) {
      console.error('❌ Error filtering rooms by floor:', error)
      throw error
    }
  }

  // Lọc phòng theo khoảng giá
  const filterRoomsByPriceRange = async (minPrice: number, maxPrice: number, page = 0, size = 20) => {
    try {
      console.log('📡 Filtering rooms by price range from:', `${baseURL}/api/rooms/filter/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/filter/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`)
      console.log('✅ Filter rooms by price range response:', response)
      return response
    } catch (error) {
      console.error('❌ Error filtering rooms by price range:', error)
      throw error
    }
  }

  // Lấy danh sách phòng khả dụng
  const getAvailableRooms = async (params: AvailableRoomParams) => {
    try {
      const queryString = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryString.append(key, value.toString())
        }
      })
      
      console.log('📡 Fetching available rooms from:', `${baseURL}/api/rooms/available?${queryString}`)
      const response = await $fetch(`${baseURL}/api/rooms/available?${queryString}`)
      console.log('✅ Available rooms response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching available rooms:', error)
      throw error
    }
  }

  // Kiểm tra khả dụng của phòng
  const checkRoomAvailability = async (roomId: string) => {
    try {
      console.log('📡 Checking room availability from:', `${baseURL}/api/rooms/${roomId}/availability`)
      const response = await $fetch(`${baseURL}/api/rooms/${roomId}/availability`)
      console.log('✅ Room availability response:', response)
      return response
    } catch (error) {
      console.error('❌ Error checking room availability:', error)
      throw error
    }
  }

  // Lấy danh sách phòng đang bảo trì
  const getMaintenanceRooms = async (page = 0, size = 20) => {
    try {
      console.log('📡 Fetching maintenance rooms from:', `${baseURL}/api/rooms/maintenance?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/maintenance?page=${page}&size=${size}`)
      console.log('✅ Maintenance rooms response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching maintenance rooms:', error)
      throw error
    }
  }

  // Lấy danh sách phòng cần dọn dẹp
  const getCleaningRooms = async (page = 0, size = 20) => {
    try {
      console.log('📡 Fetching cleaning rooms from:', `${baseURL}/api/rooms/cleaning?page=${page}&size=${size}`)
      const response = await $fetch(`${baseURL}/api/rooms/cleaning?page=${page}&size=${size}`)
      console.log('✅ Cleaning rooms response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching cleaning rooms:', error)
      throw error
    }
  }

  // Lấy danh sách tất cả tầng
  const getAllFloors = async () => {
    try {
      console.log('📡 Fetching all floors from:', `${baseURL}/api/rooms/floors`)
      const response = await $fetch(`${baseURL}/api/rooms/floors`)
      console.log('✅ All floors response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching all floors:', error)
      throw error
    }
  }

  // Lấy danh sách phòng theo tầng
  const getRoomsByFloor = async (floor: number) => {
    try {
      console.log('📡 Fetching rooms by floor from:', `${baseURL}/api/rooms/floor/${floor}`)
      const response = await $fetch(`${baseURL}/api/rooms/floor/${floor}`)
      console.log('✅ Rooms by floor response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching rooms by floor:', error)
      throw error
    }
  }

  // Lấy khoảng giá phòng
  const getRoomPriceRange = async () => {
    try {
      console.log('📡 Fetching room price range from:', `${baseURL}/api/rooms/price-range`)
      const response = await $fetch(`${baseURL}/api/rooms/price-range`)
      console.log('✅ Room price range response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room price range:', error)
      throw error
    }
  }

  return {
    // Room Types
    getAllRoomTypes,
    
    // Statistics
    getRoomStatistics,
    getRoomCount,
    getAvailableRoomCount,
    getOccupiedRoomCount,
    getMaintenanceRoomCount,
    getOccupancyRatio,
    
    // Rooms
    getAllRooms,
    getRoomById,
    getRoomByNumber,
    searchRooms,
    filterRoomsByStatus,
    filterRoomsByType,
    getRoomsByType,
    getRoomsByTypeFilter,
    filterRoomsByFloor,
    filterRoomsByPriceRange,
    getAvailableRooms,
    checkRoomAvailability,
    getMaintenanceRooms,
    getCleaningRooms,
    getAllFloors,
    getRoomsByFloor,
    getRoomPriceRange
  }
}
