<template>
  <div class="min-h-screen bg-[#140F0A] p-4">
    <div class="mx-auto max-w-6xl space-y-8">
      <!-- Header Section -->
      <div class="py-8 text-center">
        <h1
          class="mb-2 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-4xl font-bold text-transparent"
        >
          Voucher của tôi
        </h1>
        <p class="text-gray-300">Quản lý và sử dụng voucher khuyến mãi</p>
      </div>

      <!-- Add Voucher Section -->
      <div
        class="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl backdrop-blur-sm"
      >
        <div class="p-8">
          <h2 class="mb-6 flex items-center text-2xl font-bold text-white">
            <svg
              class="mr-2 h-6 w-6 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
            Thêm voucher mới
          </h2>

          <div class="flex flex-col gap-4 md:flex-row">
            <div class="flex-1">
              <input
                v-model="newVoucherCode"
                class="w-full rounded-2xl border border-amber-500/30 bg-gray-800/50 px-6 py-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                type="text"
                placeholder="Nhập mã voucher..."
                @keyup.enter="addVoucher"
              />
            </div>
            <button
              class="transform rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-yellow-700 hover:shadow-amber-500/25"
              @click="addVoucher"
            >
              Thêm voucher
            </button>
          </div>

          <div
            v-if="addMessage"
            :class="
              addMessage.type === 'success'
                ? 'border border-emerald-500/30 bg-emerald-900/50 text-emerald-300'
                : 'border border-red-500/30 bg-red-900/50 text-red-300'
            "
            class="mt-4 rounded-xl p-4"
          >
            {{ addMessage.text }}
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div
        class="flex space-x-1 rounded-2xl border border-amber-500/20 bg-gray-900/50 p-2 backdrop-blur-sm"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="
            activeTab === tab.id
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
          "
          class="flex-1 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Available Vouchers Tab -->
      <div v-if="activeTab === 'available'" class="space-y-6">
        <h3 class="mb-4 text-xl font-bold text-white">
          Voucher khả dụng ({{ availableVouchers.length }})
        </h3>

        <div v-if="availableVouchers.length === 0" class="py-12 text-center">
          <svg
            class="mx-auto mb-4 h-16 w-16 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8h.01M12 16h.01"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
          <p class="text-gray-400">Bạn chưa có voucher nào</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="voucher in availableVouchers"
            :key="voucher.id"
            class="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10"
          >
            <!-- Voucher Type Badge -->
            <div class="p-6 pb-0">
              <div class="mb-4 flex items-start justify-between">
                <span
                  class="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-1 text-xs font-semibold text-white"
                >
                  {{ getVoucherTypeText(voucher.type) }}
                </span>
                <span class="text-sm text-gray-400">{{ formatExpiry(voucher.expiry) }}</span>
              </div>

              <!-- Discount Amount -->
              <div class="mb-4 text-center">
                <div class="mb-1 text-3xl font-bold text-amber-400">
                  {{
                    voucher.type === 'percentage'
                      ? voucher.value + '%'
                      : formatCurrency(voucher.value)
                  }}
                </div>
                <p class="text-sm text-gray-300">{{ voucher.description }}</p>
              </div>

              <!-- Voucher Code -->
              <div class="mb-4 rounded-xl border border-amber-500/20 bg-gray-900/50 p-3">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-sm text-amber-300">{{ voucher.code }}</span>
                  <button
                    class="text-amber-400 transition-colors hover:text-amber-300"
                    @click="copyVoucherCode(voucher.code)"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Conditions -->
              <div class="mb-4 text-xs text-gray-400">
                <p>• Đơn tối thiểu: {{ formatCurrency(voucher.minOrder) }}</p>
                <p v-if="voucher.maxDiscount">
                  • Giảm tối đa: {{ formatCurrency(voucher.maxDiscount) }}
                </p>
              </div>
            </div>

            <!-- Use Button -->
            <div class="p-6 pt-0">
              <button
                class="w-full transform rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-yellow-700"
                @click="useVoucher(voucher)"
              >
                Sử dụng ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Used Vouchers Tab -->
      <div v-if="activeTab === 'used'" class="space-y-6">
        <h3 class="mb-4 text-xl font-bold text-white">
          Lịch sử sử dụng ({{ usedVouchers.length }})
        </h3>

        <div v-if="usedVouchers.length === 0" class="py-12 text-center">
          <svg
            class="mx-auto mb-4 h-16 w-16 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
          <p class="text-gray-400">Chưa có lịch sử sử dụng voucher</p>
        </div>

        <div class="space-y-4">
          <div
            v-for="voucher in usedVouchers"
            :key="voucher.id"
            class="rounded-2xl border border-gray-600/30 bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-6 backdrop-blur-sm"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="mb-2 flex items-center space-x-3">
                  <span
                    class="rounded-full bg-gray-600 px-3 py-1 text-xs font-semibold text-gray-300"
                  >
                    Đã sử dụng
                  </span>
                  <span class="text-sm text-gray-400">{{ formatDate(voucher.usedDate) }}</span>
                </div>

                <h4 class="mb-1 font-semibold text-white">{{ voucher.description }}</h4>
                <p class="font-mono text-sm text-gray-400">{{ voucher.code }}</p>

                <div class="mt-3 text-sm text-gray-300">
                  <p>
                    Giá trị giảm:
                    <span class="font-semibold text-emerald-400">{{
                      formatCurrency(voucher.discountAmount)
                    }}</span>
                  </p>
                  <p>
                    Đơn hàng: <span class="text-amber-400">{{ voucher.orderCode }}</span>
                  </p>
                </div>
              </div>

              <div class="text-right">
                <div class="text-2xl font-bold text-gray-400 line-through">
                  {{
                    voucher.type === 'percentage'
                      ? voucher.value + '%'
                      : formatCurrency(voucher.value)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expired Vouchers Tab -->
      <div v-if="activeTab === 'expired'" class="space-y-6">
        <h3 class="mb-4 text-xl font-bold text-white">
          Voucher hết hạn ({{ expiredVouchers.length }})
        </h3>

        <div v-if="expiredVouchers.length === 0" class="py-12 text-center">
          <svg
            class="mx-auto mb-4 h-16 w-16 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
          <p class="text-gray-400">Không có voucher hết hạn</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="voucher in expiredVouchers"
            :key="voucher.id"
            class="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-900/30 to-gray-800/30 opacity-60 backdrop-blur-sm"
          >
            <div class="p-6">
              <div class="mb-4 flex items-start justify-between">
                <span class="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                  Hết hạn
                </span>
                <span class="text-sm text-red-400">{{ formatExpiry(voucher.expiry) }}</span>
              </div>

              <div class="mb-4 text-center">
                <div class="mb-1 text-3xl font-bold text-red-400 line-through">
                  {{
                    voucher.type === 'percentage'
                      ? voucher.value + '%'
                      : formatCurrency(voucher.value)
                  }}
                </div>
                <p class="text-sm text-gray-400">{{ voucher.description }}</p>
              </div>

              <div class="mb-4 rounded-xl border border-red-500/20 bg-gray-900/50 p-3">
                <span class="font-mono text-sm text-red-300">{{ voucher.code }}</span>
              </div>

              <button
                class="w-full cursor-not-allowed rounded-2xl bg-gray-700 py-3 font-semibold text-gray-400"
                disabled
              >
                Đã hết hạn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="mx-4 max-w-md rounded-3xl border border-amber-500/20 bg-gradient-to-br from-gray-900 to-gray-800 p-8"
      >
        <div class="text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600"
          >
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M5 13l4 4L19 7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold text-white">Thành công!</h3>
          <p class="mb-6 text-gray-300">{{ modalMessage }}</p>
          <button
            class="rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-amber-600 hover:to-yellow-700"
            @click="showModal = false"
          >
            Đóng
          </button>
        </div>
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
  vouchers.filter((v) => v.status === 'available' && new Date(v.expiry) > new Date())
)

const usedVouchers = computed(() => vouchers.filter((v) => v.status === 'used'))

const expiredVouchers = computed(() =>
  vouchers.filter(
    (v) => v.status === 'expired' || (v.status === 'available' && new Date(v.expiry) <= new Date())
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
  const exists = vouchers.find((v) => v.code === newVoucherCode.value.trim().toUpperCase())
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
    description: 'Voucher được thêm thủ công',
    minOrder: 200000,
    maxDiscount: 50000,
    expiry: '2025-12-31',
    status: 'available' as const
  }

  vouchers.push(newVoucher)
  newVoucherCode.value = ''
  addMessage.value = { type: 'success', text: 'Thêm voucher thành công!' }
  setTimeout(() => (addMessage.value = null), 3000)
}

const useVoucher = (voucher: any) => {
  // In real app, this would integrate with booking system
  voucher.status = 'used'
  voucher.usedDate = new Date().toISOString().split('T')[0]
  voucher.discountAmount =
    voucher.type === 'percentage'
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
