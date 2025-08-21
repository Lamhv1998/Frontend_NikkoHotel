<template>
  <div class="min-h-screen">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="rounded-lg bg-white p-6 shadow-xl">
        <div class="flex items-center space-x-3">
          <div
            class="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
          ></div>
          <span class="text-lg font-semibold text-gray-700">Đang tải dữ liệu...</span>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mx-auto max-w-7xl p-6">
      <div class="rounded-lg bg-red-50 border border-red-200 p-4">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-red-800">{{ error }}</span>
          <button @click="retryLoad" class="ml-auto text-sm text-red-600 hover:text-red-800 underline">
            Thử lại
          </button>
        </div>
      </div>
    </div>

    <div class="mx-auto w-4/6 space-y-8 p-6">
      
      <!-- User Welcome Section -->
      <div 
        v-if="user" 
        class="rounded-3xl bg-gradient-to-r from-amber-500 to-yellow-600 p-8 text-white shadow-2xl"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div 
              class="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold backdrop-blur-sm"
            >
              {{ getInitials() }}
            </div>
            <div>
              <h1 class="mb-2 text-3xl font-bold">
                Xin chào, {{ getFullName() }}!
              </h1>
              <p v-if="customerProfile?.createdDate" class="text-amber-100">
                Thành viên từ {{ $dayjs(customerProfile.createdDate).format('MM/YYYY') }}
              </p>
              <p v-else class="text-amber-100">
                Thành viên mới
              </p>
              
              <!-- Customer Profile Info -->
              <div v-if="customerProfile" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-100">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span>ID: {{ customerProfile.customerId?.slice(0, 8) }}...</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Hạng: {{ getLevelText(customerProfile.level) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>Ngày sinh: {{ formatDate(customerProfile.dateOfBirth) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Địa chỉ: {{ customerProfile.address }}</span>
                </div>
              </div>
              
              <!-- No Customer Profile Message -->
              <div v-else class="mt-4 p-3 bg-yellow-500/20 rounded-lg">
                <p class="text-yellow-200 text-sm">Chưa có thông tin customer profile</p>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold">{{ user.email }}</div>
            <div class="text-amber-100">{{ user.phone || 'Chưa cập nhật' }}</div>
          </div>
        </div>
      </div>

  
      <!-- User Info Grid -->
      <div class="grid gap-8 lg:grid-cols-12">
        
        <!-- Profile Section -->
        <div class="lg:col-span-8">
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
              <h2 class="flex items-center text-2xl font-bold text-white">
                <svg class="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                Thông tin cá nhân
              </h2>
            </div>
            
            <div class="p-8">
              <changeInfo 
                v-if="user" 
                :user="user" 
                :customer-profile="customerProfile"
                @get-user-refresh="getUserRefresh" 
              />
            </div>
          </div>
        </div>

        <!-- Sidebar Actions -->
        <div class="space-y-6 lg:col-span-4">
          
          <!-- User Stats Card -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <h3 class="flex items-center text-xl font-bold text-white">
                <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                Thống kê thành viên
              </h3>
            </div>
            
            <div class="space-y-4 p-6">
              <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div class="relative flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg">
                      <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div>
                      <span class="font-semibold text-gray-900">Đơn đặt phòng</span>
                      <p class="text-xs text-gray-500">Tổng số đơn hàng</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-3xl font-bold text-blue-600">{{ getOrderCount() }}</span>
                    <p class="text-xs text-gray-500">đơn hàng</p>
                  </div>
                </div>
              </div>
              
              <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div class="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div class="relative flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 shadow-lg">
                      <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div>
                      <span class="font-semibold text-gray-900">Chi tiêu tích lũy</span>
                      <p class="text-xs text-gray-500">Tổng chi tiêu</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-2xl font-bold text-amber-600">{{ formatCurrency(getAccumulatedSpending()) }}</span>
                    <p class="text-xs text-gray-500">VND</p>
                  </div>
                </div>
              </div>
              
              <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div class="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div class="relative flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                      <svg class="h-6 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div>
                      <span class="font-semibold text-gray-900">Hạng thành viên</span>
                      <p class="text-xs text-gray-500">Cấp độ hiện tại</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-2xl font-bold text-green-600">{{ getLevelText(customerProfile?.level || '') }}</span>
                    <p class="text-xs text-gray-500">thành viên</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Change Password Card -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div class="flex items-center justify-between">
                <h3 class="flex items-center text-xl font-bold text-white">
                  <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  Bảo mật tài khoản
                </h3>
                <button 
                  @click="toggleSecuritySettings"
                  class="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  :title="showSecuritySettings ? 'Ẩn cài đặt' : 'Hiện cài đặt'"
                >
                  <svg 
                    class="w-5 h-5 text-white transition-transform duration-300"
                    :class="{ 'rotate-90': showSecuritySettings }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <ChangePwd v-if="user" :user="user" />
              
              <!-- Security Settings Panel -->
              <div v-if="showSecuritySettings" class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Cài đặt bảo mật
                </h4>
                
                <div class="space-y-4">
                  <!-- Two-Factor Authentication -->
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Xác thực 2 yếu tố</p>
                        <p class="text-sm text-gray-500">Bảo mật tài khoản với SMS/Email</p>
                      </div>
                    </div>
                    <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Bật
                    </button>
                  </div>
                  
                  <!-- Login Notifications -->
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V4a1 1 0 00-1-1H5a1 1 0 00-1 1v1zM4 11h6v-1H4v1z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Thông báo đăng nhập</p>
                        <p class="text-sm text-gray-500">Nhận thông báo khi có đăng nhập mới</p>
                      </div>
                    </div>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Bật
                    </button>
                  </div>
                  
                  <!-- Session Management -->
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Quản lý phiên đăng nhập</p>
                        <p class="text-sm text-gray-500">Xem và đăng xuất các thiết bị</p>
                      </div>
                    </div>
                    <button class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Quản lý
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <h3 class="flex items-center text-xl font-bold text-white">
                <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                Thao tác nhanh
              </h3>
            </div>
            
            <div class="space-y-4 p-6">
              <NuxtLink class="group block" to="/user/orders">
                <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div class="relative flex items-center">
                    <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg transition-transform group-hover:scale-110">
                      <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                        Đơn đặt phòng
                      </p>
                      <p class="text-sm text-gray-600">Xem lịch sử đặt phòng</p>
                    </div>
                    <svg class="ml-auto h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        d="M9 5l7 7-7 7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </div>
              </NuxtLink>

              <NuxtLink class="group block" to="/user/memberships">
                <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div class="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div class="relative flex items-center">
                    <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 shadow-lg transition-transform group-hover:scale-110">
                      <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                        Hạng thành viên
                      </p>
                      <p class="text-sm text-gray-600">Xem điểm tích lũy</p>
                    </div>
                    <svg class="ml-auto h-5 w-5 text-gray-400 transition-colors group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        d="M9 5l7 7-7 7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </div>
              </NuxtLink>

              <NuxtLink class="group block" to="/user/voucher">
                <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div class="relative flex items-center">
                    <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg transition-transform group-hover:scale-110">
                      <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                        Voucher
                      </p>
                      <p class="text-sm text-gray-600">Quản lý voucher</p>
                    </div>
                    <svg class="ml-auto h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        d="M9 5l7 7-7 7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Membership Status -->
      <div 
        v-if="user" 
        class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
      >
        <div class="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <h2 class="flex items-center text-2xl font-bold text-white">
            <svg class="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            Tình trạng thành viên
          </h2>
        </div>
        
        <div class="p-8">
          <MemberStatus :user="user" />
        </div>
      </div>

      <!-- Debug Section (Chỉ hiển thị trong development) -->
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChangePwd from './components/changePwd.vue'
import changeInfo from './components/changeInfo.vue'
import type { UserResponse } from '@/types/auth'
import MemberStatus from './memberships.vue'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* Global properties */
const { $dayjs } = useNuxtApp()

/* Auth store */
const authStore = useAuthStore()

/* Reactive state */
const isLoading = ref(false)
const error = ref<string | null>(null)
const showSecuritySettings = ref(false)

/* Get user from auth store using storeToRefs for better reactivity */
const { user, customerProfile } = storeToRefs(authStore)

/* Watch for store changes to debug */
watch([user, customerProfile], ([newUser, newCustomerProfile], [oldUser, oldCustomerProfile]) => {
  console.log('Store values changed:', {
    user: { old: oldUser as any, new: newUser as any },
    customerProfile: { old: oldCustomerProfile as any, new: newCustomerProfile as any }
  })
}, { immediate: true, deep: true })

/* Debug computed properties */
const debugUser = computed(() => {
  console.log('Debug user computed:', authStore.user)
  return authStore.user
})

const debugCustomerProfile = computed(() => {
  console.log('Debug customerProfile computed:', authStore.customerProfile)
  return authStore.customerProfile
})

/* Check authentication on mount */
onMounted(async () => {
  console.log('User page mounted, checking auth...')
  console.log('Initial store state before hydration:', {
    token: authStore.token,
    user: authStore.user,
    customerProfile: authStore.customerProfile
  })
  
  try {
    isLoading.value = true
    error.value = null
    
    // Hydrate store từ localStorage trước
    authStore.hydrateFromStorage()
    
    console.log('Store state after hydration:', {
      token: authStore.token,
      user: authStore.user,
      customerProfile: authStore.customerProfile
    })
    
    // Kiểm tra localStorage trực tiếp
    console.log('LocalStorage check:')
    const storedToken = localStorage.getItem('auth-token')
    const storedUser = localStorage.getItem('auth-user')
    const storedCustomerProfile = localStorage.getItem('auth-customerProfile')
    console.log('LocalStorage contents:', {
      token: storedToken ? 'Present' : 'Missing',
      user: storedUser ? 'Present' : 'Missing',
      customerProfile: storedCustomerProfile ? 'Present' : 'Missing'
    })
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log('Parsed user from localStorage:', parsedUser)
      } catch (e) {
        console.error('Error parsing user from localStorage:', e)
      }
    }
    
    if (storedCustomerProfile) {
      try {
        const parsedCustomerProfile = JSON.parse(storedCustomerProfile)
        console.log('Parsed customerProfile from localStorage:', parsedCustomerProfile)
      } catch (e) {
        console.error('Error parsing customerProfile from localStorage:', e)
      }
    }
    
    // Kiểm tra xem có cần fetch dữ liệu không
    let needsFetch = false
    
    if (!authStore.user) {
      console.log('No user data, need to fetch user info')
      needsFetch = true
    }
    
    if (!authStore.customerProfile && authStore.user) {
      console.log('User exists but no customer profile, need to fetch customer profile')
      needsFetch = true
    }
    
    if (needsFetch) {
      const { checkAuth } = useAuth()
      console.log('Calling checkAuth to fetch missing data...')
      await checkAuth()
      
      // Đợi một chút để đảm bảo store được cập nhật
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // Log current state
    console.log('Final auth state:', {
      token: authStore.token,
      user: authStore.user,
      customerProfile: authStore.customerProfile
    })
    
    // Log computed values
    console.log('Computed values:', {
      user: user.value,
      customerProfile: customerProfile.value
    })
    
    // Nếu vẫn không có customer profile, thử fetch lại
    if (authStore.user && !authStore.customerProfile) {
      console.log('Still no customer profile, trying to fetch again...')
      const { fetchCustomerProfile } = useAuth()
      const userId = authStore.user?.id || authStore.user?._id
      if (userId) {
        try {
          await fetchCustomerProfile(userId)
          console.log('Customer profile fetched successfully on retry')
        } catch (error) {
          console.error('Failed to fetch customer profile on retry:', error)
          // Không set error.value để không hiển thị lỗi cho user
        }
      }
    }
    
  } catch (err) {
    console.error('Error in onMounted:', err)
    error.value = 'Có lỗi xảy ra khi tải dữ liệu người dùng'
  } finally {
    isLoading.value = false
  }
})

/* Function to refresh user data */
const getUserRefresh = async () => {
  console.log('Refreshing user data...')
  const { fetchUserInfo, fetchCustomerProfile } = useAuth()
  
  try {
    const userInfo = await fetchUserInfo()
    // Sử dụng cả id và _id để tương thích
    const userId = userInfo?.id || userInfo?._id
    if (userId) {
      console.log('Using user ID for customer profile in refresh:', userId)
      await fetchCustomerProfile(userId)
    } else {
      console.log('No user ID found in refresh')
    }
  } catch (error) {
    console.error('Error refreshing user data:', error)
  }
}

/* Function to test customer service */
const testCustomerService = async () => {
  try {
    console.log('Testing customer service...')
    const { fetchCustomerProfile } = useAuth()
    
    // Sử dụng cả id và _id để tương thích
    const userId = user.value?.id || user.value?._id
    if (userId) {
      const result = await fetchCustomerProfile(userId)
      console.log('Customer service test result:', result)
      alert('Customer service test successful! Check console for details.')
    } else {
      alert('No user ID available for testing.')
    }
  } catch (error) {
    console.error('Error testing customer service:', error)
    alert('Customer service test failed. Check console for details.')
  }
}

/* Function to test customer service directly */
const testDirectCustomerService = async () => {
  try {
    console.log('Testing direct customer service...')
    
    // Sử dụng cả id và _id để tương thích
    const userId = user.value?.id || user.value?._id
    if (userId) {
      // Test trực tiếp với $fetch
      const config = useRuntimeConfig()
      const customerServiceUrl = config.public.customerServiceUrl
      const url = `${customerServiceUrl}/customers/profile/${userId}`
      
      console.log('Testing URL:', url)
      console.log('User ID:', userId)
      
      const response = await $fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Direct customer service response:', response)
      alert('Direct customer service test successful! Check console for details.')
    } else {
      alert('No user ID available for direct testing.')
    }
  } catch (error) {
    console.error('Error testing direct customer service:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      data: error.data
    })
    alert('Direct customer service test failed. Check console for details.')
  }
}

/* Function to retry loading data */
const retryLoad = async () => {
  console.log('Retrying to load data...')
  error.value = null
  
  try {
    isLoading.value = true
    
    // Hydrate store từ localStorage
    authStore.hydrateFromStorage()
    
    // Kiểm tra và fetch dữ liệu cần thiết
    if (!authStore.user) {
      const { checkAuth } = useAuth()
      await checkAuth()
    } else if (!authStore.customerProfile) {
      const { fetchCustomerProfile } = useAuth()
      const userId = authStore.user?.id || authStore.user?._id
      if (userId) {
        await fetchCustomerProfile(userId)
      }
    }
    
  } catch (err) {
    console.error('Error in retry:', err)
    error.value = 'Có lỗi xảy ra khi thử lại'
  } finally {
    isLoading.value = false
  }
}

/* Function to force refresh store from localStorage */
const forceRefreshStore = () => {
  console.log('Forcing store refresh from localStorage...')
  authStore.hydrateFromStorage()
  console.log('Store refreshed from localStorage. New state:', {
    token: authStore.token,
    user: authStore.user,
    customerProfile: authStore.customerProfile
  })
  alert('Store đã được làm mới từ localStorage.')
}

/* Function to log current store state */
const logStoreState = () => {
  console.log('Current Store State:', {
    token: authStore.token,
    user: authStore.user,
    customerProfile: authStore.customerProfile
  })
}

/* Function to check localStorage */
const checkLocalStorage = () => {
  console.log('Checking localStorage...')
  authStore.checkLocalStorage()
  
  // Also check directly
  const keys = Object.keys(localStorage)
  console.log('Local Storage Keys:', keys)
  
  const authKeys = keys.filter(key => key.startsWith('auth'))
  console.log('Auth-related keys:', authKeys)
  
  alert(`Local Storage Keys: ${keys.length}\nAuth Keys: ${authKeys.join(', ')}`)
}

/* Function to force fetch customer profile */
const forceFetchCustomerProfile = async () => {
  console.log('Forcing customer profile fetch...')
  const { fetchCustomerProfile } = useAuth()
  const userId = user.value?.id || user.value?._id
  if (userId) {
    try {
      await fetchCustomerProfile(userId)
      console.log('Customer profile fetched successfully after force fetch.')
      alert('Customer profile đã được làm mới từ server.')
    } catch (error) {
      console.error('Failed to force fetch customer profile:', error)
      alert('Làm mới customer profile thất bại. Xem console để biết thêm chi tiết.')
    }
  } else {
    alert('Không có User ID để làm mới customer profile.')
  }
}

/* Helper functions for customer profile display */
const getInitials = () => {
  if (!customerProfile.value) return 'U'
  const name = customerProfile.value.firstName || customerProfile.value.lastName
  if (!name) return 'U'
  return name.charAt(0).toUpperCase() + (name.split(' ')[1]?.charAt(0) || '').toUpperCase()
}

const getFullName = () => {
  if (!customerProfile.value) return 'User'
  const firstName = customerProfile.value.firstName || ''
  const lastName = customerProfile.value.lastName || ''
  if (!firstName && !lastName) return 'User'
  return `${firstName} ${lastName}`.trim()
}

const getLevelText = (level: string) => {
  switch (level?.toUpperCase()) {
    case 'SILVER':
      return 'Bạc'
    case 'GOLD':
      return 'Vàng'
    case 'PLATINUM':
      return 'Bạch kim'
    case 'DIAMOND':
      return 'Kim cương'
    case 'BRONZE':
      return 'Đồng'
    default:
      return 'Thành viên'
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Chưa có ngày sinh'
  return $dayjs(dateString).format('DD/MM/YYYY')
}

const formatCurrency = (amount: number | null) => {
  if (!amount) return '0 VND'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const getOrderCount = () => {
  // Mock data - trong thực tế sẽ lấy từ API
  return customerProfile.value ? 12 : 0
}

const getAccumulatedSpending = () => {
  return customerProfile.value?.accumulatedSpending || 0
}

const toggleSecuritySettings = () => {
  showSecuritySettings.value = !showSecuritySettings.value
}
</script>
