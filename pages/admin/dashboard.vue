<template>
  <div class="admin-dashboard">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-600">Quản lý tổng quan hệ thống khách sạn</p>
      </div>

      <!-- Room Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <Icon name="ic:baseline-hotel" class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Tổng số phòng</p>
              <p class="text-2xl font-semibold text-gray-900">{{ roomStats.totalRooms || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <Icon name="ic:baseline-check-circle" class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Phòng khả dụng</p>
              <p class="text-2xl font-semibold text-gray-900">{{ roomStats.availableRooms || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 text-red-600">
              <Icon name="ic:baseline-person" class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Phòng đang sử dụng</p>
              <p class="text-2xl font-semibold text-gray-900">{{ roomStats.occupiedRooms || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Icon name="ic:baseline-construction" class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Tỷ lệ lấp đầy</p>
              <p class="text-2xl font-semibold text-gray-900">{{ (roomStats.occupancyRatio || 0).toFixed(1) }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reception Dashboard -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Reception Overview</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Check-in hôm nay:</span>
              <span class="font-medium">{{ receptionData.todayCheckIns || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Check-out hôm nay:</span>
              <span class="font-medium">{{ receptionData.todayCheckOuts || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Khách hiện tại:</span>
              <span class="font-medium">{{ receptionData.currentGuests || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Phòng cần dọn dẹp:</span>
              <span class="font-medium">{{ receptionData.pendingHousekeeping || 0 }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Maintenance Status</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Phòng bảo trì:</span>
              <span class="font-medium">{{ roomStats.maintenanceRooms || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Yêu cầu bảo trì:</span>
              <span class="font-medium">{{ maintenanceRequests.length }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Phòng cần dọn dẹp:</span>
              <span class="font-medium">{{ cleaningRequests.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Phòng gần đây</h3>
          <div v-if="recentRooms.length > 0" class="space-y-3">
            <div v-for="room in recentRooms.slice(0, 5)" :key="room._id" class="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p class="font-medium text-gray-900">{{ room.name }}</p>
                <p class="text-sm text-gray-600">{{ room.areaInfo }} • {{ room.bedInfo }}</p>
              </div>
              <span class="text-sm font-medium text-gray-600">{{ useFormatCurrency(room.price) }}</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <Icon name="ic:baseline-hotel" class="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Chưa có dữ liệu phòng</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Yêu cầu bảo trì gần đây</h3>
          <div v-if="maintenanceRequests.length > 0" class="space-y-3">
            <div v-for="request in maintenanceRequests.slice(0, 5)" :key="request.requestId" class="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p class="font-medium text-gray-900">Phòng {{ request.roomNumber }}</p>
                <p class="text-sm text-gray-600">{{ request.issueType }} • {{ request.priority }}</p>
              </div>
              <span :class="getStatusClass(request.status)" class="text-xs px-2 py-1 rounded-full">
                {{ getStatusText(request.status) }}
              </span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <Icon name="ic:baseline-construction" class="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Không có yêu cầu bảo trì</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-600"></div>
          <p class="mt-4 text-gray-700">Đang tải dữ liệu...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 text-center max-w-md">
          <Icon name="ic:baseline-error" class="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button
            @click="loadDashboardData"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { RoomResponse, RoomStatisticsDto, ReceptionDashboardDto, MaintenanceRequestDto } from '~/types/room'

definePageMeta({ 
  layout: 'adminlayout',
  middleware: 'auth'
})

// Sử dụng composables
const { 
  getRoomStatistics, 
  getAllRooms, 
  getMaintenanceRooms, 
  getCleaningRooms 
} = useRoomApi()

const { 
  getReceptionDashboard, 
  getMaintenanceRequests 
} = useReceptionApi()

// Reactive data
const loading = ref(false)
const error = ref<string | null>(null)
const roomStats = ref<RoomStatisticsDto>({} as RoomStatisticsDto)
const receptionData = ref<ReceptionDashboardDto>({} as ReceptionDashboardDto)
const recentRooms = ref<RoomResponse[]>([])
const maintenanceRequests = ref<MaintenanceRequestDto[]>([])
const cleaningRequests = ref<any[]>([])

// Lifecycle
onMounted(async () => {
  await loadDashboardData()
})

// Methods
const loadDashboardData = async () => {
  try {
    loading.value = true
    error.value = null

    // Load all data in parallel
    const [
      stats,
      rooms,
      maintenance,
      cleaning,
      reception
    ] = await Promise.all([
      getRoomStatistics(),
      getAllRooms(0, 10),
      getMaintenanceRooms(0, 10),
      getCleaningRooms(0, 10),
      getReceptionDashboard()
    ])

    roomStats.value = stats
    recentRooms.value = rooms
    maintenanceRequests.value = maintenance
    cleaningRequests.value = cleaning
    receptionData.value = reception

  } catch (err) {
    console.error('Error loading dashboard data:', err)
    error.value = err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu dashboard'
  } finally {
    loading.value = false
  }
}

const getStatusClass = (status: string) => {
  const statusClasses = {
    'REQUESTED': 'bg-yellow-100 text-yellow-800',
    'ASSIGNED': 'bg-blue-100 text-blue-800',
    'IN_PROGRESS': 'bg-orange-100 text-orange-800',
    'COMPLETED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  const statusTexts = {
    'REQUESTED': 'Đã yêu cầu',
    'ASSIGNED': 'Đã phân công',
    'IN_PROGRESS': 'Đang thực hiện',
    'COMPLETED': 'Hoàn thành',
    'CANCELLED': 'Đã hủy'
  }
  return statusTexts[status as keyof typeof statusTexts] || status
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
