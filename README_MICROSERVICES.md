# 🚀 NIKKO HOTEL - MICROSERVICES INTEGRATION GUIDE

## 📋 TỔNG QUAN

Frontend này đã được thiết kế để tích hợp với **12 microservices Spring Boot** một cách hiệu quả và scalable.

## 🏗️ KIẾN TRÚC MICROSERVICES

### **1. API Gateway (Port 8080)**
- **Chức năng**: Routing, Load Balancing, Rate Limiting
- **Endpoints**: `/api/*`
- **Health Check**: `/api/health`, `/api/status`

### **2. Authentication Service (Port 8081)**
- **Chức năng**: JWT Authentication, Authorization
- **Endpoints**: `/api/v1/auth/*`
- **Features**: Login, Logout, Refresh Token, 2FA

### **3. User Service (Port 8082)**
- **Chức năng**: User Management, Profiles
- **Endpoints**: `/api/v1/users/*`
- **Features**: CRUD Users, Preferences, Activity Log

### **4. Room Service (Port 8083)**
- **Chức năng**: Room Management, Availability
- **Endpoints**: `/api/v1/rooms/*`
- **Features**: Room Types, Amenities, Images, Reviews

### **5. Booking Service (Port 8084)**
- **Chức năng**: Reservation Management
- **Endpoints**: `/api/v1/bookings/*`
- **Features**: Create, Update, Cancel, Check-in/out

### **6. Payment Service (Port 8085)**
- **Chức năng**: Payment Processing
- **Endpoints**: `/api/v1/payments/*`
- **Features**: Multiple Payment Methods, Webhooks

### **7. Notification Service (Port 8086)**
- **Chức năng**: Push Notifications, SMS, Email
- **Endpoints**: `/api/v1/notifications/*`
- **Features**: Templates, Channels, Preferences

### **8. File Service (Port 8087)**
- **Chức năng**: File Upload/Download
- **Endpoints**: `/api/v1/files/*`
- **Features**: Image Processing, Compression

### **9. Email Service (Port 8088)**
- **Chức năng**: Email Sending
- **Endpoints**: `/api/v1/emails/*`
- **Features**: Templates, Queue Management

### **10. Analytics Service (Port 8089)**
- **Chức năng**: Data Analytics, Metrics
- **Endpoints**: `/api/v1/analytics/*`
- **Features**: Dashboard, Reports, Trends

### **11. Report Service (Port 8090)**
- **Chức năng**: Report Generation
- **Endpoints**: `/api/v1/reports/*`
- **Features**: PDF, Excel, Scheduling

### **12. Integration Service (Port 8091)**
- **Chức năng**: Third-party Integrations
- **Endpoints**: `/api/v1/integrations/*`
- **Features**: Webhooks, Sync, Status

### **13. Workflow Service (Port 8092)**
- **Chức năng**: Business Process Management
- **Endpoints**: `/api/v1/workflows/*`
- **Features**: Process Automation, Templates

## 🔧 CÀI ĐẶT VÀ CẤU HÌNH

### **1. Environment Variables**

Copy file `env.example` thành `.env` và cập nhật:

```bash
# API Gateway
API_GATEWAY_URL=http://localhost:8080
API_GATEWAY_TIMEOUT=30000

# Authentication & User Services
AUTH_SERVICE_URL=http://localhost:8081
USER_SERVICE_URL=http://localhost:8082

# Core Business Services
ROOM_SERVICE_URL=http://localhost:8083
BOOKING_SERVICE_URL=http://localhost:8084
PAYMENT_SERVICE_URL=http://localhost:8085

# Supporting Services
NOTIFICATION_SERVICE_URL=http://localhost:8086
FILE_SERVICE_URL=http://localhost:8087
EMAIL_SERVICE_URL=http://localhost:8088

# Analytics & Reporting
ANALYTICS_SERVICE_URL=http://localhost:8089
REPORT_SERVICE_URL=http://localhost:8090

# Integration Services
INTEGRATION_SERVICE_URL=http://localhost:8091
WORKFLOW_SERVICE_URL=http://localhost:8092
```

### **2. Cấu hình Nuxt**

File `nuxt.config.ts` đã được cập nhật với:

```typescript
runtimeConfig: {
  public: {
    // Tất cả service URLs và timeouts
    apiGatewayUrl: process.env.API_GATEWAY_URL,
    authServiceUrl: process.env.AUTH_SERVICE_URL,
    // ... các service khác
  }
}
```

## 📡 SỬ DỤNG API

### **1. Import Microservices API**

```typescript
import { 
  authAPI, 
  userAPI, 
  roomAPI, 
  bookingAPI,
  paymentAPI,
  notificationAPI,
  fileAPI,
  emailAPI,
  analyticsAPI,
  reportAPI,
  integrationAPI,
  workflowAPI
} from '@/api/microservices'
```

### **2. Sử dụng API**

```typescript
// Authentication
const loginResult = await authAPI.post('login', {
  body: { email, password }
})

// User Management
const userProfile = await userAPI.get('profile')

// Room Search
const rooms = await roomAPI.get('search', {
  query: { checkIn, checkOut, guests }
})

// Create Booking
const booking = await bookingAPI.post('create', {
  body: { roomId, checkIn, checkOut, guests }
})

// Payment Processing
const payment = await paymentAPI.post('process', {
  body: { bookingId, method, amount }
})
```

### **3. Error Handling**

```typescript
try {
  const result = await roomAPI.get('detail', { params: { id: roomId } })
} catch (error) {
  // Error đã được handle tự động trong useHttp
  console.error('Room fetch failed:', error)
}
```

## 🏥 HEALTH MONITORING

### **1. Sử dụng Health Dashboard**

```vue
<template>
  <MicroservicesDashboard 
    :auto-refresh="true"
    :refresh-interval="30000"
  />
</template>
```

### **2. Programmatic Health Check**

```typescript
import { useMicroservicesHealth } from '@/composables/useMicroservicesHealth'

const { checkAllServices, healthSummary, criticalServices } = useMicroservicesHealth()

// Check health manually
await checkAllServices()

// Get summary
console.log('Overall Status:', healthSummary.overallStatus)
console.log('Critical Services:', criticalServices)
```

## 🔐 AUTHENTICATION & AUTHORIZATION

### **1. JWT Token Management**

```typescript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Token được tự động gửi trong headers
// Xử lý 401/403 errors tự động
```

### **2. Service Identification**

Mỗi request sẽ có header `X-Service-Name` để identify service:

```typescript
// Headers tự động được thêm
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>',
  'X-Service-Name': 'user'
}
```

## 📊 PERFORMANCE & OPTIMIZATION

### **1. Timeout Configuration**

Mỗi service có timeout riêng:

- **Fast Services**: 10-15s (Notification, Email)
- **Medium Services**: 20-25s (Room, Booking, File)
- **Slow Services**: 30s (Payment, Analytics, Report)

### **2. Batch Operations**

```typescript
// Health check tất cả services cùng lúc
const healthResults = await getAllServicesHealth()

// Batch health check với useHttp
const batchResults = await useHttp.batchHealthCheck([
  { url: '/api/v1/auth/health', name: 'auth' },
  { url: '/api/v1/user/health', name: 'user' }
])
```

## 🚨 ERROR HANDLING

### **1. HTTP Status Codes**

- **400**: Bad Request (Validation errors)
- **401**: Unauthorized (Token expired/invalid)
- **403**: Forbidden (Insufficient permissions)
- **404**: Not Found (Resource doesn't exist)
- **408**: Request Timeout
- **422**: Unprocessable Entity (Business logic errors)
- **429**: Too Many Requests (Rate limiting)
- **500**: Internal Server Error
- **502**: Bad Gateway (Microservice unavailable)
- **503**: Service Unavailable (Microservice down)
- **504**: Gateway Timeout (Microservice slow)

### **2. Error Logging**

Mỗi error được log với context:

```typescript
{
  service: 'user',
  endpoint: '/api/v1/users/profile',
  status: 500,
  message: 'Internal server error',
  timestamp: '2024-01-15T10:30:00.000Z'
}
```

## 🔄 DEPLOYMENT & ENVIRONMENT

### **1. Development**

```bash
# Local development
npm run dev

# Environment
NODE_ENV=development
```

### **2. Staging/Production**

```bash
# Build
npm run build

# Environment
NODE_ENV=production
API_GATEWAY_URL=https://api-staging.nikkohotel.com
```

### **3. Docker**

```dockerfile
# Sử dụng environment variables
ENV NODE_ENV=production
ENV API_GATEWAY_URL=https://api.nikkohotel.com
```

## 📱 REAL-TIME FEATURES

### **1. WebSocket Support**

```typescript
// WebSocket URL từ config
const wsUrl = useRuntimeConfig().public.wsUrl

// Kết nối WebSocket
const ws = new WebSocket(wsUrl)
```

### **2. Push Notifications**

```typescript
// Notification service
const notifications = await notificationAPI.get('list')
await notificationAPI.post('markRead', { body: { id: notificationId } })
```

## 🧪 TESTING

### **1. Unit Tests**

```typescript
// Test microservices API
import { authAPI } from '@/api/microservices'

describe('Auth API', () => {
  it('should login successfully', async () => {
    const result = await authAPI.post('login', {
      body: { email: 'test@example.com', password: 'password' }
    })
    expect(result).toBeDefined()
  })
})
```

### **2. Integration Tests**

```typescript
// Test với mock services
import { createMockMicroservice } from '@/test/mocks/microservice'

const mockAuthService = createMockMicroservice('auth')
```

## 📈 MONITORING & LOGGING

### **1. Performance Metrics**

- Response time tracking
- Error rate monitoring
- Service availability
- Request volume

### **2. Logging**

```typescript
// Structured logging
console.log('API Request', {
  service: 'user',
  endpoint: '/profile',
  method: 'GET',
  timestamp: new Date().toISOString(),
  userId: authStore.userId
})
```

## 🔧 TROUBLESHOOTING

### **1. Service Unavailable**

```typescript
// Check service health
const health = await useHttp.healthCheck('/api/v1/auth/health', 'auth')

if (health.status === 'unhealthy') {
  console.error('Auth service is down:', health.error)
}
```

### **2. Network Issues**

```typescript
// Check connectivity
const isOnline = await useHttp.healthCheck('/api/health')

if (!isOnline) {
  // Fallback to offline mode
  showOfflineMessage()
}
```

### **3. Token Issues**

```typescript
// Auto-refresh token
if (response.status === 401) {
  await authStore.refreshToken()
  // Retry request
}
```

## 📚 RESOURCES

### **1. Documentation**

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)

### **2. Best Practices**

- [Microservices Patterns](https://microservices.io/patterns/)
- [API Design Guidelines](https://restfulapi.net/)
- [JWT Best Practices](https://jwt.io/introduction)

## 🤝 SUPPORT

Nếu có vấn đề gì, hãy:

1. Kiểm tra logs trong console
2. Verify service health status
3. Check environment variables
4. Review API documentation
5. Contact development team

---

**Happy Coding! 🚀**
