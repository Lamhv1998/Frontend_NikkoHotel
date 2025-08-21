<template>
  <div class="p-4 border rounded-lg">
    <h3 class="text-lg font-semibold mb-4">Test Login Logic</h3>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">Email:</label>
        <input 
          v-model="testEmail" 
          type="email" 
          class="w-full px-3 py-2 border rounded-md"
          placeholder="test@example.com"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Password:</label>
        <input 
          v-model="testPassword" 
          type="password" 
          class="w-full px-3 py-2 border rounded-md"
          placeholder="password"
        />
      </div>
      
      <button 
        @click="testLogin"
        class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        :disabled="testing"
      >
        {{ testing ? 'Testing...' : 'Test Login' }}
      </button>
      
      <div v-if="testResult" class="mt-4 p-3 rounded-md" :class="testResult.success ? 'bg-green-100' : 'bg-red-100'">
        <h4 class="font-medium">{{ testResult.success ? 'Success' : 'Failed' }}</h4>
        <p class="text-sm">{{ testResult.message }}</p>
        <pre v-if="testResult.details" class="mt-2 text-xs bg-gray-100 p-2 rounded">{{ JSON.stringify(testResult.details, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const testEmail = ref('user@example.com')
const testPassword = ref('password')
const testing = ref(false)
const testResult = ref(null)

const testLogin = async () => {
  testing.value = true
  testResult.value = null
  
  try {
    const { loginUser } = useAuth()
    
    console.log('Testing login with:', { email: testEmail.value, password: testPassword.value })
    
    const result = await loginUser({ 
      email: testEmail.value, 
      password: testPassword.value 
    })
    
    testResult.value = {
      success: result.success,
      message: result.message,
      details: result
    }
    
    console.log('Test result:', result)
    
  } catch (error) {
    console.error('Test error:', error)
    testResult.value = {
      success: false,
      message: error.message || 'Test failed',
      details: error
    }
  } finally {
    testing.value = false
  }
}
</script>
