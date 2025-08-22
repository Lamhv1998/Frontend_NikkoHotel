# 🔄 LUỒNG HOẠT ĐỘNG CHI TIẾT DỰ ÁN NIKKO HOTEL

## 📖 MỤC LỤC

1. [Luồng Khởi Tạo Ứng Dụng](#luồng-khởi-tạo-ứng-dụng)
2. [Luồng Xác Thực](#luồng-xác-thực)
3. [Luồng Gọi API](#luồng-gọi-api)
4. [Luồng Quản Lý State](#luồng-quản-lý-state)
5. [Luồng Render UI](#luồng-render-ui)
6. [Luồng Xử Lý Lỗi](#luồng-xử-lý-lỗi)
7. [Ví Dụ Thực Tế](#ví-dụ-thực-tế)

---

## 🚀 LUỒNG KHỞI TẠO ỨNG DỤNG

### **1.1 Nuxt App Bootstrap**
```
1. Browser Request → nuxt-app
   ↓
2. Nuxt Runtime Initialization
   ↓
3. Load nuxt.config.ts
   ↓
4. Initialize Modules (@pinia/nuxt, @nuxtjs/tailwindcss)
   ↓
5. Load Environment Variables
   ↓
6. Setup Runtime Config
```

**Code Implementation:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080'
    }
  }
})
```

### **1.2 Plugin Initialization**
```
7. Load Client Plugins (auth.client.ts)
   ↓
8. Load Global Plugins (day.js, gsap.js)
   ↓
9. Setup Global Composables
   ↓
10. Initialize Third-party Libraries
```

**Code Implementation:**
```typescript
// plugins/auth.client.ts
export default defineNuxtPlugin(() => {
  // Setup authentication logic
  const authStore = useAuthStore()
  
  // Check if user is already logged in
  if (process.client && authStore.token) {
    // Validate token
  }
})
```

### **1.3 Store Initialization**
```
11. Initialize Pinia Store
    ↓
12. Load Persisted State (if any)
    ↓
13. Setup Store Watchers
    ↓
14. Initialize Default Values
```

**Code Implementation:**
```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  
  // Load from localStorage if available
  if (process.client) {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) token.value = savedToken
  }
  
  return { token, user }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
```

---

## 🔐 LUỒNG XÁC THỰC

### **2.1 Route Navigation Flow**
```
User Navigate to Protected Route
           ↓
    Auth Middleware Trigger
           ↓
    Check Token Exists?
           ↓
    Yes → Validate Token with Backend
           ↓
    Token Valid? → Allow Access
           ↓
    No → Redirect to Login Page
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
  
  // Check if route is public
  const publicRoutes = ['/', '/auth/login', '/auth/signup']
  if (publicRoutes.includes(to.path)) return
  
  // Check authentication
  if (!authStore.token) {
    return navigateTo('/auth/login')
  }
  
  try {
    // Validate token with backend
    const { checkToken } = useAuth()
    const isValid = await checkToken()
    
    if (!isValid) {
      throw new Error('Token không hợp lệ')
    }
  } catch (error) {
    // Clear invalid token
    authStore.$reset()
    return navigateTo('/auth/login')
  }
})
```

### **2.2 Login Flow**
```
User Input Credentials
      ↓
Form Validation (VeeValidate)
      ↓
API Call to Backend
      ↓
Backend Response
      ↓
Store Token & User Info
      ↓
Redirect to Dashboard
```

**Code Implementation:**
```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const login = async (credentials: LoginCredentials) => {
    try {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      if (error.value) throw error.value
      
      // Store in Pinia store
      const authStore = useAuthStore()
      authStore.setToken(data.value.token)
      authStore.setUser(data.value.user)
      
      return data.value
    } catch (error) {
      throw error
    }
  }
  
  return { login }
}
```

---

## 📡 LUỒNG GỌI API

### **3.1 API Call Architecture**
```
Component/Page
      ↓
Composable Function
      ↓
HTTP Request (useFetch/$fetch)
      ↓
Request Interceptor (Headers, Auth)
      ↓
Backend API Call
      ↓
Response Processing
      ↓
Error Handling
      ↓
Return Data/Error
```

### **3.2 Request Flow Details**
```
1. Component calls composable
   ↓
2. Composable prepares request
   ↓
3. Add authentication headers
   ↓
4. Make HTTP request
   ↓
5. Handle response/error
   ↓
6. Transform data if needed
   ↓
7. Return to component
```

**Code Implementation:**
```typescript
// composables/useRoomApi.ts
export const useRoomApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.roomServiceUrl
  
  const getAllRoomTypes = async () => {
    try {
      console.log('📡 Fetching room types from:', `${baseURL}/api/rooms/types`)
      
      const response = await $fetch(`${baseURL}/api/rooms/types`)
      
      console.log('✅ Room types response:', response)
      return response
    } catch (error) {
      console.error('❌ Error fetching room types:', error)
      throw error
    }
  }
  
  return { getAllRoomTypes }
}
```

### **3.3 API Response Handling**
```
Backend Response
      ↓
Check HTTP Status
      ↓
Parse JSON Data
      ↓
Validate Response Structure
      ↓
Transform Data (if needed)
      ↓
Handle Success/Error
      ↓
Update Component State
```

---

## 🗃️ LUỒNG QUẢN LÝ STATE

### **4.1 State Management Flow**
```
User Action
     ↓
Component Method
     ↓
Update Store State
     ↓
Reactive Data Change
     ↓
Component Re-render
     ↓
UI Update
```

### **4.2 Store Structure**
```
Pinia Store (useOrderStore)
      ↓
State (order, loading, error)
      ↓
Actions (updateOrder, resetOrder)
      ↓
Getters (isConfirmedDate, totalNights)
      ↓
Computed Properties
      ↓
Component Binding
```

**Code Implementation:**
```typescript
// stores/order.ts
export const useOrderStore = defineStore('order', () => {
  // State
  const order = ref<OrderPayload>({ ...initialOrder })
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Actions
  const updateOrder = (updates: Partial<OrderPayload>) => {
    order.value = { ...order.value, ...updates }
  }
  
  const resetOrder = () => {
    order.value = { ...initialOrder }
  }
  
  // Getters
  const isConfirmedDate = computed(() => {
    const { checkInDate, checkOutDate } = order.value
    return checkInDate !== '' && checkOutDate !== ''
  })
  
  const totalNights = computed(() => {
    if (!isConfirmedDate.value) return 0
    return $dayjs(order.value.checkOutDate).diff(order.value.checkInDate, 'day')
  })
  
  return {
    order,
    loading,
    error,
    updateOrder,
    resetOrder,
    isConfirmedDate,
    totalNights
  }
})
```

---

## 🎨 LUỒNG RENDER UI

### **5.1 Component Lifecycle**
```
Component Mount
      ↓
Setup Function Execution
      ↓
Reactive Data Initialization
      ↓
API Calls (if needed)
      ↓
Template Rendering
      ↓
User Interaction
      ↓
State Updates
      ↓
Re-render (if needed)
```

### **5.2 Template Rendering Flow**
```
Vue Template
      ↓
Parse Template
      ↓
Create Virtual DOM
      ↓
Diff with Previous DOM
      ↓
Update Real DOM
      ↓
Trigger Side Effects
      ↓
User Sees Changes
```

**Code Implementation:**
```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center py-12">
      <p class="text-red-600">{{ error }}</p>
      <button @click="fetchData">Thử lại</button>
    </div>
    
    <!-- Success State -->
    <div v-else>
      <div v-for="item in data" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const error = ref<string | null>(null)
const data = ref([])

onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await api.getData()
    data.value = response
    
  } catch (err) {
    error.value = 'Có lỗi xảy ra'
  } finally {
    loading.value = false
  }
}
</script>
```

---

## ⚠️ LUỒNG XỬ LÝ LỖI

### **6.1 Error Handling Strategy**
```
Error Occurs
      ↓
Catch Error
      ↓
Log Error (Console)
      ↓
Determine Error Type
      ↓
Show User Message
      ↓
Handle Recovery
      ↓
Continue or Fallback
```

### **6.2 Error Types & Handling**
```
Network Error → Show "Mất kết nối"
Auth Error → Redirect to Login
Validation Error → Show Field Errors
Server Error → Show "Lỗi server"
Unknown Error → Show Generic Message
```

**Code Implementation:**
```typescript
// composables/useErrorHandler.ts
export const useErrorHandler = () => {
  const handleError = (error: any, context?: string) => {
    // Log error
    console.error(`[${context}] Error:`, error)
    
    // Determine error type
    let userMessage = 'Có lỗi xảy ra, vui lòng thử lại'
    
    if (error.status === 401) {
      userMessage = 'Phiên đăng nhập đã hết hạn'
      // Redirect to login
      navigateTo('/auth/login')
    } else if (error.status === 404) {
      userMessage = 'Không tìm thấy dữ liệu'
    } else if (error.status >= 500) {
      userMessage = 'Lỗi server, vui lòng thử lại sau'
    }
    
    // Show to user
    useToast().error(userMessage)
  }
  
  return { handleError }
}
```

---

## 📱 VÍ DỤ THỰC TẾ

### **7.1 Luồng Hiển Thị Danh Sách Phòng**

```
1. User truy cập /rooms
   ↓
2. Page component mount
   ↓
3. onMounted() trigger
   ↓
4. Gọi fetchRoomTypes()
   ↓
5. useRoomApi().getAllRoomTypes()
   ↓
6. HTTP request đến backend
   ↓
7. Backend trả về JSON data
   ↓
8. Transform data thành RoomTypeDisplay[]
   ↓
9. Cập nhật roomTypes.value
   ↓
10. Vue re-render template
   ↓
11. User thấy danh sách phòng
```

**Code Implementation:**
```typescript
// pages/rooms/index.vue
const fetchRoomTypes = async () => {
  try {
    console.log('🚀 Starting to fetch room types...')
    loading.value = true
    error.value = null
    
    const response = await getAllRoomTypes()
    console.log('✅ Raw API response:', response)
    
    if (response && Array.isArray(response)) {
      const transformed = transformRoomTypes(response)
      console.log('🔄 Transformed room types:', transformed)
      roomTypes.value = transformed
    } else {
      console.warn('⚠️ API response is not an array, using fallback data')
      roomTypes.value = getFallbackRoomTypes()
    }
  } catch (err) {
    console.error('❌ Error fetching room types:', err)
    error.value = 'Không thể tải dữ liệu từ server. Vui lòng thử lại sau.'
    roomTypes.value = getFallbackRoomTypes()
  } finally {
    loading.value = false
  }
}
```

### **7.2 Luồng Xử Lý Booking**

```
1. User chọn phòng và ngày
   ↓
2. Form validation
   ↓
3. Submit booking data
   ↓
4. API call tạo booking
   ↓
5. Backend xử lý và trả về
   ↓
6. Update order store
   ↓
7. Redirect to payment
   ↓
8. Payment processing
   ↓
9. Success/Error handling
   ↓
10. Update booking status
```

---

## 🔍 DEBUGGING VÀ LOGGING

### **8.1 Console Logging Strategy**
```
🚀 Function Start
📡 API Request
✅ Success Response
❌ Error Response
🔄 Data Transformation
⚠️ Warning/Edge Cases
```

### **8.2 Error Tracking**
```typescript
// Global error tracking
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // Send to error tracking service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // Send to error tracking service
})
```

---

## 📊 PERFORMANCE MONITORING

### **9.1 Key Metrics**
- **Time to First Byte (TTFB)**
- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **API Response Times**
- **Bundle Size**

### **9.2 Performance Monitoring**
```typescript
// Performance monitoring
export const usePerformance = () => {
  const measureApiCall = async (name: string, apiCall: () => Promise<any>) => {
    const start = performance.now()
    
    try {
      const result = await apiCall()
      const duration = performance.now() - start
      
      console.log(`⏱️ ${name} took ${duration.toFixed(2)}ms`)
      return result
    } catch (error) {
      const duration = performance.now() - start
      console.error(`⏱️ ${name} failed after ${duration.toFixed(2)}ms`)
      throw error
    }
  }
  
  return { measureApiCall }
}
```

---

## 🎯 KẾT LUẬN

Dự án Nikko Hotel có luồng hoạt động tương đối rõ ràng nhưng cần cải thiện:

### **Điểm Mạnh:**
- ✅ Sử dụng modern tech stack
- ✅ Component architecture rõ ràng
- ✅ State management với Pinia
- ✅ TypeScript cho type safety

### **Điểm Cần Cải Thiện:**
- ❌ Error handling không nhất quán
- ❌ API layer có 2 cách gọi khác nhau
- ❌ Configuration management poor
- ❌ Missing performance optimization

### **Khuyến Nghị:**
1. **Immediate**: Standardize API calls và error handling
2. **Short-term**: Implement unified API client
3. **Long-term**: Add comprehensive testing và performance monitoring

---

*Tài liệu này mô tả chi tiết luồng hoạt động của dự án Nikko Hotel Frontend.*
