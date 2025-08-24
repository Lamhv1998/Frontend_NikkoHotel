<template>
  <div class="fixed bottom-6 right-6 z-[9999] ai-chat-container">
    <!-- Chat Button -->
    <button
      @click="toggleChat"
      class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      :class="isOpen ? 'ring-4 ring-blue-300 ring-opacity-50' : ''"
    >
      <Icon :name="isOpen ? 'mdi:close' : 'mdi:chat'" class="w-7 h-7 transition-transform duration-300" :class="isOpen ? 'rotate-90' : ''" />
      
      <!-- Notification Badge -->
      <div v-if="unreadCount > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </div>
      
      <!-- Tooltip -->
      <div class="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {{ isOpen ? 'Đóng chat' : 'Chat với AI' }}
        <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>
    </button>

    <!-- Chat Popup -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div 
        v-if="isOpen"
        class="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[70vh] min-h-[350px] chat-popup"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl text-white">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="mdi:robot" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-semibold text-sm">AI Assistant</h3>
              <p class="text-xs text-blue-100">Hỗ trợ 24/7</p>
              <p class="text-xs text-blue-200 mt-1 font-mono">ID: {{ sessionId.substring(0, 8) }}...</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="clearHistory"
              class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="Xóa lịch sử chat"
            >
              <Icon name="mdi:delete-sweep" class="w-4 h-4" />
            </button>
            <button
              @click="minimizeChat"
              class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="Thu nhỏ"
            >
              <Icon name="mdi:minus" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Chat Content -->
        <div class="flex-1 flex flex-col">
          <!-- Messages Area -->
          <div class="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50 min-h-0 messages-area scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <!-- Dynamic Messages -->
            <div 
              v-for="message in messages" 
              :key="message.id"
              class="flex items-start gap-3"
              :class="message.isUser ? 'justify-end' : ''"
            >
              <!-- AI Avatar -->
              <div 
                v-if="!message.isUser"
                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Icon 
                  :name="message.type === 'error' ? 'mdi:alert-circle' : 'mdi:robot'" 
                  class="w-4 h-4 text-white" 
                />
              </div>
              
              <!-- Message Content -->
              <div 
                class="px-3 py-2 shadow-sm max-w-[85%] rounded-2xl"
                :class="[
                  message.isUser 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-md' 
                    : message.type === 'error'
                    ? 'bg-red-50 border border-red-200 text-red-700 rounded-tl-md'
                    : message.type === 'welcome'
                    ? 'bg-blue-50 border border-blue-200 text-blue-700 rounded-tl-md'
                    : 'bg-white text-gray-700 rounded-tl-md'
                ]"
              >
                <p 
                  class="text-sm whitespace-pre-line"
                  :class="message.isUser ? 'text-white' : ''"
                >
                  {{ message.text }}
                </p>
                <p 
                  class="text-xs mt-1"
                  :class="message.isUser ? 'text-blue-100' : 'text-gray-500'"
                >
                  {{ formatTime(message.timestamp) }}
                </p>
              </div>
              
              <!-- User Avatar -->
              <div 
                v-if="message.isUser"
                class="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Icon name="mdi:account" class="w-4 h-4 text-white" />
              </div>
            </div>
            
            <!-- Loading Indicator -->
            <div v-if="isLoading" class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4 text-white" />
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm">
                <div class="flex items-center gap-2">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                  <span class="text-sm text-gray-500">AI đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-3 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0 input-area">
            <div class="flex items-center gap-3">
              <div class="flex-1 relative">
                <input
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  @input="limitMessageLength"
                  type="text"
                  placeholder="Nhập tin nhắn của bạn..."
                  :disabled="isLoading"
                  maxlength="500"
                  class="w-full px-3 py-2 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  :class="newMessage.trim() ? 'border-blue-300 bg-blue-50' : ''"
                />
                <!-- Character count -->
                <div 
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  :class="[
                    newMessage.length > 450 ? 'text-red-500 font-medium' :
                    newMessage.length > 400 ? 'text-yellow-500' :
                    'text-gray-400'
                  ]"
                >
                  {{ newMessage.length }}/500
                </div>
              </div>
              <button
                @click="sendMessage"
                :disabled="!newMessage.trim() || isLoading"
                class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                title="Gửi tin nhắn (Enter)"
              >
                <Icon v-if="isLoading" name="mdi:loading" class="w-5 h-5 animate-spin" />
                <Icon v-else name="mdi:send" class="w-5 h-5" />
              </button>
            </div>
            <!-- Hint text -->
            <div class="mt-2 text-xs text-gray-500 text-center">
              {{ isLoading ? 'AI đang xử lý...' : 'Nhấn Enter để gửi nhanh' }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Reactive data
const isOpen = ref(false)
const newMessage = ref('')
const unreadCount = ref(0)
const messages = ref<any[]>([])
const isLoading = ref(false)
const sessionId = ref('')
const isMinimized = ref(false)

// Interface for AI response
interface AIResponse {
  sessionId: string
  value: string
}

// Initialize session ID and welcome messages
onMounted(() => {
  sessionId.value = generateSessionId()
  initializeChat()
  //.log('🚀 AI Chat initialized with session ID:', sessionId.value)
})

// Generate unique session ID
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Initialize chat with welcome messages
const initializeChat = () => {
  messages.value = [
    {
      id: 1,
      text: 'Xin chào! Tôi là AI Assistant của Nika Hotel. Tôi có thể giúp bạn:',
      isUser: false,
      timestamp: new Date(),
      type: 'welcome'
    },
    {
      id: 2,
      text: '• Tìm hiểu về các loại phòng\n• Hỗ trợ đặt phòng\n• Giải đáp thắc mắc\n• Thông tin về dịch vụ khách sạn',
      isUser: false,
      timestamp: new Date(),
      type: 'welcome'
    },
    {
      id: 3,
      text: 'Bạn có thể hỏi tôi bất cứ điều gì về khách sạn. Tôi sẽ cố gắng giúp bạn một cách tốt nhất!',
      isUser: false,
      timestamp: new Date(),
      type: 'welcome'
    }
  ]
}

// Methods
const toggleChat = () => {
  //.log('Toggle chat clicked, current state:', isOpen.value)
  isOpen.value = !isOpen.value
  //.log('New state:', isOpen.value)
  if (isOpen.value) {
    unreadCount.value = 0
  }
}

const minimizeChat = () => {
  isOpen.value = false
  isMinimized.value = false
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return
  
  const userText = newMessage.value.trim()
  //.log('🚀 Sending message to AI:', userText)
  
  // Add user message to chat
  const userMessage = {
    id: Date.now(),
    text: userText,
    isUser: true,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  
  // Clear input
  newMessage.value = ''
  
  // Show loading state
  isLoading.value = true
  
  try {
    // Call AI backend API
    const response = await $fetch<AIResponse>(`http://localhost:8088/ai/ask`, {
      method: 'GET',
      params: {
        query: userText,
        sessionId: sessionId.value
      }
    })
    
    //.log('🤖 AI Response received:', response)
    
    // Update session ID from backend response if provided
    if (response.sessionId && response.sessionId !== sessionId.value) {
      //.log('🔄 Session ID updated from backend:', response.sessionId)
      sessionId.value = response.sessionId
    }
    
    // Add AI response to chat
    const aiMessage = {
      id: Date.now() + 1,
      text: response.value,
      isUser: false,
      timestamp: new Date(),
      type: 'ai'
    }
    messages.value.push(aiMessage)
    
    // Scroll to bottom
    await nextTick()
    scrollToBottom()
    
  } catch (error) {
    //.error('❌ Error calling AI API:', error)
    
    // Extract error details
    let errorText = 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.'
    
    if (error?.response?._data?.message) {
      errorText = `Lỗi: ${error.response._data.message}`
    } else if (error?.message) {
      errorText = `Lỗi: ${error.message}`
    }
    
    // Add error message
    const errorMessage = {
      id: Date.now() + 1,
      text: errorText,
      isUser: false,
      timestamp: new Date(),
      type: 'error'
    }
    messages.value.push(errorMessage)
    
    // Scroll to bottom
    await nextTick()
    scrollToBottom()
  } finally {
    isLoading.value = false
  }
}

// Scroll to bottom of messages
const scrollToBottom = () => {
  const messagesArea = document.querySelector('.messages-area')
  if (messagesArea) {
    messagesArea.scrollTop = messagesArea.scrollHeight
  }
}

// Clear chat history
const clearHistory = async () => {
  try {
    const response = await $fetch<{ sessionId: string }>(`http://localhost:8088/ai/clear-history`, {
      method: 'POST',
      params: {
        sessionId: sessionId.value
      }
    })
    
    // Update session ID from backend response if provided
    if (response.sessionId && response.sessionId !== sessionId.value) {
      //.log('🔄 Session ID updated after clear:', response.sessionId)
      sessionId.value = response.sessionId
    } else {
      // Generate new session ID if backend doesn't provide one
      sessionId.value = generateSessionId()
    }
    
    // Clear messages and reinitialize
    initializeChat()
    
    //.log('🧹 Chat history cleared')
  } catch (error) {
    //.error('❌ Error clearing chat history:', error)
    // Fallback: generate new session ID on error
    sessionId.value = generateSessionId()
    initializeChat()
  }
}

// Format timestamp to readable time
const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  
  return timestamp.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Limit message length to 500 characters
const limitMessageLength = () => {
  if (newMessage.value.length > 500) {
    newMessage.value = newMessage.value.substring(0, 500)
  }
}

// Debug function to show current session info
const showSessionInfo = () => {
  //.log('📋 Current Session Info:')
  //.log('Session ID:', sessionId.value)
  //.log('Messages Count:', messages.value.length)
  //.log('Is Loading:', isLoading.value)
  //.log('Is Open:', isOpen.value)
}
</script>

<style scoped>
.ai-chat-container {
  pointer-events: auto;
  isolation: isolate;
}

/* Đảm bảo chatbox hiển thị đầy đủ */
.ai-chat-container .chat-popup {
  max-height: 70vh;
  min-height: 350px;
}

/* Đảm bảo input area không bị cắt */
.ai-chat-container .input-area {
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

/* Đảm bảo messages area có thể scroll */
.ai-chat-container .messages-area {
  min-height: 0;
  overflow-y: auto;
  max-height: 300px;
}

/* Tùy chỉnh scrollbar cho đẹp */
.ai-chat-container .messages-area::-webkit-scrollbar {
  width: 6px;
}

.ai-chat-container .messages-area::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.ai-chat-container .messages-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.ai-chat-container .messages-area::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive design */
@media (max-width: 768px) {
  .ai-chat-container {
    bottom: 1rem;
    right: 1rem;
  }
  
  .ai-chat-container .chat-popup {
    width: calc(100vw - 2rem);
    right: -1rem;
    max-width: 320px;
  }
  
  .ai-chat-container .chat-popup .tooltip {
    display: none;
  }
}

/* Animation for chat button */
.ai-chat-container button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

/* Hover effects */
.ai-chat-container button:hover {
  animation: none;
  transform: scale(1.1);
}

/* Focus states for accessibility */
.ai-chat-container button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading animation */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s ease-in-out infinite both;
}
</style>

