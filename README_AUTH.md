# Complete Authentication System for Nikko Hotel

## 🚀 Overview

This authentication system provides a complete user flow with API mapping and state management for the Nikko Hotel application. It includes all the backend API endpoints you specified and provides a seamless user experience.

## 📋 Backend API Endpoints Mapped

Your backend authentication controller:
```java
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @PostMapping("/token")      // ✅ Mapped to login()
    @PostMapping("/introspect") // ✅ Mapped to checkToken()
    @PostMapping("/logout")     // ✅ Mapped to logout()
    @PostMapping("/refresh")    // ✅ Mapped to refreshToken()
    @PostMapping("/callback")   // ✅ Mapped to handleOAuthCallback()
}
```

## 🛠️ Features

### ✅ Complete API Mapping
- All 5 backend endpoints are mapped to frontend functions
- Proper error handling and response types
- TypeScript support with full type safety

### ✅ State Management
- Comprehensive auth store with Pinia
- Loading states for all operations
- Error handling and display
- Persistent storage with localStorage

### ✅ User Flow
- Login with remember me functionality
- Automatic token validation
- Seamless token refresh
- Secure logout
- OAuth callback support

### ✅ Security Features
- JWT token decoding and validation
- Automatic token refresh every 4 minutes
- Session validation on app start
- Secure token storage

## 🚀 Quick Start

### 1. Environment Setup

Create `.env` file:
```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
API_GATEWAY_URL=http://localhost:8092
AUTH_SERVICE_URL=http://localhost:8092
USER_SERVICE_URL=http://localhost:8082
```

### 2. Basic Usage

```typescript
// In your component
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'

const { login, logout, checkToken, refreshToken } = useAuth()
const authStore = useAuthStore()

// Login
const handleLogin = async () => {
  try {
    const result = await login({
      email: 'user@example.com',
      password: 'password123'
    }, true) // true for remember me
    
    if (result.success) {
      // User is automatically redirected
      console.log('Login successful!')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Check if user is logged in
if (authStore.isLoggedIn) {
  console.log('User is authenticated')
}

// Logout
const handleLogout = async () => {
  await logout()
  // User is automatically redirected to login
}
```

### 3. Using the Example Component

Add the example component to any page:

```vue
<template>
  <div>
    <AuthExample />
  </div>
</template>
```

## 📁 File Structure

```
├── stores/
│   └── auth.ts                    # Enhanced auth store with state management
├── composables/
│   ├── useAuth.ts                 # Main auth composable with all functions
│   └── useAuthService.ts          # API service layer
├── api/
│   └── auth.ts                    # API wrapper functions
├── plugins/
│   └── auth.client.ts             # Auto-refresh and initialization
├── types/
│   └── auth.ts                    # TypeScript types
├── components/
│   └── AuthExample.vue            # Example component
└── docs/
    └── AUTHENTICATION_FLOW.md     # Complete documentation
```

## 🔧 API Functions

### Core Authentication Functions

| Function | Backend Endpoint | Purpose |
|----------|------------------|---------|
| `login(credentials, remember)` | `POST /auth/token` | User login |
| `logout()` | `POST /auth/logout` | User logout |
| `checkToken()` | `POST /auth/introspect` | Validate token |
| `refreshToken()` | `POST /auth/refresh` | Refresh token |
| `handleOAuthCallback(code, state)` | `POST /auth/callback` | OAuth authentication |

### Store Actions

| Action | Purpose |
|--------|---------|
| `authStore.setAuthData(authResponse)` | Set authentication data |
| `authStore.setUserInfo(userInfo)` | Set user information |
| `authStore.clearAuth()` | Clear all auth data |
| `authStore.setError(error)` | Set error message |
| `authStore.clearError()` | Clear error message |

### Store State

| State | Type | Purpose |
|-------|------|---------|
| `authStore.token` | `string` | JWT token |
| `authStore.isAuthenticated` | `boolean` | Authentication status |
| `authStore.user` | `UserInfo \| null` | User information |
| `authStore.isLoggingIn` | `boolean` | Login loading state |
| `authStore.isLoggingOut` | `boolean` | Logout loading state |
| `authStore.authError` | `string \| null` | Error message |

## 🔄 User Flow Examples

### 1. Login Flow

```typescript
const { login } = useAuth()

// Simple login
await login({ email: 'user@example.com', password: 'password' })

// Login with remember me
await login({ email: 'user@example.com', password: 'password' }, true)
```

### 2. Token Management

```typescript
const { checkToken, refreshToken } = useAuth()

// Check if token is valid
const isValid = await checkToken()

// Manually refresh token
const newToken = await refreshToken()
```

### 3. OAuth Flow

```typescript
const { handleOAuthCallback } = useAuth()

// Handle OAuth callback
const result = await handleOAuthCallback('oauth_code_123', 'state_456')
```

### 4. Logout Flow

```typescript
const { logout } = useAuth()

// Logout user
await logout()
// User is automatically redirected to login page
```

## 🛡️ Security Features

### Automatic Token Management
- Tokens are automatically refreshed every 4 minutes
- Failed refresh attempts trigger logout
- Session validation on app start

### Error Handling
- Comprehensive error handling for all API calls
- User-friendly error messages
- Automatic cleanup on errors

### State Persistence
- Authentication state persists across browser sessions
- Secure token storage in localStorage
- Automatic state restoration on app start

## 🔍 Monitoring and Debugging

### Console Logging
All authentication operations are logged to console for debugging:

```typescript
// Enable detailed logging
console.log('Auth store state:', authStore)
console.log('User info:', authStore.user)
console.log('Token present:', authStore.hasToken)
```

### Error Monitoring
```typescript
// Watch for authentication errors
watch(() => authStore.authError, (error) => {
  if (error) {
    console.error('Authentication error:', error)
    // Send to error monitoring service
  }
})
```

## 🧪 Testing

### Unit Tests
```typescript
describe('Authentication', () => {
  it('should login successfully', async () => {
    const { login } = useAuth()
    const result = await login(credentials)
    expect(result.success).toBe(true)
  })
})
```

### Integration Tests
```typescript
describe('Auth API', () => {
  it('should call login endpoint', async () => {
    const authService = useAuthService()
    const response = await authService.login(credentials)
    expect(response.result.authenticated).toBe(true)
  })
})
```

## 🚀 Production Deployment

### Environment Variables
```env
# Production
NUXT_PUBLIC_API_BASE=https://api.nikkohotel.com
AUTH_SERVICE_URL=https://auth.nikkohotel.com
```

### Security Considerations
- Use HTTPS in production
- Implement rate limiting
- Add CSRF protection
- Use secure cookie storage for sensitive data

## 📚 Additional Resources

- [Complete Documentation](./docs/AUTHENTICATION_FLOW.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Example Component](./components/AuthExample.vue)

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Write tests for new features
5. Update documentation

## 📄 License

This authentication system is part of the Nikko Hotel project.

---

**Ready to use!** 🎉

The authentication system is now complete with all your backend API endpoints mapped and comprehensive state management. Users can login, logout, and enjoy a seamless authentication experience with automatic token management.
