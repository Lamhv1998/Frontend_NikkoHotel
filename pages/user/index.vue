<template>
  <div class="min-h-screen  bg-[#140F0A]">
    <div class="mx-auto max-w-7xl p-6 space-y-8">
      
      <!-- User Welcome Section -->
      <div v-if="user" class="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl p-8 text-white shadow-2xl">
        <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-6">
              <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
                {{ (user.firstName + ' ' + user.lastName).charAt(0).toUpperCase() }}
              </div>
              <div>
                <h1 class="text-3xl font-bold mb-2">Xin chào, {{ user.firstName + ' ' + user.lastName }}!</h1>
                <p class="text-amber-100">Thành viên từ {{ $dayjs(user.createdDate).format('MM/YYYY') }}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">{{ user.level }}</div>
              <div class="text-amber-100">{{ user.accumulatedSpending?.toLocaleString() || 0 }} VNĐ</div>
            </div>
        </div>
      </div>

      <!-- User Info Grid -->
      <div class="grid gap-8 lg:grid-cols-12">
        
        <!-- Profile Section -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Thông tin cá nhân
              </h2>
            </div>
            
            <div class="p-8">
              <changeInfo v-if="user" :user="user" @get-user-refresh="getUserRefresh" />
            </div>
          </div>
        </div>

        <!-- Sidebar Actions -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- User Stats Card -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <h3 class="text-xl font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Thống kê
              </h3>
            </div>
            
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <span class="font-semibold text-gray-900">Đơn đặt phòng</span>
                </div>
                <span class="text-2xl font-bold text-blue-600">0</span>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <span class="font-semibold text-gray-900">Điểm tích lũy</span>
                </div>
                <span class="text-2xl font-bold text-amber-600">{{ user?.accumulatedSpending?.toLocaleString() || 0 }}</span>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                  </div>
                  <span class="font-semibold text-gray-900">Hạng thành viên</span>
                </div>
                <span class="text-lg font-bold text-green-600">{{ user?.level || 'Bronze' }}</span>
              </div>
            </div>
          </div>

          <!-- Change Password Card -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <h3 class="text-xl font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Bảo mật
              </h3>
            </div>
            
            <div class="p-6">
              <ChangePwd v-if="user" :user="user" />
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <h3 class="text-xl font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Thao tác nhanh
              </h3>
            </div>
            
            <div class="p-6 space-y-4">
              <NuxtLink to="/user/orders" class="block group">
                <div class="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 group-hover:shadow-md">
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Đơn đặt phòng</p>
                    <p class="text-sm text-gray-600">Xem lịch sử đặt phòng</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </NuxtLink>

              <NuxtLink to="/user/memberships" class="block group">
                <div class="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-all duration-300 group-hover:shadow-md">
                  <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">Hạng thành viên</p>
                    <p class="text-sm text-gray-600">Xem điểm tích lũy</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 ml-auto group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </NuxtLink>

              <NuxtLink to="/user/voucher" class="block group">
                <div class="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all duration-300 group-hover:shadow-md">
                  <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Voucher</p>
                    <p class="text-sm text-gray-600">Quản lý voucher</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Membership Status -->
      <div v-if="user" class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div class="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            Tình trạng thành viên
          </h2>
        </div>
        
        <div class="p-8">
          <MemberStatus :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChangePwd from './components/changePwd.vue'
import changeInfo from './components/changeInfo.vue'
import type { CustomerResponse } from '@/types/customer'
import MemberStatus from './components/MemberStatus.vue'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* Global properties */
const { $dayjs } = useNuxtApp()

/* api */
const { getCurrentCustomerApi } = useApi()

// api: Lấy thông tin customer từ database
const { data: user, refresh: getUserRefresh } = await getCurrentCustomerApi({
  server: false,
  transform(res: any): CustomerResponse {
    return res.result
  }
})

// Update auth store with user info
const authStore = useAuthStore()
watchEffect(() => {
  if (user.value) {
    authStore.userName = user.value.firstName + ' ' + user.value.lastName
    authStore.email = user.value.firstName + ' ' + user.value.lastName
    authStore.id = user.value.customerId
  }
})
</script>
