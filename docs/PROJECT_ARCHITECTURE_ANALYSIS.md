# 🏨 PHÂN TÍCH KIẾN TRÚC VÀ LUỒNG HOẠT ĐỘNG DỰ ÁN NIKKO HOTEL

## 📋 TỔNG QUAN DỰ ÁN

**Tên dự án:** Nikko Hotel Frontend  
**Framework:** Nuxt.js 3  
**Ngôn ngữ:** TypeScript + Vue 3  
**State Management:** Pinia  
**Styling:** Tailwind CSS + SCSS  
**Backend:** Java Spring Boot (Microservices)  

---

## 🏗️ CẤU TRÚC THƯ MỤC

```
Frontend_NikkoHotel/
├── 📁 api/                    # API endpoints definitions
├── 📁 assets/                 # Static assets (CSS, fonts, images)
├── 📁 components/             # Vue components
│   ├── 📁 c/                 # Common components
│   ├── 📁 global/            # Global components
│   ├── 📁 page/              # Page-specific components
│   └── 📁 UI/                # UI components
├── 📁 composables/            # Composable functions (API calls, business logic)
├── 📁 data/                   # Static data (provinces, etc.)
├── 📁 docs/                   # Documentation
├── 📁 layouts/                # Layout templates
├── 📁 middleware/             # Route middleware
├── 📁 pages/                  # Vue pages (auto-routing)
├── 📁 plugins/                # Nuxt plugins
├── 📁 public/                 # Public static files
├── 📁 server/                 # Server-side API routes
├── 📁 stores/                 # Pinia stores
├── 📁 types/                  # TypeScript type definitions
└── 📁 utils/                  # Utility functions
```

---

## 🔄 LUỒNG HOẠT ĐỘNG CHI TIẾT

### **1. LUỒNG KHỞI TẠO ỨNG DỤNG**

```
1. Nuxt App Start
   ↓
2. Load nuxt.config.ts
   ↓
3. Initialize Plugins (auth.client.ts, day.js, gsap.js, etc.)
   ↓
4. Setup Middleware (auth.js, clearRecord.global.js)
   ↓
5. Initialize Stores (auth.ts, order.ts, common.ts)
   ↓
6. Load Layouts (default.vue, adminlayout.vue, user.vue)
   ↓
7. Route Navigation
```

### **2. LUỒNG XÁC THỰC (AUTHENTICATION FLOW)**

```
User Access Protected Route
         ↓
   Auth Middleware Check
         ↓
   Check Token Exists?
         ↓
   Yes → Validate Token
         ↓
   Token Valid? → Allow Access
         ↓
   No → Redirect to Login
         ↓
   Login Success → Store Token
         ↓
   Redirect to Original Route
```

**Code Implementation:**
```typescript
// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  if (!authStore.token) {
    return navigateTo('/auth/login')
  }
  
  try {
    const { checkToken } = useAuth()
    const isValid = await checkToken()
    if (!isValid) throw new Error('Token không hợp lệ')
  } catch (error) {
    return navigateTo('/auth/login')
  }
})
```

### **3. LUỒNG GỌI API (API CALL FLOW)**

```
Component/Page
      ↓
Composable (useBookingApi, useRoomApi)
      ↓
HTTP Request (useFetch/$fetch)
      ↓
Backend API (Java Spring Boot)
      ↓
Response Processing
      ↓
State Update (Pinia Store)
      ↓
UI Re-render
```

**Code Implementation:**
```typescript
// composables/useBookingApi.ts
export const useBookingApi = () => {
  const getTodayBookingStatistics = async (): Promise<BookingStatisticsDto> => {
    try {
      const { data, error } = await useFetch<BookingStatisticsDto>(
        '/api/bookings/statistics/today',
        createFetchOptions()
      )
      
      if (error.value) throw new Error(error.value.message)
      return data.value!
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }
  
  return { getTodayBookingStatistics }
}
```

### **4. LUỒNG QUẢN LÝ STATE (STATE MANAGEMENT FLOW)**

```
User Action
     ↓
Component Method
     ↓
Update Store State (Pinia)
     ↓
Reactive Data Change
     ↓
Component Re-render
     ↓
UI Update
```

**Code Implementation:**
```typescript
// stores/order.ts
export const useOrderStore = defineStore('order', () => {
  const order = ref<OrderPayload>({ ...initialOrder })
  
  const resetOrder = () => {
    order.value = { ...initialOrder }
  }
  
  const isConfirmedDate = computed(() => {
    const { checkInDate, checkOutDate } = order.value
    return checkInDate !== '' && checkOutDate !== ''
  })
  
  return { order, resetOrder, isConfirmedDate }
})
```

---

## ⚠️ VẤN ĐỀ VÀ ĐIỂM YẾU TRONG KIẾN TRÚC

### **1. VẤN ĐỀ VỀ CẤU TRÚC**

#### **A. Inconsistency trong API Layer**
```typescript
// ❌ VẤN ĐỀ: Hai cách gọi API khác nhau
// Cách 1: Sử dụng useHttp wrapper
const roomAPI = {
  getRoomsApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/rooms', options)
  }
}

// Cách 2: Sử dụng $fetch trực tiếp
const getAllRoomTypes = async () => {
  const response = await $fetch(`${baseURL}/api/rooms/types`)
  return response
}
```

#### **B. Duplicate Code và Inconsistent Naming**
```typescript
// ❌ VẤN ĐỀ: Naming không nhất quán
// Trong useRoomApi.ts
const getAllRoomTypes = async () => { ... }
const getRoomById = async () => { ... }

// Trong api/room.ts  
const roomAPI = {
  getRoomsApi: <T = any>(options: UseFetchOptions<T>) => { ... }
  getRoomApi: <T = any>(id: string, options: UseFetchOptions<T>) => { ... }
}
```

#### **C. Type Definitions Scattered**
```typescript
// ❌ VẤN ĐỀ: Types được định nghĩa ở nhiều nơi
// types/room.ts - 380 lines với nhiều interface
// composables/useBookingApi.ts - Định nghĩa types riêng
// Không có central type registry
```

### **2. VẤN ĐỀ VỀ ERROR HANDLING**

#### **A. Inconsistent Error Handling**
```typescript
// ❌ VẤN ĐỀ: Xử lý lỗi không nhất quán
// Trong useRoomApi.ts
try {
  const response = await $fetch(`${baseURL}/api/rooms/types`)
  return response
} catch (error) {
  console.error('❌ Error fetching room types:', error)
  throw error // Chỉ log và throw, không có user-friendly message
}

// Trong useHttp.ts
const handleError = (response: FetchResponse<ResOptions>) => {
  // Có xử lý lỗi chi tiết nhưng không được sử dụng nhất quán
}
```

#### **B. Missing Global Error Boundary**
- Không có global error handling
- Mỗi component xử lý lỗi riêng biệt
- Không có fallback UI cho lỗi nghiêm trọng

### **3. VẤN ĐỀ VỀ CONFIGURATION**

#### **A. Environment Variables Inconsistent**
```typescript
// ❌ VẤN ĐỀ: Config không nhất quán
// nuxt.config.ts
runtimeConfig: {
  public: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080',
    apiBase: process.env.NUXT_PUBLIC_API_BASE, // Không có default
    roomServiceUrl: process.env.ROOM_SERVICE_URL || 'http://localhost:8087'
  }
}

// Trong composables
const baseURL = config.public.roomServiceUrl || 'http://localhost:8087'
// Hardcoded fallback khác với config
```

#### **B. Missing Environment Validation**
- Không validate required environment variables
- Không có config validation ở startup

### **4. VẤN ĐỀ VỀ PERFORMANCE**

#### **A. Missing Caching Strategy**
```typescript
// ❌ VẤN ĐỀ: Không có caching
const getAllRoomTypes = async () => {
  // Mỗi lần gọi đều fetch từ server
  const response = await $fetch(`${baseURL}/api/rooms/types`)
  return response
}
```

#### **B. No Request Deduplication**
- Có thể gọi cùng API nhiều lần đồng thời
- Không có request deduplication

---

## 🔧 ĐỀ XUẤT CẢI THIỆN

### **1. CẢI THIỆN CẤU TRÚC API LAYER**

#### **A. Unified API Client**
```typescript
// ✅ ĐỀ XUẤT: Tạo unified API client
// composables/useApiClient.ts
export const useApiClient = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl
  
  const client = {
    get: <T>(endpoint: string, options?: UseFetchOptions<T>) => {
      return useFetch<T>(`${baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      })
    },
    
    post: <T>(endpoint: string, data: any, options?: UseFetchOptions<T>) => {
      return useFetch<T>(`${baseURL}${endpoint}`, {
        method: 'POST',
        body: data,
        ...options
      })
    }
  }
  
  return client
}
```

#### **B. Centralized Type Registry**
```typescript
// ✅ ĐỀ XUẤT: Tạo central type registry
// types/index.ts
export * from './room'
export * from './booking'
export * from './user'
export * from './order'

// Sử dụng
import type { BookingDto, RoomDto } from '~/types'
```

### **2. CẢI THIỆN ERROR HANDLING**

#### **A. Global Error Handler**
```typescript
// ✅ ĐỀ XUẤT: Global error handler
// plugins/error-handler.client.ts
export default defineNuxtPlugin(() => {
  const handleError = (error: any, context?: string) => {
    console.error(`[${context}] Error:`, error)
    
    // Show user-friendly message
    const message = error.message || 'Có lỗi xảy ra, vui lòng thử lại'
    
    // Use toast notification
    useToast().error(message)
  }
  
  return {
    provide: {
      handleError
    }
  }
})
```

#### **B. Consistent Error Handling in Composables**
```typescript
// ✅ ĐỀ XUẤT: Consistent error handling
export const useBookingApi = () => {
  const { $handleError } = useNuxtApp()
  
  const getTodayBookingStatistics = async (): Promise<BookingStatisticsDto> => {
    try {
      const { data, error } = await useFetch<BookingStatisticsDto>(
        '/api/bookings/statistics/today'
      )
      
      if (error.value) throw error.value
      return data.value!
    } catch (error) {
      $handleError(error, 'getTodayBookingStatistics')
      throw error
    }
  }
}
```

### **3. CẢI THIỆN CONFIGURATION**

#### **A. Environment Validation**
```typescript
// ✅ ĐỀ XUẤT: Environment validation
// utils/config-validator.ts
export const validateConfig = () => {
  const required = [
    'NUXT_PUBLIC_API_BASE',
    'NUXT_PUBLIC_ROOM_SERVICE_URL'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
```

#### **B. Centralized Config**
```typescript
// ✅ ĐỀ XUẤT: Centralized config
// composables/useConfig.ts
export const useConfig = () => {
  const config = useRuntimeConfig()
  
  return {
    api: {
      baseUrl: config.public.apiBaseUrl,
      roomServiceUrl: config.public.roomServiceUrl,
      authServiceUrl: config.public.authServiceUrl
    },
    app: {
      name: 'Nikko Hotel',
      version: '1.0.0'
    }
  }
}
```

### **4. CẢI THIỆN PERFORMANCE**

#### **A. Request Caching**
```typescript
// ✅ ĐỀ XUẤT: Request caching
export const useCachedApi = () => {
  const cache = new Map()
  
  const getCached = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
    if (cache.has(key)) {
      const { data, timestamp } = cache.get(key)
      if (Date.now() - timestamp < 5 * 60 * 1000) { // 5 minutes
        return data
      }
    }
    
    const data = await fetcher()
    cache.set(key, { data, timestamp: Date.now() })
    return data
  }
  
  return { getCached }
}
```

---

## 📊 ĐÁNH GIÁ TỔNG QUAN

### **ĐIỂM MẠNH ✅**
1. **Modern Tech Stack**: Nuxt 3, Vue 3, TypeScript, Pinia
2. **Component Architecture**: Tách biệt rõ ràng components
3. **Type Safety**: Sử dụng TypeScript cho type checking
4. **State Management**: Pinia với persistence
5. **Responsive Design**: Tailwind CSS cho UI

### **ĐIỂM YẾU ❌**
1. **Inconsistent API Layer**: Hai cách gọi API khác nhau
2. **Scattered Types**: Type definitions không tập trung
3. **Poor Error Handling**: Không nhất quán và thiếu global handling
4. **Configuration Issues**: Environment variables không được validate
5. **Performance**: Không có caching strategy

### **MỨC ĐỘ LỘN XỘN: 7/10** 🚨

**Lý do:**
- Code structure không nhất quán
- Naming conventions không thống nhất
- Error handling scattered
- Configuration management poor
- Missing architectural patterns

---

## 🎯 KẾ HOẠCH CẢI THIỆN

### **Phase 1: Immediate Fixes (1-2 weeks)**
1. Fix linter errors
2. Standardize API calls
3. Centralize type definitions

### **Phase 2: Architecture Improvements (2-4 weeks)**
1. Implement unified API client
2. Add global error handling
3. Improve configuration management

### **Phase 3: Performance & Quality (4-6 weeks)**
1. Add caching strategy
2. Implement request deduplication
3. Add comprehensive testing

---

## 📚 TÀI LIỆU THAM KHẢO

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia State Management](https://pinia.vuejs.org/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

*Tài liệu này được tạo để phân tích và cải thiện kiến trúc dự án Nikko Hotel Frontend.*
