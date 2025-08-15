import type { UseFetchOptions } from 'nuxt/app'

// ========================================
// MICROSERVICES API CONFIGURATION
// ========================================

interface MicroserviceConfig {
  baseUrl: string
  timeout: number
  endpoints: Record<string, string>
}

// Microservices Configuration
const microservicesConfig: Record<string, MicroserviceConfig> = {
  // API Gateway
  gateway: {
    baseUrl: '/api',
    timeout: 30000,
    endpoints: {
      health: '/health',
      status: '/status'
    }
  },

  // Authentication Service
  auth: {
    baseUrl: '/api/v1/auth',
    timeout: 15000,
    endpoints: {
      login: '/login',
      logout: '/logout',
      refresh: '/refresh',
      verify: '/verify',
      forgotPassword: '/forgot-password',
      resetPassword: '/reset-password',
      changePassword: '/change-password',
      twoFactor: '/2fa',
      socialLogin: '/social'
    }
  },

  // User Service
  user: {
    baseUrl: '/api/v1/users',
    timeout: 15000,
    endpoints: {
      profile: '/profile',
      update: '/update',
      delete: '/delete',
      preferences: '/preferences',
      notifications: '/notifications',
      activity: '/activity',
      search: '/search',
      bulk: '/bulk'
    }
  },

  // Room Service
  room: {
    baseUrl: '/api/v1/rooms',
    timeout: 20000,
    endpoints: {
      list: '/list',
      detail: '/detail',
      search: '/search',
      availability: '/availability',
      types: '/types',
      amenities: '/amenities',
      images: '/images',
      reviews: '/reviews',
      recommendations: '/recommendations'
    }
  },

  // Booking Service
  booking: {
    baseUrl: '/api/v1/bookings',
    timeout: 25000,
    endpoints: {
      create: '/create',
      list: '/list',
      detail: '/detail',
      update: '/update',
      cancel: '/cancel',
      confirm: '/confirm',
      checkin: '/checkin',
      checkout: '/checkout',
      history: '/history',
      statistics: '/statistics'
    }
  },

  // Payment Service
  payment: {
    baseUrl: '/api/v1/payments',
    timeout: 30000,
    endpoints: {
      create: '/create',
      process: '/process',
      confirm: '/confirm',
      refund: '/refund',
      history: '/history',
      methods: '/methods',
      webhook: '/webhook',
      status: '/status'
    }
  },

  // Notification Service
  notification: {
    baseUrl: '/api/v1/notifications',
    timeout: 10000,
    endpoints: {
      send: '/send',
      list: '/list',
      markRead: '/mark-read',
      delete: '/delete',
      preferences: '/preferences',
      templates: '/templates',
      channels: '/channels'
    }
  },

  // File Service
  file: {
    baseUrl: '/api/v1/files',
    timeout: 20000,
    endpoints: {
      upload: '/upload',
      download: '/download',
      delete: '/delete',
      list: '/list',
      info: '/info',
      resize: '/resize',
      compress: '/compress'
    }
  },

  // Email Service
  email: {
    baseUrl: '/api/v1/emails',
    timeout: 15000,
    endpoints: {
      send: '/send',
      template: '/template',
      queue: '/queue',
      status: '/status',
      history: '/history'
    }
  },

  // Analytics Service
  analytics: {
    baseUrl: '/api/v1/analytics',
    timeout: 30000,
    endpoints: {
      dashboard: '/dashboard',
      reports: '/reports',
      metrics: '/metrics',
      trends: '/trends',
      export: '/export'
    }
  },

  // Report Service
  report: {
    baseUrl: '/api/v1/reports',
    timeout: 25000,
    endpoints: {
      generate: '/generate',
      download: '/download',
      schedule: '/schedule',
      templates: '/templates',
      history: '/history'
    }
  },

  // Integration Service
  integration: {
    baseUrl: '/api/v1/integrations',
    timeout: 20000,
    endpoints: {
      connect: '/connect',
      disconnect: '/disconnect',
      status: '/status',
      sync: '/sync',
      webhooks: '/webhooks'
    }
  },

  // Workflow Service
  workflow: {
    baseUrl: '/api/v1/workflows',
    timeout: 25000,
    endpoints: {
      create: '/create',
      execute: '/execute',
      status: '/status',
      history: '/history',
      templates: '/templates'
    }
  }
}

// ========================================
// MICROSERVICE API CLASS
// ========================================

class MicroserviceAPI {
  private config: MicroserviceConfig
  private serviceName: string

  constructor(serviceName: string) {
    this.serviceName = serviceName
    this.config = microservicesConfig[serviceName]
    
    if (!this.config) {
      throw new Error(`Unknown microservice: ${serviceName}`)
    }
  }

  // Get full URL for endpoint
  private getUrl(endpoint: string): string {
    return `${this.config.baseUrl}${this.config.endpoints[endpoint]}`
  }

  // GET request
  async get<T>(endpoint: string, options?: UseFetchOptions<T>) {
    return useHttp.get<T>(this.getUrl(endpoint), {
      ...options,
      timeout: this.config.timeout
    })
  }

  // POST request
  async post<T>(endpoint: string, options?: UseFetchOptions<T>) {
    return useHttp.post<T>(this.getUrl(endpoint), {
      ...options,
      timeout: this.config.timeout
    })
  }

  // PUT request
  async put<T>(endpoint: string, options?: UseFetchOptions<T>) {
    return useHttp.put<T>(this.getUrl(endpoint), {
      ...options,
      timeout: this.config.timeout
    })
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: UseFetchOptions<T>) {
    return useHttp.delete<T>(this.getUrl(endpoint), {
      ...options,
      timeout: this.config.timeout
    })
  }

  // PATCH request
  async patch<T>(endpoint: string, options?: UseFetchOptions<T>) {
    return useHttp.patch<T>(this.getUrl(endpoint), {
      ...options,
      timeout: this.config.timeout
    })
  }

  // Health check
  async health() {
    return this.get('health')
  }

  // Get service status
  async status() {
    return this.get('status')
  }
}

// ========================================
// SERVICE INSTANCES
// ========================================

export const authAPI = new MicroserviceAPI('auth')
export const userAPI = new MicroserviceAPI('user')
export const roomAPI = new MicroserviceAPI('room')
export const bookingAPI = new MicroserviceAPI('booking')
export const paymentAPI = new MicroserviceAPI('payment')
export const notificationAPI = new MicroserviceAPI('notification')
export const fileAPI = new MicroserviceAPI('file')
export const emailAPI = new MicroserviceAPI('email')
export const analyticsAPI = new MicroserviceAPI('analytics')
export const reportAPI = new MicroserviceAPI('report')
export const integrationAPI = new MicroserviceAPI('integration')
export const workflowAPI = new MicroserviceAPI('workflow')

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get all microservices health status
export const getAllServicesHealth = async () => {
  const services = Object.keys(microservicesConfig)
  const healthChecks = await Promise.allSettled(
    services.map(async (service) => {
      const api = new MicroserviceAPI(service)
      return { service, status: await api.health() }
    })
  )
  
  return healthChecks.map((result, index) => ({
    service: services[index],
    status: result.status === 'fulfilled' ? 'healthy' : 'unhealthy',
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason : null
  }))
}

// Get service configuration
export const getServiceConfig = (serviceName: string) => {
  return microservicesConfig[serviceName]
}

// Get all services configuration
export const getAllServicesConfig = () => {
  return microservicesConfig
}

export default MicroserviceAPI
