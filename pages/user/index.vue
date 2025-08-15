<template>
  <div class="min-h-screen bg-[rgb(225,209,194)] relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-yellow-600/10 rounded-full translate-x-40 translate-y-40"></div>
      <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-700/10 rounded-full"></div>
    </div>

    <div class="max-w-7xl mx-auto space-y-8 relative z-10 p-6">
      <!-- Header Section -->
      <div class="text-center py-12">
        <div class="relative">
          <!-- Decorative line above title -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          
          <h1 class="text-5xl xl:text-6xl font-bold text-amber-800 mb-6 mt-8 leading-tight">
            👋 Chào mừng trở lại, {{ userData.name.fullName }}!
          </h1>
          
          <!-- Decorative line below title -->
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
        
        <p class="text-amber-700 text-xl xl:text-2xl max-w-3xl mx-auto leading-relaxed">
          Quản lý tài khoản và theo dõi hoạt động của bạn tại Nikko Luxury Hotel
        </p>
      </div>

      <!-- Quick Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <Icon name="ic:baseline-hotel" class="text-3xl text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-600 font-medium">Tổng đặt phòng</p>
                <p class="text-3xl font-bold text-gray-800">{{ userData.totalOrders }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <Icon name="ic:baseline-card-giftcard" class="text-3xl text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-600 font-medium">Voucher hiện có</p>
                <p class="text-3xl font-bold text-gray-800">{{ userData.activeVouchers }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <Icon name="ic:baseline-star" class="text-3xl text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-600 font-medium">Điểm tích lũy</p>
                <p class="text-3xl font-bold text-gray-800">{{ userData.points }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                <Icon name="ic:baseline-account-circle" class="text-3xl text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-600 font-medium">Hạng thành viên</p>
                <p class="text-3xl font-bold text-gray-800">{{ userData.membershipLevel }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Left Column - Account Management -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Thông tin cơ bản -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ic:baseline-person" class="text-2xl text-white" />
                </div>
                Thông tin tài khoản
              </h2>
              <changeInfo :user="userData" @get-user-refresh="getUserRefresh" />
            </div>
          </div>

    <!-- Đổi mật khẩu -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ic:baseline-lock" class="text-2xl text-white" />
                </div>
                Bảo mật tài khoản
              </h2>
              <ChangePwd :user="userData" />
            </div>
          </div>
        </div>

        <!-- Right Column - Quick Actions & Status -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Quick Actions -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Icon name="ic:baseline-bolt" class="text-xl text-white" />
                </div>
                Thao tác nhanh
              </h3>
              <div class="space-y-4">
                <button @click="navigateToOrders" class="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:shadow-lg group/btn">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover/btn:shadow-lg transition-all duration-300">
                      <Icon name="ic:baseline-receipt" class="text-xl text-white" />
                    </div>
                    <span class="text-gray-700 font-medium group-hover/btn:text-blue-700 transition-colors duration-300">Xem lịch sử đặt phòng</span>
                  </div>
                </button>
                
                <button @click="navigateToVouchers" class="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 border border-gray-200 hover:border-emerald-200 hover:shadow-lg group/btn">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover/btn:shadow-lg transition-all duration-300">
                      <Icon name="ic:baseline-card-giftcard" class="text-xl text-white" />
                    </div>
                    <span class="text-gray-700 font-medium group-hover/btn:text-emerald-700 transition-colors duration-300">Quản lý voucher</span>
                  </div>
                </button>
                
                <button @click="navigateToRooms" class="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-purple-100 transition-all duration-300 border border-gray-200 hover:border-purple-200 hover:shadow-lg group/btn">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover/btn:shadow-lg transition-all duration-300">
                      <Icon name="ic:baseline-hotel" class="text-xl text-white" />
                    </div>
                    <span class="text-gray-700 font-medium group-hover/btn:text-purple-700 transition-colors duration-300">Đặt phòng mới</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Icon name="ic:baseline-timeline" class="text-xl text-white" />
                </div>
                Hoạt động gần đây
              </h3>
              <div class="space-y-4">
                <div class="flex items-center text-sm text-gray-600 p-3 rounded-xl bg-gradient-to-r from-green-50 to-transparent border border-green-100">
                  <div class="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 shadow-sm"></div>
                  <span>Đăng nhập thành công</span>
                  <span class="ml-auto text-xs text-green-600 font-medium">Hôm nay</span>
                </div>
                <div class="flex items-center text-sm text-gray-600 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100">
                  <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 shadow-sm"></div>
                  <span>Cập nhật thông tin cá nhân</span>
                  <span class="ml-auto text-xs text-blue-600 font-medium">2 ngày trước</span>
                </div>
                <div class="flex items-center text-sm text-gray-600 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-transparent border border-yellow-100">
                  <div class="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3 shadow-sm"></div>
                  <span>Thu thập voucher mới</span>
                  <span class="ml-auto text-xs text-yellow-600 font-medium">1 tuần trước</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Status -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Icon name="ic:baseline-verified" class="text-xl text-white" />
                </div>
                Trạng thái tài khoản
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-50 to-transparent border border-green-100">
                  <span class="text-gray-700 font-medium">Email xác thực</span>
                  <span class="text-green-600 text-sm font-bold flex items-center">
                    <Icon name="ic:baseline-check-circle" class="text-lg mr-1" />
                    Đã xác thực
                  </span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-50 to-transparent border border-green-100">
                  <span class="text-gray-700 font-medium">Số điện thoại</span>
                  <span class="text-green-600 text-sm font-bold flex items-center">
                    <Icon name="ic:baseline-check-circle" class="text-lg mr-1" />
                    Đã xác thực
                  </span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-transparent border border-yellow-100">
                  <span class="text-gray-700 font-medium">Bảo mật 2FA</span>
                  <span class="text-yellow-600 text-sm font-bold flex items-center">
                    <Icon name="ic:baseline-warning" class="text-lg mr-1" />
                    Chưa bật
                  </span>
                </div>
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
const router = useRouter()

const navigateToOrders = () => {
  router.push('/user/orders')
}

const navigateToVouchers = () => {
  router.push('/user/voucher')
}

const navigateToRooms = () => {
  router.push('/rooms')
}

// Refresh user data (placeholder)
const getUserRefresh = () => {
  // Refresh user data logic here
  // This will be implemented when API is ready
}
</script>
