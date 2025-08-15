<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold text-system-primary-120 mb-4">
          🔔 Thông báo
        </h1>
        <p class="text-gray-600 text-lg">Quản lý và xem tất cả thông báo từ hệ thống</p>
      </div>

      <!-- Notification Filters -->
      <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex space-x-2">
            <button 
              v-for="filter in filters" 
              :key="filter.id"
              @click="activeFilter = filter.id"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm',
                activeFilter === filter.id
                  ? 'bg-system-primary-120 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ filter.name }}
              <span v-if="filter.count" class="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                {{ filter.count }}
              </span>
            </button>
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              @click="markAllAsRead"
              class="px-4 py-2 text-sm text-system-primary-120 hover:bg-system-primary-10 rounded-lg transition-colors duration-300"
            >
              Đánh dấu tất cả đã đọc
            </button>
            <button 
              @click="clearAll"
              class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div v-if="filteredNotifications.length > 0" class="divide-y divide-gray-100">
          <div 
            v-for="notification in filteredNotifications" 
            :key="notification.id"
            :class="[
              'p-6 hover:bg-gray-50 transition-colors duration-300 cursor-pointer',
              !notification.read ? 'bg-blue-50' : ''
            ]"
            @click="markAsRead(notification.id)"
          >
            <div class="flex items-start space-x-4">
              <!-- Notification Icon -->
              <div class="flex-shrink-0">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  getNotificationIcon(notification.type).bg
                ]">
                  <Icon :name="getNotificationIcon(notification.type).icon" class="text-white text-lg" />
                </div>
              </div>
              
              <!-- Notification Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900 mb-1">
                      {{ notification.title }}
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ notification.message }}
                    </p>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{{ formatTime(notification.createdAt) }}</span>
                      <span v-if="notification.category" class="bg-gray-100 px-2 py-1 rounded-full">
                        {{ notification.category }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button 
                      v-if="!notification.read"
                      @click.stop="markAsRead(notification.id)"
                      class="w-2 h-2 bg-blue-500 rounded-full"
                      title="Đánh dấu đã đọc"
                    ></button>
                    <button 
                      @click.stop="deleteNotification(notification.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors duration-300"
                      title="Xóa thông báo"
                    >
                      <Icon name="ic:baseline-delete" class="text-lg" />
                    </button>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div v-if="notification.actions && notification.actions.length > 0" class="mt-4 flex space-x-3">
                  <button 
                    v-for="action in notification.actions"
                    :key="action.id"
                    @click.stop="handleAction(action, notification)"
                    :class="[
                      'px-4 py-2 text-sm rounded-lg transition-colors duration-300',
                      action.primary 
                        ? 'bg-system-primary-120 text-white hover:bg-system-primary-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="ic:baseline-notifications-none" class="text-4xl text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Không có thông báo nào</h3>
          <p class="text-gray-500">Bạn sẽ nhận được thông báo khi có hoạt động mới</p>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Icon name="ic:baseline-settings" class="text-2xl text-system-primary-120 mr-3" />
          Cài đặt thông báo
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">Thông báo qua email</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Đặt phòng thành công</span>
                <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Nhắc nhở check-in</span>
                <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Khuyến mãi đặc biệt</span>
                <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" />
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">Thông báo trong ứng dụng</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Cập nhật đơn đặt phòng</span>
                <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Voucher mới</span>
                <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Tin tức khách sạn</span>
                <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end pt-6 border-t border-gray-100">
          <button class="px-6 py-3 bg-system-primary-120 text-white rounded-xl hover:bg-system-primary-100 transition-colors duration-300">
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

// Filter management
const activeFilter = ref('all')
const filters = [
  { id: 'all', name: 'Tất cả', count: 0 },
  { id: 'unread', name: 'Chưa đọc', count: 0 },
  { id: 'booking', name: 'Đặt phòng', count: 0 },
  { id: 'promotion', name: 'Khuyến mãi', count: 0 },
  { id: 'system', name: 'Hệ thống', count: 0 }
]

// Mock notifications data
const notifications = ref([
  {
    id: 1,
    type: 'booking',
    title: 'Đặt phòng thành công',
    message: 'Bạn đã đặt phòng Deluxe thành công cho ngày 20/12/2024 - 22/12/2024',
    category: 'Đặt phòng',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 phút trước
    actions: [
      { id: 1, label: 'Xem chi tiết', primary: true },
      { id: 2, label: 'Hủy đặt phòng', primary: false }
    ]
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Voucher mới khả dụng',
    message: 'Bạn có voucher giảm giá 20% cho dịch vụ spa. Hãy sử dụng trước ngày 31/12/2024',
    category: 'Khuyến mãi',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 giờ trước
    actions: [
      { id: 1, label: 'Sử dụng ngay', primary: true }
    ]
  },
  {
    id: 3,
    type: 'system',
    title: 'Cập nhật hệ thống',
    message: 'Hệ thống đã được cập nhật với nhiều tính năng mới. Hãy trải nghiệm ngay!',
    category: 'Hệ thống',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 ngày trước
    actions: []
  },
  {
    id: 4,
    type: 'booking',
    title: 'Nhắc nhở check-in',
    message: 'Bạn có lịch check-in vào ngày mai. Hãy chuẩn bị giấy tờ cần thiết',
    category: 'Đặt phòng',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 ngày trước
    actions: [
      { id: 1, label: 'Xem chi tiết', primary: true }
    ]
  },
  {
    id: 5,
    type: 'promotion',
    title: 'Ưu đãi sinh nhật',
    message: 'Chúc mừng sinh nhật! Bạn được giảm giá 25% cho tất cả dịch vụ trong tháng này',
    category: 'Khuyến mãi',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 ngày trước
    actions: [
      { id: 1, label: 'Xem ưu đãi', primary: true }
    ]
  },
  {
    id: 6,
    type: 'system',
    title: 'Bảo trì hệ thống',
    message: 'Hệ thống sẽ bảo trì từ 02:00 - 04:00 ngày mai. Xin lỗi vì sự bất tiện',
    category: 'Hệ thống',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 ngày trước
    actions: []
  }
])

// Computed properties
const filteredNotifications = computed(() => {
  switch (activeFilter.value) {
    case 'unread':
      return notifications.value.filter(n => !n.read)
    case 'booking':
      return notifications.value.filter(n => n.type === 'booking')
    case 'promotion':
      return notifications.value.filter(n => n.type === 'promotion')
    case 'system':
      return notifications.value.filter(n => n.type === 'system')
    default:
      return notifications.value
  }
})

// Update filter counts
onMounted(() => {
  filters[1].count = notifications.value.filter(n => !n.read).length
  filters[2].count = notifications.value.filter(n => n.type === 'booking').length
  filters[3].count = notifications.value.filter(n => n.type === 'promotion').length
  filters[4].count = notifications.value.filter(n => n.type === 'system').length
})

// Methods
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'booking':
      return { icon: 'ic:baseline-hotel', bg: 'bg-blue-500' }
    case 'promotion':
      return { icon: 'ic:baseline-card-giftcard', bg: 'bg-green-500' }
    case 'system':
      return { icon: 'ic:baseline-info', bg: 'bg-purple-500' }
    default:
      return { icon: 'ic:baseline-notifications', bg: 'bg-gray-500' }
  }
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes} phút trước`
  } else if (hours < 24) {
    return `${hours} giờ trước`
  } else {
    return `${days} ngày trước`
  }
}

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
    // Update filter counts
    filters[1].count = notifications.value.filter(n => !n.read).length
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
  filters[1].count = 0
}

const deleteNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
    // Update filter counts
    filters[1].count = notifications.value.filter(n => !n.read).length
    filters[2].count = notifications.value.filter(n => n.type === 'booking').length
    filters[3].count = notifications.value.filter(n => n.type === 'promotion').length
    filters[4].count = notifications.value.filter(n => n.type === 'system').length
  }
}

const clearAll = () => {
  notifications.value = []
  filters.forEach(f => f.count = 0)
}

const handleAction = (action: NotificationAction, notification: Notification) => {
  // Action logic will be implemented when API is ready
  // For now, just show a message
  if (action.type === 'mark-read') {
    notification.isRead = true
  }
}
</script>
