<template>
  <div class="min-h-screen bg-[rgb(225,209,194)] relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-yellow-600/10 rounded-full translate-x-40 translate-y-40"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10 p-6">
      <!-- Header Section -->
      <div class="text-center py-12 mb-12">
        <div class="relative">
          <!-- Decorative line above title -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          
          <h1 class="text-5xl xl:text-6xl font-bold text-amber-800 mb-6 mt-8 leading-tight">
            🎫 Voucher của tôi
          </h1>
          
          <!-- Decorative line below title -->
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
        
        <p class="text-amber-700 text-xl xl:text-2xl max-w-3xl mx-auto leading-relaxed">
          Quản lý và sử dụng các voucher ưu đãi tại Nikko Luxury Hotel
        </p>
      </div>

      <!-- Add Voucher Section -->
      <div class="mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="ic:baseline-add" class="text-2xl text-white" />
              </div>
              Thêm voucher mới
            </h2>
            
            <div class="flex gap-4">
              <input 
                v-model="newVoucherCode" 
                type="text" 
                placeholder="Nhập mã voucher..." 
                class="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                @keyup.enter="addVoucher"
              />
              <button 
                @click="addVoucher"
                class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Thêm voucher
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Voucher Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-check-circle" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ availableVouchers.length }}</p>
              <p class="text-sm text-gray-600 font-medium">Voucher khả dụng</p>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-history" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ usedVouchers.length }}</p>
              <p class="text-sm text-gray-600 font-medium">Đã sử dụng</p>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-schedule" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ expiredVouchers.length }}</p>
              <p class="text-sm text-gray-600 font-medium">Đã hết hạn</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Available Vouchers -->
      <div v-if="availableVouchers.length > 0" class="mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="ic:baseline-card-giftcard" class="text-2xl text-white" />
              </div>
              Voucher khả dụng
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="voucher in availableVouchers" :key="voucher.id" class="group/voucher relative">
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent rounded-2xl opacity-0 group-hover/voucher:opacity-100 transition-all duration-300"></div>
                <div class="relative bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300">
                  <div class="flex items-center justify-between mb-4">
                    <span class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {{ voucher.discount }}% OFF
                    </span>
                    <span class="text-emerald-600 text-sm font-medium">{{ voucher.type }}</span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ voucher.title }}</h3>
                  <p class="text-gray-600 text-sm mb-4">{{ voucher.description }}</p>
                  
                  <div class="space-y-2 mb-4">
                    <div class="flex items-center text-sm text-gray-600">
                      <Icon name="ic:baseline-calendar-today" class="mr-2" />
                      <span>Hết hạn: {{ formatDate(voucher.expiry) }}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <Icon name="ic:baseline-account-balance-wallet" class="mr-2" />
                      <span>Giá trị tối thiểu: {{ formatCurrency(voucher.minValue) }}</span>
                    </div>
                  </div>
                  
                  <button 
                    @click="useVoucher(voucher)"
                    class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Sử dụng ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Used Vouchers -->
      <div v-if="usedVouchers.length > 0" class="mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="ic:baseline-history" class="text-2xl text-white" />
              </div>
              Voucher đã sử dụng
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="voucher in usedVouchers" :key="voucher.id" class="group/voucher relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl opacity-0 group-hover/voucher:opacity-100 transition-all duration-300"></div>
                <div class="relative bg-white rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div class="flex items-center justify-between mb-4">
                    <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {{ voucher.discount }}% OFF
                    </span>
                    <span class="text-blue-600 text-sm font-medium">Đã sử dụng</span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ voucher.title }}</h3>
                  <p class="text-gray-600 text-sm mb-4">{{ voucher.description }}</p>
                  
                  <div class="space-y-2">
                    <div class="flex items-center text-sm text-gray-600">
                      <Icon name="ic:baseline-calendar-today" class="mr-2" />
                      <span>Đã sử dụng: {{ formatDate(voucher.usedAt) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expired Vouchers -->
      <div v-if="expiredVouchers.length > 0">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="ic:baseline-schedule" class="text-2xl text-white" />
              </div>
              Voucher đã hết hạn
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="voucher in expiredVouchers" :key="voucher.id" class="group/voucher relative">
                <div class="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover/voucher:opacity-100 transition-all duration-300"></div>
                <div class="relative bg-white rounded-2xl p-6 border border-red-100 hover:shadow-lg transition-all duration-300">
                  <div class="flex items-center justify-between mb-4">
                    <span class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {{ voucher.discount }}% OFF
                    </span>
                    <span class="text-red-600 text-sm font-medium">Đã hết hạn</span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ voucher.title }}</h3>
                  <p class="text-gray-600 text-sm mb-4">{{ voucher.description }}</p>
                  
                  <div class="space-y-2">
                    <div class="flex items-center text-sm text-gray-600">
                      <Icon name="ic:baseline-calendar-today" class="mr-2" />
                      <span>Hết hạn: {{ formatDate(voucher.expiry) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="allVouchers.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="ic:baseline-card-giftcard" class="text-4xl text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-600 mb-2">Chưa có voucher nào</h3>
        <p class="text-gray-500">Hãy thêm voucher đầu tiên để bắt đầu sử dụng ưu đãi</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

/* PageMeta */
definePageMeta({
  layout: 'user'
  // middleware: 'auth'  // COMMENT DÒNG NÀY ĐỂ TẠM THỜI BYPASS AUTH
})

// Reactive data
const activeTab = ref('available')
const newVoucherCode = ref('')
const showModal = ref(false)
const modalMessage = ref('')
const addMessage = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const tabs = [
  { id: 'available', name: 'Khả dụng' },
  { id: 'used', name: 'Đã sử dụng' },
  { id: 'expired', name: 'Hết hạn' }
]



// Tạo một mảng tổng hợp cho tất cả voucher
const allVouchers = ref([
  {
    id: 1,
    code: 'SUMMER20',
    title: 'Giảm giá mùa hè',
    description: 'Giảm giá 20% cho tất cả dịch vụ',
    type: 'percentage',
    value: 20,
    expiry: '2024-12-31',
    minOrder: 500000,
    isLimited: true,
    remaining: 5,
    status: 'available'
  },
  {
    id: 2,
    code: 'SPA50',
    title: 'Spa thư giãn',
    description: 'Giảm giá 50% cho dịch vụ spa',
    type: 'percentage',
    value: 50,
    expiry: '2024-11-30',
    minOrder: 200000,
    isLimited: false,
    remaining: null,
    status: 'available'
  },
  {
    id: 3,
    code: 'WELCOME100',
    title: 'Chào mừng thành viên mới',
    description: 'Giảm giá 100k cho đơn hàng đầu tiên',
    type: 'fixed',
    value: 100000,
    expiry: '2024-12-31',
    minOrder: 300000,
    isLimited: true,
    remaining: 10,
    status: 'available'
  },
  {
    id: 4,
    code: 'HOTEL30',
    title: 'Khách sạn cao cấp',
    description: 'Giảm giá 30% cho phòng premium',
    type: 'percentage',
    value: 30,
    expiry: '2024-10-15',
    minOrder: 1000000,
    isLimited: false,
    remaining: null,
    status: 'used',
    usedAt: '2024-10-10',
    orderCode: 'NH20241010001'
  },
  {
    id: 5,
    code: 'SPRING25',
    title: 'Mùa xuân rực rỡ',
    description: 'Giảm giá 25% cho dịch vụ mùa xuân',
    type: 'percentage',
    value: 25,
    expiry: '2024-09-30',
    minOrder: 400000,
    isLimited: false,
    remaining: null,
    status: 'expired'
  }
])

// Computed properties
const availableVouchers = computed(() =>
  allVouchers.value.filter((v) => v.status === 'available' && new Date(v.expiry) > new Date())
)

const usedVouchers = computed(() => 
  allVouchers.value.filter((v) => v.status === 'used')
)

const expiredVouchers = computed(() =>
  allVouchers.value.filter((v) => 
    v.status === 'expired' || (v.status === 'available' && new Date(v.expiry) <= new Date())
  )
)

// Methods
const addVoucher = () => {
  if (!newVoucherCode.value.trim()) {
    addMessage.value = { type: 'error', text: 'Vui lòng nhập mã voucher' }
    setTimeout(() => (addMessage.value = null), 3000)
    return
  }

  // Check if voucher already exists
  const exists = allVouchers.value.find((v) => v.code === newVoucherCode.value.trim().toUpperCase())
  if (exists) {
    addMessage.value = { type: 'error', text: 'Mã voucher đã tồn tại' }
    setTimeout(() => (addMessage.value = null), 3000)
    return
  }

  // Simulate API call - in real app, this would validate with backend
  const newVoucher = {
    id: Date.now(),
    code: newVoucherCode.value.trim().toUpperCase(),
    type: 'percentage' as const,
    value: 10,
    title: 'Voucher được thêm thủ công',
    description: 'Voucher được thêm thủ công',
    minOrder: 200000,
    isLimited: false,
    remaining: null,
    expiry: '2025-12-31',
    status: 'available' as const
  }

  allVouchers.value.push(newVoucher)
  newVoucherCode.value = ''
  addMessage.value = { type: 'success', text: 'Thêm voucher thành công!' }
  setTimeout(() => (addMessage.value = null), 3000)
}

const useVoucher = (voucher: any) => {
  // In real app, this would integrate with booking system
  voucher.status = 'used'
  voucher.usedAt = new Date().toISOString().split('T')[0]
  voucher.orderCode = 'NH' + Date.now()

  modalMessage.value = `Voucher ${voucher.code} đã được áp dụng thành công!`
  showModal.value = true
}

const copyVoucherCode = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    modalMessage.value = `Đã copy mã: ${code}`
    showModal.value = true
  })
}

const getVoucherTypeText = (type: string) => {
  return type === 'percentage' ? 'Giảm %' : 'Giảm tiền'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatExpiry = (date: string) => {
  const expiry = new Date(date)
  const now = new Date()
  const diffTime = expiry.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'Đã hết hạn'
  if (diffDays === 0) return 'Hết hạn hôm nay'
  if (diffDays === 1) return 'Hết hạn mai'
  if (diffDays <= 7) return `Còn ${diffDays} ngày`

  return expiry.toLocaleDateString('vi-VN')
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
