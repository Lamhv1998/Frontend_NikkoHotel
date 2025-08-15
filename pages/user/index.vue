<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold text-system-primary-120 mb-4">
          👋 Chào mừng trở lại, {{ userData.name.fullName }}!
        </h1>
        <p class="text-gray-600 text-lg">Quản lý tài khoản và theo dõi hoạt động của bạn</p>
      </div>

      <!-- Quick Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Icon name="ic:baseline-hotel" class="text-2xl text-blue-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Tổng đặt phòng</p>
              <p class="text-2xl font-bold text-gray-800">{{ userData.totalOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <Icon name="ic:baseline-card-giftcard" class="text-2xl text-green-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Voucher hiện có</p>
              <p class="text-2xl font-bold text-gray-800">{{ userData.activeVouchers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
              <Icon name="ic:baseline-star" class="text-2xl text-amber-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Điểm tích lũy</p>
              <p class="text-2xl font-bold text-gray-800">{{ userData.points }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
              <Icon name="ic:baseline-account-circle" class="text-2xl text-purple-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Hạng thành viên</p>
              <p class="text-2xl font-bold text-gray-800">{{ userData.membershipLevel }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column - Account Management -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Thông tin cơ bản -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Icon name="ic:baseline-person" class="text-2xl text-system-primary-120 mr-3" />
              Thông tin tài khoản
            </h2>
            <changeInfo :user="userData" @get-user-refresh="getUserRefresh" />
          </div>

          <!-- Đổi mật khẩu -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Icon name="ic:baseline-lock" class="text-2xl text-system-primary-120 mr-3" />
              Bảo mật tài khoản
            </h2>
            <ChangePwd :user="userData" />
          </div>
        </div>

        <!-- Right Column - Quick Actions & Status -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Trạng thái thành viên -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Hạng thành viên</h3>
            <MemberStatus :user="userData" />
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Thao tác nhanh</h3>
            <div class="space-y-3">
              <button 
                @click="navigateToOrders"
                class="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div class="flex items-center">
                  <Icon name="ic:baseline-receipt" class="text-xl text-system-primary-120 mr-3" />
                  <span class="text-gray-700">Xem lịch sử đặt phòng</span>
                </div>
              </button>
              
              <button 
                @click="navigateToVouchers"
                class="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div class="flex items-center">
                  <Icon name="ic:baseline-card-giftcard" class="text-xl text-system-primary-120 mr-3" />
                  <span class="text-gray-700">Quản lý voucher</span>
                </div>
              </button>
              
              <button 
                @click="navigateToRooms"
                class="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div class="flex items-center">
                  <Icon name="ic:baseline-hotel" class="text-xl text-system-primary-120 mr-3" />
                  <span class="text-gray-700">Đặt phòng mới</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h3>
            <div class="space-y-3">
              <div class="flex items-center text-sm text-gray-600">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Đăng nhập thành công</span>
                <span class="ml-auto text-xs">Hôm nay</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Cập nhật thông tin cá nhân</span>
                <span class="ml-auto text-xs">2 ngày trước</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <div class="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <span>Thu thập voucher mới</span>
                <span class="ml-auto text-xs">1 tuần trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChangePwd from './components/changePwd.vue'
import changeInfo from './components/changeInfo.vue'
import MemberStatus from './memberships.vue'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
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

// Navigation methods
const navigateToOrders = () => {
  navigateTo('/user/orders')
}

const navigateToVouchers = () => {
  navigateTo('/user/voucher')
}

const navigateToRooms = () => {
  navigateTo('/rooms')
}

// Refresh user data (placeholder)
const getUserRefresh = () => {
  console.log('Refreshing user data...')
}
</script>
