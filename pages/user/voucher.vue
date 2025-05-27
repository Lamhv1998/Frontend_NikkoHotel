<template>
  <div class="min-h-screen bg-[#140F0A] p-4">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
          Voucher của tôi
        </h1>
        <p class="text-gray-300">Quản lý và sử dụng voucher khuyến mãi</p>
      </div>

      <!-- Add Voucher Section -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/20 backdrop-blur-sm">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Thêm voucher mới
          </h2>
          
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <input 
                v-model="newVoucherCode"
                type="text" 
                placeholder="Nhập mã voucher..."
                class="w-full px-6 py-4 bg-gray-800/50 border border-amber-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                @keyup.enter="addVoucher"
              />
            </div>
            <button 
              @click="addVoucher"
              class="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-2xl hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              Thêm voucher
            </button>
          </div>
          
          <div v-if="addMessage" class="mt-4 p-4 rounded-xl" :class="addMessage.type === 'success' ? 'bg-emerald-900/50 border border-emerald-500/30 text-emerald-300' : 'bg-red-900/50 border border-red-500/30 text-red-300'">
            {{ addMessage.text }}
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex space-x-1 bg-gray-900/50 p-2 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
          :class="activeTab === tab.id 
            ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg' 
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Available Vouchers Tab -->
      <div v-if="activeTab === 'available'" class="space-y-6">
        <h3 class="text-xl font-bold text-white mb-4">Voucher khả dụng ({{ availableVouchers.length }})</h3>
        
        <div v-if="availableVouchers.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8h.01M12 16h.01"></path>
          </svg>
          <p class="text-gray-400">Bạn chưa có voucher nào</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="voucher in availableVouchers" 
            :key="voucher.id"
            class="bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-3xl overflow-hidden border border-amber-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02]"
          >
            <!-- Voucher Type Badge -->
            <div class="p-6 pb-0">
              <div class="flex justify-between items-start mb-4">
                <span class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold rounded-full">
                  {{ getVoucherTypeText(voucher.type) }}
                </span>
                <span class="text-gray-400 text-sm">{{ formatExpiry(voucher.expiry) }}</span>
              </div>
              
              <!-- Discount Amount -->
              <div class="text-center mb-4">
                <div class="text-3xl font-bold text-amber-400 mb-1">
                  {{ voucher.type === 'percentage' ? voucher.value + '%' : formatCurrency(voucher.value) }}
                </div>
                <p class="text-gray-300 text-sm">{{ voucher.description }}</p>
              </div>
              
              <!-- Voucher Code -->
              <div class="bg-gray-900/50 rounded-xl p-3 mb-4 border border-amber-500/20">
                <div class="flex justify-between items-center">
                  <span class="text-amber-300 font-mono text-sm">{{ voucher.code }}</span>
                  <button 
                    @click="copyVoucherCode(voucher.code)"
                    class="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Conditions -->
              <div class="text-xs text-gray-400 mb-4">
                <p>• Đơn tối thiểu: {{ formatCurrency(voucher.minOrder) }}</p>
                <p v-if="voucher.maxDiscount">• Giảm tối đa: {{ formatCurrency(voucher.maxDiscount) }}</p>
              </div>
            </div>
            
            <!-- Use Button -->
            <div class="p-6 pt-0">
              <button 
                @click="useVoucher(voucher)"
                class="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold py-3 rounded-2xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
              >
                Sử dụng ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Used Vouchers Tab -->
      <div v-if="activeTab === 'used'" class="space-y-6">
        <h3 class="text-xl font-bold text-white mb-4">Lịch sử sử dụng ({{ usedVouchers.length }})</h3>
        
        <div v-if="usedVouchers.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-400">Chưa có lịch sử sử dụng voucher</p>
        </div>

        <div class="space-y-4">
          <div 
            v-for="voucher in usedVouchers" 
            :key="voucher.id"
            class="bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-2xl p-6 border border-gray-600/30 backdrop-blur-sm"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <span class="px-3 py-1 bg-gray-600 text-gray-300 text-xs font-semibold rounded-full">
                    Đã sử dụng
                  </span>
                  <span class="text-gray-400 text-sm">{{ formatDate(voucher.usedDate) }}</span>
                </div>
                
                <h4 class="font-semibold text-white mb-1">{{ voucher.description }}</h4>
                <p class="text-gray-400 text-sm font-mono">{{ voucher.code }}</p>
                
                <div class="mt-3 text-sm text-gray-300">
                  <p>Giá trị giảm: <span class="text-emerald-400 font-semibold">{{ formatCurrency(voucher.discountAmount) }}</span></p>
                  <p>Đơn hàng: <span class="text-amber-400">{{ voucher.orderCode }}</span></p>
                </div>
              </div>
              
              <div class="text-right">
                <div class="text-2xl font-bold text-gray-400 line-through">
                  {{ voucher.type === 'percentage' ? voucher.value + '%' : formatCurrency(voucher.value) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expired Vouchers Tab -->
      <div v-if="activeTab === 'expired'" class="space-y-6">
        <h3 class="text-xl font-bold text-white mb-4">Voucher hết hạn ({{ expiredVouchers.length }})</h3>
        
        <div v-if="expiredVouchers.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-400">Không có voucher hết hạn</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="voucher in expiredVouchers" 
            :key="voucher.id"
            class="bg-gradient-to-br from-red-900/30 to-gray-800/30 rounded-3xl overflow-hidden border border-red-500/20 backdrop-blur-sm opacity-60"
          >
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                  Hết hạn
                </span>
                <span class="text-red-400 text-sm">{{ formatExpiry(voucher.expiry) }}</span>
              </div>
              
              <div class="text-center mb-4">
                <div class="text-3xl font-bold text-red-400 line-through mb-1">
                  {{ voucher.type === 'percentage' ? voucher.value + '%' : formatCurrency(voucher.value) }}
                </div>
                <p class="text-gray-400 text-sm">{{ voucher.description }}</p>
              </div>
              
              <div class="bg-gray-900/50 rounded-xl p-3 mb-4 border border-red-500/20">
                <span class="text-red-300 font-mono text-sm">{{ voucher.code }}</span>
              </div>
              
              <button 
                disabled
                class="w-full bg-gray-700 text-gray-400 font-semibold py-3 rounded-2xl cursor-not-allowed"
              >
                Đã hết hạn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-amber-500/20 max-w-md mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Thành công!</h3>
          <p class="text-gray-300 mb-6">{{ modalMessage }}</p>
          <button 
            @click="showModal = false"
            class="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-2xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

/* PageMeta */
definePageMeta({
  layout: 'user',
  // middleware: 'auth'  // COMMENT DÒNG NÀY ĐỂ TẠM THỜI BYPASS AUTH
})

// Reactive data
const activeTab = ref('available')
const newVoucherCode = ref('')
const showModal = ref(false)
const modalMessage = ref('')
const addMessage = ref<{type: 'success' | 'error', text: string} | null>(null)

const tabs = [
  { id: 'available', name: 'Khả dụng' },
  { id: 'used', name: 'Đã sử dụng' },
  { id: 'expired', name: 'Hết hạn' }
]

// Sample data
const vouchers = reactive([
  {
    id: 1,
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    description: 'Giảm 20% cho khách hàng mới',
    minOrder: 500000,
    maxDiscount: 100000,
    expiry: '2025-12-31',
    status: 'available'
  },
  {
    id: 2,
    code: 'SAVE50K',
    type: 'fixed',
    value: 50000,
    description: 'Giảm 50K cho đơn từ 300K',
    minOrder: 300000,
    maxDiscount: null,
    expiry: '2025-06-30',
    status: 'available'
  },
  {
    id: 3,
    code: 'LUXURY15',
    type: 'percentage',
    value: 15,
    description: 'Giảm 15% phòng hạng sang',
    minOrder: 1000000,
    maxDiscount: 200000,
    expiry: '2025-05-20',
    status: 'expired'
  },
  {
    id: 4,
    code: 'USED100K',
    type: 'fixed',
    value: 100000,
    description: 'Voucher đã sử dụng',
    minOrder: 500000,
    maxDiscount: null,
    expiry: '2025-08-15',
    status: 'used',
    usedDate: '2025-05-15',
    discountAmount: 100000,
    orderCode: 'NH20250515001'
  }
])

// Computed properties
const availableVouchers = computed(() => 
  vouchers.filter(v => v.status === 'available' && new Date(v.expiry) > new Date())
)

const usedVouchers = computed(() => 
  vouchers.filter(v => v.status === 'used')
)

const expiredVouchers = computed(() => 
  vouchers.filter(v => v.status === 'expired' || (v.status === 'available' && new Date(v.expiry) <= new Date()))
)

// Methods
const addVoucher = () => {
  if (!newVoucherCode.value.trim()) {
    addMessage.value = { type: 'error', text: 'Vui lòng nhập mã voucher' }
    setTimeout(() => addMessage.value = null, 3000)
    return
  }

  // Check if voucher already exists
  const exists = vouchers.find(v => v.code === newVoucherCode.value.trim().toUpperCase())
  if (exists) {
    addMessage.value = { type: 'error', text: 'Mã voucher đã tồn tại' }
    setTimeout(() => addMessage.value = null, 3000)
    return
  }

  // Simulate API call - in real app, this would validate with backend
  const newVoucher = {
    id: Date.now(),
    code: newVoucherCode.value.trim().toUpperCase(),
    type: 'percentage' as const,
    value: 10,
    description: 'Voucher được thêm thủ công',
    minOrder: 200000,
    maxDiscount: 50000,
    expiry: '2025-12-31',
    status: 'available' as const
  }

  vouchers.push(newVoucher)
  newVoucherCode.value = ''
  addMessage.value = { type: 'success', text: 'Thêm voucher thành công!' }
  setTimeout(() => addMessage.value = null, 3000)
}

const useVoucher = (voucher: any) => {
  // In real app, this would integrate with booking system
  voucher.status = 'used'
  voucher.usedDate = new Date().toISOString().split('T')[0]
  voucher.discountAmount = voucher.type === 'percentage' 
    ? Math.min(1000000 * (voucher.value / 100), voucher.maxDiscount || Infinity)
    : voucher.value
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