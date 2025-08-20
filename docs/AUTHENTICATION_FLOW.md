# Authentication User Flow Documentation

## Overview

This document describes the complete authentication flow for the Nikko Hotel application, including API mapping, state management, and user experience.

## API Endpoints Mapping

### Backend Authentication Controller
```java
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @PostMapping("/token")      // Login
    @PostMapping("/introspect") // Validate token
    @PostMapping("/logout")     // Logout
    @PostMapping("/refresh")    // Refresh token
    @PostMapping("/callback")   // OAuth callback
}
```

### Frontend API Mapping

| Backend Endpoint | Frontend Function | Purpose |
|------------------|-------------------|---------|
| `POST /auth/token` | `login()` | User login with credentials |
| `POST /auth/introspect` | `checkToken()` | Validate current token |
| `POST /auth/logout` | `logout()` | User logout |
| `POST /auth/refresh` | `refreshToken()` | Refresh expired token |
| `POST /auth/callback` | `handleOAuthCallback()` | Handle OAuth authentication |

## State Management

### Auth Store Structure
```typescript
interface AuthStore {
  // Authentication state
  token: string
  refreshToken: string
  isAuthenticated: boolean
  isLoading: boolean
  
  // User information
  user: UserInfo | null
  userName: string
  email: string
  id: string
  
  // Flow states
  isLoggingIn: boolean
  isLoggingOut: boolean
  isRefreshing: boolean
  
  // Error handling
  authError: string | null
  
  // Computed properties
  hasToken: boolean
  isLoggedIn: boolean
  
  // Actions
  setAuthData(authResponse: AuthenticationResponse): void
  setUserInfo(userInfo: UserInfo): void
  clearAuth(): void
  setError(error: string): void
  clearError(): void
}
```

## User Flow Scenarios

### 1. User Login Flow

```typescript
// In your login component
const { login } = useAuth()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    const credentials = {
      email: 'user@example.com',
      password: 'password123'
    }
    
    const result = await login(credentials, true) // true for remember me
    
    if (result.success) {
      // User is automatically redirected to dashboard
      // Token is stored and validated
      // Auto-refresh is started
    }
  } catch (error) {
    // Error is automatically handled and displayed
    console.error('Login failed:', error)
  }
}
```

**Flow Steps:**
1. User enters credentials
2. `login()` function is called
3. API call to `POST /auth/token`
4. JWT token is decoded and user info extracted
5. Auth store is updated with token and user data
6. User is redirected to dashboard
7. Auto-refresh timer is started

### 2. Token Validation Flow

```typescript
// Automatic validation on app start
const { checkToken } = useAuth()

const validateSession = async () => {
  const isValid = await checkToken()
  
  if (!isValid) {
    // Token is invalid, user is logged out
    // Redirected to login page
  }
}
```

**Flow Steps:**
1. App starts and checks for existing token
2. `checkToken()` calls `POST /auth/introspect`
3. If token is valid, user stays logged in
4. If token is invalid, user is logged out

### 3. Token Refresh Flow

```typescript
// Automatic refresh every 4 minutes
const { refreshToken } = useAuth()

const handleTokenRefresh = async () => {
  try {
    const newToken = await refreshToken()
    // Token is automatically updated in store
  } catch (error) {
    // If refresh fails, user is logged out
  }
}
```

**Flow Steps:**
1. Timer triggers every 4 minutes
2. `refreshToken()` calls `POST /auth/refresh`
3. New token is received and stored
4. User session continues seamlessly

### 4. User Logout Flow

```typescript
// In your logout component
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
  // User is automatically redirected to login page
  // All auth data is cleared
  // Auto-refresh is stopped
}
```

**Flow Steps:**
1. User clicks logout
2. `logout()` calls `POST /auth/logout`
3. All auth data is cleared from store
4. User is redirected to login page
5. Auto-refresh timer is stopped

### 5. OAuth Callback Flow

```typescript
// Handle OAuth callback
const { handleOAuthCallback } = useAuth()

const handleOAuthResponse = async (code: string, state?: string) => {
  try {
    const result = await handleOAuthCallback(code, state)
    
    if (result.success) {
      // User is authenticated via OAuth
      // Redirected to dashboard
    }
  } catch (error) {
    // OAuth authentication failed
  }
}
```

**Flow Steps:**
1. User completes OAuth flow
2. OAuth provider redirects with code
3. `handleOAuthCallback()` calls `POST /auth/callback`
4. Token is received and stored
5. User is redirected to dashboard

## API Usage Examples

### Using Auth Service Directly

```typescript
import { useAuthService } from '@/composables/useAuthService'

const authService = useAuthService()

// Login
const loginResponse = await authService.login({
  email: 'user@example.com',
  password: 'password123'
})

// Validate token
const validationResponse = await authService.introspect(token)

// Logout
await authService.logout(token)

// Refresh token
const refreshResponse = await authService.refreshToken(refreshToken)

// OAuth callback
const oauthResponse = await authService.callback(code, state)
```

### Using Auth API Wrapper

```typescript
import authAPI from '@/api/auth'

// Login
const loginResult = await authAPI.loginApi({
  body: {
    email: 'user@example.com',
    password: 'password123'
  }
})

// Check authentication status
const authStatus = authAPI.checkAuthApi()
```

### Using Auth Composable (Recommended)

```typescript
import { useAuth } from '@/composables/useAuth'

const { login, logout, checkToken, refreshToken } = useAuth()
const authStore = useAuthStore()

// Login with remember me
await login(credentials, true)

// Check if user is logged in
if (authStore.isLoggedIn) {
  // User is authenticated
}

// Logout
await logout()

// Manual token refresh
await refreshToken()
```

## Error Handling

### Automatic Error Handling

The authentication system automatically handles common errors:

- **Invalid credentials**: Displayed to user
- **Token expiration**: Automatic refresh attempt
- **Network errors**: Retry mechanism
- **Server errors**: Graceful degradation

### Custom Error Handling

```typescript
const { login } = useAuth()
const authStore = useAuthStore()

try {
  await login(credentials)
} catch (error) {
  // Custom error handling
  if (error.status === 401) {
    // Unauthorized - show specific message
  } else if (error.status === 500) {
    // Server error - show generic message
  }
  
  // Access error from store
  console.log('Auth error:', authStore.authError)
}
```

## Security Features

### Token Management
- JWT tokens are automatically decoded and validated
- Refresh tokens are used for seamless session renewal
- Tokens are stored securely in localStorage with persistence

### Auto-refresh
- Tokens are automatically refreshed every 4 minutes
- Failed refresh attempts trigger logout
- No user intervention required

### Session Validation
- Tokens are validated on app start
- Invalid tokens are automatically cleared
- Users are redirected to login when needed

## Integration with Other Services

### HTTP Interceptor
The authentication token is automatically included in API requests:

```typescript
// In useHttp.ts
const authStore = useAuthStore()

// Add token to all requests
headers: {
  'Authorization': `Bearer ${authStore.token}`
}
```

### Route Guards
Protected routes automatically check authentication:

```typescript
// In middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login')
  }
})
```

## Best Practices

1. **Always use the `useAuth` composable** for authentication operations
2. **Check `authStore.isLoggedIn`** before accessing protected resources
3. **Handle loading states** using `authStore.isLoggingIn`, `authStore.isLoggingOut`
4. **Display errors** from `authStore.authError`
5. **Use route guards** for protected pages
6. **Implement proper error boundaries** for authentication failures

## Testing

### Unit Tests
```typescript
// Test authentication flow
describe('Authentication', () => {
  it('should login user successfully', async () => {
    const { login } = useAuth()
    const result = await login(credentials)
    expect(result.success).toBe(true)
  })
  
  it('should handle invalid credentials', async () => {
    const { login } = useAuth()
    await expect(login(invalidCredentials)).rejects.toThrow()
  })
})
```

### Integration Tests
```typescript
// Test API endpoints
describe('Auth API', () => {
  it('should call login endpoint', async () => {
    const authService = useAuthService()
    const response = await authService.login(credentials)
    expect(response.result.authenticated).toBe(true)
  })
})
```

This authentication system provides a complete, secure, and user-friendly authentication flow that integrates seamlessly with your backend API endpoints.
