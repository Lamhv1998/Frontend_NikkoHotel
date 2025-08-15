<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold text-system-primary-120 mb-4">
          👤 Hồ sơ cá nhân
        </h1>
        <p class="text-gray-600 text-lg">Quản lý thông tin cá nhân và tùy chọn tài khoản</p>
      </div>

      <!-- Profile Overview Card -->
      <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div class="flex items-center space-x-6 mb-8">
          <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-system-primary-120 to-system-primary-80 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {{ userInitials }}
            </div>
            <button class="absolute -bottom-2 -right-2 w-8 h-8 bg-system-primary-120 rounded-full flex items-center justify-center text-white hover:bg-system-primary-100 transition-colors duration-300">
              <Icon name="ic:baseline-camera-alt" class="text-sm" />
            </button>
          </div>
          
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{ user?.name?.fullName || 'Thành viên' }}
            </h2>
            <p class="text-gray-600 mb-2">{{ user?.email || 'email@example.com' }}</p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span class="flex items-center">
                <Icon name="ic:baseline-calendar-today" class="mr-1" />
                Tham gia từ {{ joinDate }}
              </span>
              <span class="flex items-center">
                <Icon name="ic:baseline-location-on" class="mr-1" />
                {{ user?.address?.city || 'Chưa cập nhật' }}
              </span>
            </div>
          </div>
          
          <div class="text-right">
            <div class="text-3xl font-bold text-system-primary-120 mb-1">
              {{ user?.points || 0 }}
            </div>
            <p class="text-sm text-gray-600">Điểm tích lũy</p>
          </div>
        </div>

        <!-- Profile Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 border-t border-gray-100">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600 mb-1">{{ totalOrders }}</div>
            <p class="text-sm text-gray-600">Đơn đặt phòng</p>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600 mb-1">{{ totalSpent }}</div>
            <p class="text-sm text-gray-600">Tổng chi tiêu</p>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-amber-600 mb-1">{{ activeVouchers }}</div>
            <p class="text-sm text-gray-600">Voucher hiện có</p>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600 mb-1">{{ membershipLevel }}</div>
            <p class="text-sm text-gray-600">Hạng thành viên</p>
          </div>
        </div>
      </div>

      <!-- Settings Tabs -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="border-b border-gray-100">
          <nav class="flex space-x-1 p-4">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm',
                activeTab === tab.id
                  ? 'bg-system-primary-120 text-white shadow-md'
                  : 'text-gray-600 hover:text-system-primary-120 hover:bg-gray-50'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- Personal Information Tab -->
          <div v-if="activeTab === 'personal'" class="space-y-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input 
                  v-model="profileData.fullName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  v-model="profileData.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent"
                  placeholder="Nhập email"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input 
                  v-model="profileData.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                <input 
                  v-model="profileData.birthday"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                <textarea 
                  v-model="profileData.address"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent"
                  placeholder="Nhập địa chỉ chi tiết"
                ></textarea>
              </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button class="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                Hủy
              </button>
              <button class="px-6 py-3 bg-system-primary-120 text-white rounded-xl hover:bg-system-primary-100 transition-colors duration-300">
                Lưu thay đổi
              </button>
            </div>
          </div>

          <!-- Security Tab -->
          <div v-if="activeTab === 'security'" class="space-y-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Bảo mật tài khoản</h3>
            
            <div class="space-y-6">
              <div class="border border-gray-200 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="font-semibold text-gray-800">Mật khẩu</h4>
                    <p class="text-sm text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                  </div>
                  <button class="px-4 py-2 bg-system-primary-120 text-white rounded-lg hover:bg-system-primary-100 transition-colors duration-300">
                    Thay đổi
                  </button>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="font-semibold text-gray-800">Xác thực 2 yếu tố</h4>
                    <p class="text-sm text-gray-600">Bảo vệ tài khoản với mã xác thực</p>
                  </div>
                  <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                    Bật
                  </button>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="font-semibold text-gray-800">Đăng nhập từ thiết bị mới</h4>
                    <p class="text-sm text-gray-600">Nhận thông báo khi có đăng nhập mới</p>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preferences Tab -->
          <div v-if="activeTab === 'preferences'" class="space-y-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Tùy chọn cá nhân</h3>
            
            <div class="space-y-6">
              <div class="border border-gray-200 rounded-xl p-6">
                <h4 class="font-semibold text-gray-800 mb-4">Thông báo</h4>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-700">Email marketing</span>
                    <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-700">Thông báo khuyến mãi</span>
                    <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-700">Cập nhật dịch vụ</span>
                    <input type="checkbox" class="w-4 h-4 text-system-primary-120 rounded focus:ring-system-primary-120" checked />
                  </div>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-xl p-6">
                <h4 class="font-semibold text-gray-800 mb-4">Ngôn ngữ</h4>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              
              <div class="border border-gray-200 rounded-xl p-6">
                <h4 class="font-semibold text-gray-800 mb-4">Múi giờ</h4>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-system-primary-120 focus:border-transparent">
                  <option value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">GMT-5 (New York)</option>
                </select>
              </div>
            </div>
            
            <div class="flex justify-end pt-6 border-t border-gray-100">
              <button class="px-6 py-3 bg-system-primary-120 text-white rounded-xl hover:bg-system-primary-100 transition-colors duration-300">
                Lưu tùy chọn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserResponse } from '@/types'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* api */
const { getUserApi } = useApi()

// api: Lấy thông tin thành viên
const { data: user } = await getUserApi({
  server: false,
  transform(res: any): UserResponse {
    return res.result
  }
})

// Dữ liệu mẫu cho user
const userData = ref({
  _id: '1',
  name: {
    fullName: 'Nguyễn Văn A'
  },
  email: 'nguyenvana@example.com',
  phone: '0901234567',
  dateOfBirth: '1990-01-01',
  address: {
    detail: '123 Đường ABC, Quận 1, TP.HCM',
    city: 'TP.HCM'
  },
  points: 1250,
  membershipLevel: 'Silver',
  totalOrders: 8,
  activeVouchers: 3,
  totalSpent: 15000000,
  createdAt: '2023-01-15'
})

// Tab management
const activeTab = ref('personal')
const tabs = [
  { id: 'personal', name: 'Thông tin cá nhân' },
  { id: 'security', name: 'Bảo mật' },
  { id: 'preferences', name: 'Tùy chọn' }
]

// Profile data
const profileData = ref({
  fullName: userData.value.name.fullName,
  email: userData.value.email,
  phone: userData.value.phone,
  birthday: userData.value.dateOfBirth,
  address: userData.value.address.detail
})

// Computed properties
const userInitials = computed(() => {
  if (userData.value.name.fullName) {
    return userData.value.name.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
  }
  return 'U'
})

const joinDate = computed(() => {
  if (userData.value.createdAt) {
    return new Date(userData.value.createdAt).toLocaleDateString('vi-VN')
  }
  return 'Chưa cập nhật'
})

const totalOrders = computed(() => userData.value.totalOrders)
const totalSpent = computed(() => userData.value.totalSpent)
const activeVouchers = computed(() => userData.value.activeVouchers)
const membershipLevel = computed(() => userData.value.membershipLevel)
</script>
