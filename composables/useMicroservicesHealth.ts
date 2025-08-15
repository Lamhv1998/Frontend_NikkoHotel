import { ref, computed, readonly } from 'vue'
import { getAllServicesHealth, getServiceConfig } from '@/api/microservices'

// ========================================
// MICROSERVICES HEALTH MONITORING
// ========================================

interface ServiceHealth {
  service: string
  status: 'healthy' | 'unhealthy' | 'checking' | 'unknown'
  lastCheck: string
  responseTime: number
  error?: string
  config?: any
}

interface HealthSummary {
  total: number
  healthy: number
  unhealthy: number
  checking: number
  unknown: number
  overallStatus: 'healthy' | 'degraded' | 'unhealthy'
}

export const useMicroservicesHealth = () => {
  // State
  const servicesHealth = ref<Record<string, ServiceHealth>>({})
  const isChecking = ref(false)
  const lastFullCheck = ref<string | null>(null)
  const autoRefreshInterval = ref<NodeJS.Timeout | null>(null)

  // Computed
  const healthSummary = computed<HealthSummary>(() => {
    const services = Object.values(servicesHealth.value)
    const total = services.length
    const healthy = services.filter(s => s.status === 'healthy').length
    const unhealthy = services.filter(s => s.status === 'unhealthy').length
    const checking = services.filter(s => s.status === 'checking').length
    const unknown = services.filter(s => s.status === 'unknown').length

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'
    if (unhealthy > 0) {
      overallStatus = unhealthy > total * 0.5 ? 'unhealthy' : 'degraded'
    }

    return {
      total,
      healthy,
      unhealthy,
      checking,
      unknown,
      overallStatus
    }
  })

  const criticalServices = computed(() => {
    return Object.entries(servicesHealth.value)
      .filter(([_, health]) => health.status === 'unhealthy')
      .map(([name, health]) => ({ name, ...health }))
  })

  // Methods
  const checkServiceHealth = async (serviceName: string) => {
    if (!servicesHealth.value[serviceName]) {
      servicesHealth.value[serviceName] = {
        service: serviceName,
        status: 'unknown',
        lastCheck: new Date().toISOString(),
        responseTime: 0
      }
    }

    const health = servicesHealth.value[serviceName]
    health.status = 'checking'
    health.lastCheck = new Date().toISOString()

    try {
      const startTime = Date.now()
      const result = await getAllServicesHealth()
      const serviceResult = result.find(r => r.service === serviceName)
      
      if (serviceResult && serviceResult.status === 'healthy') {
        health.status = 'healthy'
        health.responseTime = Date.now() - startTime
        health.error = undefined
      } else {
        health.status = 'unhealthy'
        health.error = serviceResult?.error?.message || 'Service unavailable'
      }
    } catch (error) {
      health.status = 'unhealthy'
      health.error = error instanceof Error ? error.message : 'Unknown error'
    }
  }

  const checkAllServices = async () => {
    if (isChecking.value) return
    
    isChecking.value = true
    const startTime = Date.now()

    try {
      // Initialize all services
      const config = getServiceConfig('auth') // Get sample config to know available services
      const serviceNames = ['auth', 'user', 'room', 'booking', 'payment', 'notification', 'file', 'email', 'analytics', 'report', 'integration', 'workflow']
      
      // Check all services in parallel
      await Promise.allSettled(
        serviceNames.map(serviceName => checkServiceHealth(serviceName))
      )

      lastFullCheck.value = new Date().toISOString()
      console.log(`Health check completed in ${Date.now() - startTime}ms`)
    } catch (error) {
      console.error('Health check failed:', error)
    } finally {
      isChecking.value = false
    }
  }

  const startAutoRefresh = (intervalMs: number = 30000) => {
    stopAutoRefresh()
    autoRefreshInterval.value = setInterval(checkAllServices, intervalMs)
  }

  const stopAutoRefresh = () => {
    if (autoRefreshInterval.value) {
      clearInterval(autoRefreshInterval.value)
      autoRefreshInterval.value = null
    }
  }

  const getServiceStatus = (serviceName: string) => {
    return servicesHealth.value[serviceName] || {
      service: serviceName,
      status: 'unknown' as const,
      lastCheck: 'Never',
      responseTime: 0
    }
  }

  const getServiceConfig = (serviceName: string) => {
    try {
      return getServiceConfig(serviceName)
    } catch (error) {
      console.error(`Failed to get config for service: ${serviceName}`, error)
      return null
    }
  }

  // Initialize
  const initialize = async () => {
    await checkAllServices()
    startAutoRefresh()
  }

  // Cleanup
  const cleanup = () => {
    stopAutoRefresh()
  }

  return {
    // State
    servicesHealth: readonly(servicesHealth),
    isChecking: readonly(isChecking),
    lastFullCheck: readonly(lastFullCheck),
    
    // Computed
    healthSummary,
    criticalServices,
    
    // Methods
    checkServiceHealth,
    checkAllServices,
    startAutoRefresh,
    stopAutoRefresh,
    getServiceStatus,
    getServiceConfig,
    initialize,
    cleanup
  }
}

// ========================================
// HEALTH STATUS COMPONENT UTILITIES
// ========================================

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'text-green-600 bg-green-100'
    case 'unhealthy':
      return 'text-red-600 bg-red-100'
    case 'checking':
      return 'text-yellow-600 bg-yellow-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'ic:baseline-check-circle'
    case 'unhealthy':
      return 'ic:baseline-error'
    case 'checking':
      return 'ic:baseline-schedule'
    default:
      return 'ic:baseline-help'
  }
}

export const getOverallStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'text-green-600'
    case 'degraded':
      return 'text-yellow-600'
    case 'unhealthy':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}
