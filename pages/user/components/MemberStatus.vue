<template>
  <div class="space-y-6">
    <!-- Current Status -->
    <div class="grid gap-6 md:grid-cols-3">
      <div class="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-amber-700">Hạng hiện tại</p>
            <p class="text-2xl font-bold text-amber-800">{{ memberLevel }}</p>
          </div>
          <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-700">Điểm tích lũy</p>
            <p class="text-2xl font-bold text-blue-800">{{ user?.accumulatedSpending?.toLocaleString() || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-700">Đơn đặt phòng</p>
            <p class="text-2xl font-bold text-green-800">{{ user?.totalOrders || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress to Next Level -->
    <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Tiến độ lên hạng</h3>
        <span class="text-sm text-gray-600">{{ pointsToNextLevel }} điểm nữa</span>
      </div>
      
      <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          class="bg-gradient-to-r from-amber-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      
      <div class="flex justify-between text-sm text-gray-600">
        <span>{{ user?.accumulatedSpending || 0 }} điểm</span>
        <span>{{ nextLevelPoint }} điểm</span>
      </div>
    </div>

    <!-- Benefits -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200">
      <h3 class="text-lg font-semibold text-amber-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
        </svg>
        Đặc quyền hiện tại
      </h3>
      
      <div class="grid gap-3 md:grid-cols-2">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <span class="text-amber-800">{{ getCurrentBenefits() }}</span>
        </div>
        
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <span class="text-amber-800">Ưu tiên đặt phòng</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomerResponse } from '@/types/customer'

/* Props */
interface Props {
  user: CustomerResponse
}

const props = defineProps<Props>()

// Computed properties
const memberLevel = computed(() => {
  return props.user?.level || 'Bronze'
})

const pointsToNextLevel = computed(() => {
  const points = props.user?.accumulatedSpending || 0
  const nextLevel = getNextLevelPoint(points)
  return Math.max(0, nextLevel - points)
})

const nextLevelPoint = computed(() => {
  const points = props.user?.accumulatedSpending || 0
  return getNextLevelPoint(points)
})

const progressPercentage = computed(() => {
  const points = props.user?.accumulatedSpending || 0
  const currentLevelPoint = getCurrentLevelPoint(points)
  const nextLevel = getNextLevelPoint(points)
  const range = nextLevel - currentLevelPoint
  
  if (range === 0) return 100
  
  const progress = points - currentLevelPoint
  return Math.min(100, Math.max(0, (progress / range) * 100))
})

// Helper functions
const getCurrentLevelPoint = (points: number): number => {
  if (points >= 1000) return 1000
  if (points >= 500) return 500
  if (points >= 100) return 100
  return 0
}

const getNextLevelPoint = (points: number): number => {
  if (points >= 1000) return 2000
  if (points >= 500) return 1000
  if (points >= 100) return 500
  return 100
}

const getCurrentBenefits = (): string => {
  const points = props.user?.accumulatedSpending || 0
  if (points >= 1000) return 'Giảm giá 15%'
  if (points >= 500) return 'Giảm giá 10%'
  if (points >= 100) return 'Giảm giá 5%'
  return 'Giảm giá 0%'
}
</script>
