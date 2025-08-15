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
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Nút ẩn (gạch ngang) -->
            <button
              @click="minimizeChat"
              class="w-6 h-6 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center justify-center"
              title="Đóng chat"
            >
              <Icon name="mdi:close" class="w-4 h4" />
            </button>
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-xs">Online</span>
          </div>
        </div>

        <!-- Chat Content -->
        <div class="flex-1 flex flex-col">
          <!-- Messages Area -->
          <div class="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50 min-h-0 messages-area scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <!-- Welcome Message -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4 text-white" />
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm max-w-[85%]">
                <p class="text-sm text-gray-700">
                  Xin chào! Tôi là AI Assistant. Tôi có thể giúp bạn:
                </p>
                <ul class="text-xs text-gray-600 mt-2 space-y-1">
                  <li>• Kiểm tra tình trạng phòng</li>
                  <li>• Hỗ trợ đặt phòng</li>
                  <li>• Giải đáp thắc mắc</li>
                  <li>• Báo cáo sự cố</li>
                </ul>
              </div>
            </div>

            <!-- Sample Messages -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4 text-white" />
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm max-w-[85%]">
                <p class="text-sm text-gray-700">
                  Bạn có thể hỏi tôi bất cứ điều gì về khách sạn. Tôi sẽ cố gắng giúp bạn một cách tốt nhất!
                </p>
              </div>
            </div>

            <!-- User Message Example -->
            <div class="flex items-start gap-3 justify-end">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-tr-md px-3 py-2 shadow-sm max-w-[85%] text-right">
                <p class="text-sm text-white">
                  Xin chào! Tôi cần hỗ trợ đặt phòng
                </p>
                <p class="text-xs text-blue-100 mt-1">12:30 PM</p>
              </div>
              <div class="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account" class="w-4 h-4 text-white" />
              </div>
            </div>

            <!-- AI Response Example -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4 text-white" />
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm max-w-[85%]">
                <p class="text-sm text-gray-700">
                  Xin chào! Tôi rất vui được giúp bạn đặt phòng. Bạn có thể cho tôi biết:
                </p>
                <ul class="text-xs text-gray-600 mt-2 space-y-1">
                  <li>• Ngày check-in và check-out</li>
                  <li>• Số lượng khách</li>
                  <li>• Loại phòng mong muốn</li>
                </ul>
                <p class="text-xs text-gray-500 mt-2">12:31 PM</p>
              </div>
            </div>

            <!-- Additional Messages for Scrolling Demo -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4 text-white" />
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm max-w-[85%]">
                <p class="text-sm text-gray-700">
                  Tôi đã ghi nhận yêu cầu của bạn. Hãy để tôi kiểm tra tình trạng phòng trống...
                </p>
                <p class="text-xs text-gray-500 mt-2">12:32 PM</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4 text-white" />
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm max-w-[85%]">
                <p class="text-sm text-gray-700">
                  Tôi thấy có phòng Deluxe trống từ ngày mai. Bạn có muốn đặt không?
                </p>
                <p class="text-xs text-gray-500 mt-2">12:33 PM</p>
              </div>
            </div>

            <div class="flex items-start gap-3 justify-end">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-tr-md px-3 py-2 shadow-sm max-w-[85%] text-right">
                <p class="text-sm text-white">
                  Có, tôi muốn đặt phòng đó!
                </p>
                <p class="text-xs text-blue-100 mt-1">12:34 PM</p>
              </div>
              <div class="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account" class="w-4 h-4 text-white" />
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
                  type="text"
                  placeholder="Nhập tin nhắn của bạn..."
                  class="w-full px-3 py-2 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white focus:bg-white"
                  :class="newMessage.trim() ? 'border-blue-300 bg-blue-50' : ''"
                />
                <!-- Character count -->
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {{ newMessage.length }}/500
                </div>
              </div>
              <button
                @click="sendMessage"
                :disabled="!newMessage.trim()"
                class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                title="Gửi tin nhắn (Enter)"
              >
                <Icon name="mdi:send" class="w-5 h-5" />
              </button>
            </div>
            <!-- Hint text -->
            <div class="mt-2 text-xs text-gray-500 text-center">
              Nhấn Enter để gửi nhanh
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
const isMinimized = ref(false)

// Methods
const toggleChat = () => {
  console.log('Toggle chat clicked, current state:', isOpen.value)
  isOpen.value = !isOpen.value
  console.log('New state:', isOpen.value)
  if (isOpen.value) {
    unreadCount.value = 0
  }
}

const minimizeChat = () => {
  isOpen.value = false
  isMinimized.value = false
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  // TODO: Implement actual chat functionality
  console.log('Sending message:', newMessage.value)
  
  // Thêm tin nhắn người dùng vào chat
  const userMessage = {
    id: Date.now(),
    text: newMessage.value,
    isUser: true,
    timestamp: new Date()
  }
  
  // Xóa input
  newMessage.value = ''
  
  // Simulate AI response
  setTimeout(() => {
    // Add your AI logic here
    console.log('AI response received')
    
    // Thêm tin nhắn AI (placeholder)
    const aiMessage = {
      id: Date.now() + 1,
      text: 'Cảm ơn bạn đã gửi tin nhắn! Tôi sẽ xử lý yêu cầu của bạn sớm nhất có thể.',
      isUser: false,
      timestamp: new Date()
    }
  }, 1000)
}

// Không có event listener để đóng chat khi click bên ngoài
// Chỉ có thể đóng bằng nút gạch ngang hoặc nút X
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
  flex-shrink:0;
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
</style>
