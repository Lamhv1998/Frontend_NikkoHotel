import type { 
  CheckInDto,
  CheckOutDto,
  GuestDto,
  ReceptionDashboardDto,
  DailyOccupancyDto,
  DailyReportDto,
  HousekeepingRequestDto,
  MaintenanceRequestDto,
  RoomServiceDto,
  ServiceOrderDto,
  GuestRegistrationRequest,
  CheckInRequest,
  CheckOutRequest,
  WalkInCheckInRequest,
  RoomServiceRequestDto
} from '~/types/room'

export const useReceptionApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiGatewayUrl || 'http://localhost:8087'

  // ========== DASHBOARD & OVERVIEW APIs ==========

  /**
   * Lấy thông tin dashboard reception
   */
  const getReceptionDashboard = async (): Promise<ReceptionDashboardDto> => {
    try {
      const { data, error } = await useFetch<ReceptionDashboardDto>(`${baseURL}/api/reception/dashboard`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thông tin dashboard')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching reception dashboard:', error)
      throw error
    }
  }

  /**
   * Lấy báo cáo hàng ngày
   */
  const getDailyReport = async (date: string): Promise<DailyReportDto> => {
    try {
      const { data, error } = await useFetch<DailyReportDto>(`${baseURL}/api/reception/daily-report`, {
        query: { date }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy báo cáo hàng ngày')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching daily report:', error)
      throw error
    }
  }

  /**
   * Lấy thống kê khách hàng
   */
  const getGuestStatistics = async (fromDate: string, toDate: string): Promise<any> => {
    try {
      const { data, error } = await useFetch<any>(`${baseURL}/api/reception/guest-statistics`, {
        query: { fromDate, toDate }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thống kê khách hàng')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching guest statistics:', error)
      throw error
    }
  }

  // ========== CHECK-IN MANAGEMENT ==========

  /**
   * Lấy danh sách check-in đang chờ
   */
  const getPendingCheckIns = async (): Promise<CheckInDto[]> => {
    try {
      const { data, error } = await useFetch<CheckInDto[]>(`${baseURL}/api/reception/check-ins/pending`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách check-in đang chờ')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching pending check-ins:', error)
      throw error
    }
  }

  /**
   * Lấy danh sách check-in hôm nay
   */
  const getTodayCheckIns = async (): Promise<CheckInDto[]> => {
    try {
      const { data, error } = await useFetch<CheckInDto[]>(`${baseURL}/api/reception/check-ins/today`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách check-in hôm nay')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching today check-ins:', error)
      throw error
    }
  }

  /**
   * Lấy thông tin check-in theo ID
   */
  const getCheckInById = async (checkInId: string): Promise<CheckInDto> => {
    try {
      const { data, error } = await useFetch<CheckInDto>(`${baseURL}/api/reception/check-ins/${checkInId}`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thông tin check-in')
      }
      
      if (!data.value) {
        throw new Error('Không tìm thấy thông tin check-in')
      }
      
      return data.value
    } catch (error) {
      console.error('Error fetching check-in by ID:', error)
      throw error
    }
  }

  // ========== CHECK-OUT MANAGEMENT ==========

  /**
   * Lấy danh sách check-out đang chờ
   */
  const getPendingCheckOuts = async (): Promise<CheckOutDto[]> => {
    try {
      const { data, error } = await useFetch<CheckOutDto[]>(`${baseURL}/api/reception/check-outs/pending`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách check-out đang chờ')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching pending check-outs:', error)
      throw error
    }
  }

  /**
   * Lấy danh sách check-out hôm nay
   */
  const getTodayCheckOuts = async (): Promise<CheckOutDto[]> => {
    try {
      const { data, error } = await useFetch<CheckOutDto[]>(`${baseURL}/api/reception/check-outs/today`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách check-out hôm nay')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching today check-outs:', error)
      throw error
    }
  }

  /**
   * Lấy thông tin check-out theo ID
   */
  const getCheckOutById = async (checkOutId: string): Promise<CheckOutDto> => {
    try {
      const { data, error } = await useFetch<CheckOutDto>(`${baseURL}/api/reception/check-outs/${checkOutId}`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thông tin check-out')
      }
      
      if (!data.value) {
        throw new Error('Không tìm thấy thông tin check-out')
      }
      
      return data.value
    } catch (error) {
      console.error('Error fetching check-out by ID:', error)
      throw error
    }
  }

  // ========== GUEST MANAGEMENT ==========

  /**
   * Lấy danh sách khách hiện tại
   */
  const getCurrentGuests = async (): Promise<GuestDto[]> => {
    try {
      const { data, error } = await useFetch<GuestDto[]>(`${baseURL}/api/reception/guests/current`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách khách hiện tại')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching current guests:', error)
      throw error
    }
  }

  /**
   * Lấy thông tin khách theo ID
   */
  const getGuestById = async (guestId: string): Promise<GuestDto> => {
    try {
      const { data, error } = await useFetch<GuestDto>(`${baseURL}/api/reception/guests/${guestId}`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thông tin khách')
      }
      
      if (!data.value) {
        throw new Error('Không tìm thấy thông tin khách')
      }
      
      return data.value
    } catch (error) {
      console.error('Error fetching guest by ID:', error)
      throw error
    }
  }

  /**
   * Tìm kiếm khách
   */
  const searchGuests = async (query: string): Promise<GuestDto[]> => {
    try {
      const { data, error } = await useFetch<GuestDto[]>(`${baseURL}/api/reception/guests/search`, {
        query: { q: query }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi tìm kiếm khách')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error searching guests:', error)
      throw error
    }
  }

  // ========== HOUSEKEEPING MANAGEMENT ==========

  /**
   * Lấy danh sách yêu cầu dọn dẹp
   */
  const getHousekeepingRequests = async (status?: string): Promise<HousekeepingRequestDto[]> => {
    try {
      const { data, error } = await useFetch<HousekeepingRequestDto[]>(`${baseURL}/api/reception/housekeeping/requests`, {
        query: status ? { status } : undefined
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách yêu cầu dọn dẹp')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching housekeeping requests:', error)
      throw error
    }
  }

  /**
   * Lấy lịch dọn dẹp
   */
  const getHousekeepingSchedule = async (date: string): Promise<any> => {
    try {
      const { data, error } = await useFetch<any>(`${baseURL}/api/reception/housekeeping/schedule`, {
        query: { date }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy lịch dọn dẹp')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching housekeeping schedule:', error)
      throw error
    }
  }

  // ========== MAINTENANCE MANAGEMENT ==========

  /**
   * Lấy danh sách yêu cầu bảo trì
   */
  const getMaintenanceRequests = async (status?: string): Promise<MaintenanceRequestDto[]> => {
    try {
      const { data, error } = await useFetch<MaintenanceRequestDto[]>(`${baseURL}/api/reception/maintenance/requests`, {
        query: status ? { status } : undefined
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách yêu cầu bảo trì')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching maintenance requests:', error)
      throw error
    }
  }

  /**
   * Lấy lịch bảo trì
   */
  const getMaintenanceSchedule = async (date: string): Promise<any> => {
    try {
      const { data, error } = await useFetch<any>(`${baseURL}/api/reception/maintenance/schedule`, {
        query: { date }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy lịch bảo trì')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching maintenance schedule:', error)
      throw error
    }
  }

  // ========== ROOM SERVICE MANAGEMENT ==========

  /**
   * Lấy danh sách dịch vụ phòng
   */
  const getRoomServices = async (roomNumber?: string): Promise<RoomServiceDto[]> => {
    try {
      const { data, error } = await useFetch<RoomServiceDto[]>(`${baseURL}/api/reception/room-services`, {
        query: roomNumber ? { roomNumber } : undefined
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách dịch vụ phòng')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching room services:', error)
      throw error
    }
  }

  /**
   * Lấy danh sách đơn hàng dịch vụ
   */
  const getServiceOrders = async (status?: string): Promise<ServiceOrderDto[]> => {
    try {
      const { data, error } = await useFetch<ServiceOrderDto[]>(`${baseURL}/api/reception/service-orders`, {
        query: status ? { status } : undefined
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy danh sách đơn hàng dịch vụ')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching service orders:', error)
      throw error
    }
  }

  /**
   * Lấy thông tin đơn hàng dịch vụ theo ID
   */
  const getServiceOrderById = async (orderId: string): Promise<ServiceOrderDto> => {
    try {
      const { data, error } = await useFetch<ServiceOrderDto>(`${baseURL}/api/reception/service-orders/${orderId}`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thông tin đơn hàng dịch vụ')
      }
      
      if (!data.value) {
        throw new Error('Không tìm thấy đơn hàng dịch vụ')
      }
      
      return data.value
    } catch (error) {
      console.error('Error fetching service order by ID:', error)
      throw error
    }
  }

  // ========== OCCUPANCY & ANALYTICS ==========

  /**
   * Lấy thống kê lấp đầy theo ngày
   */
  const getDailyOccupancy = async (date: string): Promise<DailyOccupancyDto> => {
    try {
      const { data, error } = await useFetch<DailyOccupancyDto>(`${baseURL}/api/reception/occupancy/daily`, {
        query: { date }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thống kê lấp đầy theo ngày')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching daily occupancy:', error)
      throw error
    }
  }

  /**
   * Lấy báo cáo lấp đầy theo khoảng thời gian
   */
  const getOccupancyReport = async (fromDate: string, toDate: string): Promise<any> => {
    try {
      const { data, error } = await useFetch<any>(`${baseURL}/api/reception/occupancy/report`, {
        query: { fromDate, toDate }
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy báo cáo lấp đầy')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching occupancy report:', error)
      throw error
    }
  }

  /**
   * Lấy thống kê lấp đầy theo tầng
   */
  const getFloorOccupancy = async (): Promise<any[]> => {
    try {
      const { data, error } = await useFetch<any[]>(`${baseURL}/api/reception/occupancy/floors`)
      
      if (error.value) {
        throw new Error(error.value.message || 'Lỗi khi lấy thống kê lấp đầy theo tầng')
      }
      
      return data.value!
    } catch (error) {
      console.error('Error fetching floor occupancy:', error)
      throw error
    }
  }

  return {
    // Dashboard & Overview
    getReceptionDashboard,
    getDailyReport,
    getGuestStatistics,
    
    // Check-in Management
    getPendingCheckIns,
    getTodayCheckIns,
    getCheckInById,
    
    // Check-out Management
    getPendingCheckOuts,
    getTodayCheckOuts,
    getCheckOutById,
    
    // Guest Management
    getCurrentGuests,
    getGuestById,
    searchGuests,
    
    // Housekeeping Management
    getHousekeepingRequests,
    getHousekeepingSchedule,
    
    // Maintenance Management
    getMaintenanceRequests,
    getMaintenanceSchedule,
    
    // Room Service Management
    getRoomServices,
    getServiceOrders,
    getServiceOrderById,
    
    // Occupancy & Analytics
    getDailyOccupancy,
    getOccupancyReport,
    getFloorOccupancy
  }
}
