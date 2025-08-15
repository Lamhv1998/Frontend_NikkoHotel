<template>
  <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-white">Microservices Health</h3>
          <p class="text-blue-100 text-sm">Real-time monitoring of all services</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :class="getOverallStatusColor(healthSummary.overallStatus)"></div>
            <span class="text-white text-sm font-medium capitalize">{{ healthSummary.overallStatus }}</span>
          </div>
          <button
            @click="refreshHealth"
            :disabled="isChecking"
            class="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Icon name="ic:baseline-refresh" class="w-4 h-4" :class="{ 'animate-spin': isChecking }" />
          </button>
        </div>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-800">{{ healthSummary.total }}</div>
          <div class="text-sm text-gray-600">Total Services</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ healthSummary.healthy }}</div>
          <div class="text-sm text-gray-600">Healthy</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-red-600">{{ healthSummary.unhealthy }}</div>
          <div class="text-sm text-gray-600">Unhealthy</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ healthSummary.checking }}</div>
          <div class="text-sm text-gray-600">Checking</div>
        </div>
      </div>
    </div>

    <!-- Services List -->
    <div class="divide-y divide-gray-200">
      <div
        v-for="(health, serviceName) in servicesHealth"
        :key="serviceName"
        class="px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="getServiceIconBg(serviceName)">
              <Icon :name="getServiceIcon(serviceName)" class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 capitalize">{{ serviceName }}</h4>
              <p class="text-sm text-gray-500">{{ getServiceDescription(serviceName) }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- Status -->
            <div class="flex items-center gap-2">
              <Icon :name="getStatusIcon(health.status)" class="w-4 h-4" :class="getStatusColor(health.status)" />
              <span class="text-sm font-medium capitalize" :class="getStatusColor(health.status)">
                {{ health.status }}
              </span>
            </div>
            
            <!-- Response Time -->
            <div v-if="health.responseTime > 0" class="text-sm text-gray-500">
              {{ health.responseTime }}ms
            </div>
            
            <!-- Last Check -->
            <div class="text-xs text-gray-400">
              {{ formatLastCheck(health.lastCheck) }}
            </div>
          </div>
        </div>
        
        <!-- Error Message -->
        <div v-if="health.error" class="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {{ health.error }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Last updated: {{ formatLastCheck(lastFullCheck) }}</span>
        <span>Auto-refresh: {{ autoRefreshEnabled ? 'ON' : 'OFF' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMicroservicesHealth, getStatusColor, getStatusIcon, getOverallStatusColor } from '@/composables/useMicroservicesHealth'

// Props
interface Props {
  autoRefresh?: boolean
  refreshInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoRefresh: true,
  refreshInterval: 30000
})

// Composables
const {
  servicesHealth,
  healthSummary,
  isChecking,
  lastFullCheck,
  checkAllServices,
  startAutoRefresh,
  stopAutoRefresh
} = useMicroservicesHealth()

// Computed
const autoRefreshEnabled = computed(() => props.autoRefresh)

// Methods
const refreshHealth = async () => {
  await checkAllServices()
}

const getServiceIcon = (serviceName: string) => {
  const icons: Record<string, string> = {
    auth: 'ic:baseline-security',
    user: 'ic:baseline-person',
    room: 'ic:baseline-hotel',
    booking: 'ic:baseline-calendar-today',
    payment: 'ic:baseline-payment',
    notification: 'ic:baseline-notifications',
    file: 'ic:baseline-folder',
    email: 'ic:baseline-email',
    analytics: 'ic:baseline-analytics',
    report: 'ic:baseline-assessment',
    integration: 'ic:baseline-integration-instructions',
    workflow: 'ic:baseline-workflow'
  }
  return icons[serviceName] || 'ic:baseline-help'
}

const getServiceIconBg = (serviceName: string) => {
  const colors: Record<string, string> = {
    auth: 'bg-purple-500',
    user: 'bg-blue-500',
    room: 'bg-green-500',
    booking: 'bg-orange-500',
    payment: 'bg-emerald-500',
    notification: 'bg-pink-500',
    file: 'bg-indigo-500',
    email: 'bg-cyan-500',
    analytics: 'bg-teal-500',
    report: 'bg-amber-500',
    integration: 'bg-violet-500',
    workflow: 'bg-rose-500'
  }
  return colors[serviceName] || 'bg-gray-500'
}

const getServiceDescription = (serviceName: string) => {
  const descriptions: Record<string, string> = {
    auth: 'Authentication & Authorization',
    user: 'User Management',
    room: 'Room Management',
    booking: 'Booking & Reservation',
    payment: 'Payment Processing',
    notification: 'Notification System',
    file: 'File Management',
    email: 'Email Service',
    analytics: 'Data Analytics',
    report: 'Reporting System',
    integration: 'Third-party Integration',
    workflow: 'Business Workflow'
  }
  return descriptions[serviceName] || 'Service'
}

const formatLastCheck = (timestamp: string) => {
  if (!timestamp || timestamp === 'Never') return 'Never'
  
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

// Lifecycle
onMounted(async () => {
  await checkAllServices()
  if (props.autoRefresh) {
    startAutoRefresh(props.refreshInterval)
  }
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>
