# AI Chat Component - Frontend_NikkoHotel

## 🚀 **Tổng Quan**

AI Chat Component là một tính năng chat với AI Assistant được tích hợp toàn cục trong Frontend_NikkoHotel. Component này cho phép khách hàng tương tác với AI để được hỗ trợ về thông tin khách sạn, đặt phòng và các dịch vụ khác.

## ✨ **Tính Năng Chính**

### **1. Chat Interface**
- **Chat Button**: Nút chat tròn với animation pulse
- **Chat Popup**: Giao diện chat đầy đủ với header, messages area và input
- **Responsive Design**: Tối ưu cho cả desktop và mobile

### **2. AI Interaction**
- **Real-time Chat**: Chat real-time với AI Assistant
- **Session Management**: Quản lý phiên chat với session ID
- **Message History**: Lưu trữ lịch sử tin nhắn
- **Error Handling**: Xử lý lỗi và hiển thị thông báo phù hợp

### **3. User Experience**
- **Welcome Messages**: Tin nhắn chào mừng tự động
- **Loading States**: Hiển thị trạng thái đang xử lý
- **Character Limit**: Giới hạn 500 ký tự mỗi tin nhắn
- **Time Stamps**: Hiển thị thời gian tin nhắn

## 🏗️ **Cấu Trúc Component**

### **File Location**
```
Frontend_NikkoHotel/
├── components/
│   └── UI/
│       └── AIChatButton.vue    # AI Chat Component
├── app.vue                     # Import và sử dụng toàn cục
└── README_AI_Chat.md          # Hướng dẫn này
```

### **Component Structure**
```vue
<template>
  <!-- Chat Button -->
  <button @click="toggleChat">...</button>
  
  <!-- Chat Popup -->
  <Transition>
    <div v-if="isOpen" class="chat-popup">
      <!-- Header -->
      <!-- Messages Area -->
      <!-- Input Area -->
    </div>
  </Transition>
</template>

<script setup>
// Reactive data
// Methods
// Lifecycle hooks
</script>

<style scoped>
// Responsive styles
// Animations
// Custom scrollbar
</style>
```

## 🔧 **Cài Đặt & Sử Dụng**

### **1. Tự Động Hoạt Động**
Component được import tự động trong `app.vue` và hiển thị trên tất cả các trang.

### **2. Không Cần Cấu Hình Thêm**
- Tự động khởi tạo khi trang load
- Tự động tạo session ID
- Tự động kết nối với AI backend

### **3. Vị Trí Hiển Thị**
- **Desktop**: Góc phải dưới (bottom-right)
- **Mobile**: Responsive với kích thước phù hợp

## 🌐 **Backend Integration**

### **API Endpoints**
```typescript
// AI Chat API
GET  http://localhost:8088/ai/ask?query={message}&sessionId={sessionId}
POST http://localhost:8088/ai/clear-history?sessionId={sessionId}
```

### **Response Format**
```typescript
interface AIResponse {
  sessionId: string
  value: string
}
```

### **Session Management**
- Mỗi phiên chat có unique session ID
- Session được duy trì trong suốt quá trình chat
- Có thể clear history để bắt đầu phiên mới

## 🎨 **Styling & Animation**

### **Design System**
- **Colors**: Blue-Purple gradient theme
- **Shadows**: Modern shadow system
- **Border Radius**: Rounded corners (xl, 2xl)
- **Transitions**: Smooth animations (300ms)

### **Animations**
- **Pulse**: Button animation khi idle
- **Scale**: Hover effects
- **Slide**: Chat popup transitions
- **Bounce**: Loading indicators

### **Responsive Breakpoints**
```css
/* Mobile */
@media (max-width: 768px) {
  .ai-chat-container {
    bottom: 1rem;
    right: 1rem;
  }
  
  .chat-popup {
    width: calc(100vw - 2rem);
    max-width: 320px;
  }
}
```

## 📱 **Mobile Optimization**

### **Touch-Friendly**
- Button size: 64x64px (16x16 in Tailwind)
- Touch targets: Minimum 44px
- Spacing: Adequate for thumb navigation

### **Responsive Layout**
- Chat popup: Full width trên mobile
- Input area: Optimized cho mobile keyboard
- Scroll behavior: Smooth scrolling trên mobile

## 🔒 **Security & Privacy**

### **Session Isolation**
- Mỗi user có unique session ID
- Session không được share giữa các users
- Session timeout tự động

### **Input Validation**
- Character limit: 500 ký tự
- XSS protection: Input sanitization
- Rate limiting: Backend controlled

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. AI Chat không hiển thị**
```bash
# Kiểm tra console errors
# Kiểm tra import trong app.vue
# Restart dev server
```

#### **2. API calls fail**
```bash
# Kiểm tra backend service (port 8088)
# Kiểm tra network tab
# Verify API endpoints
```

#### **3. Styling issues**
```bash
# Kiểm tra Tailwind CSS
# Kiểm tra custom CSS
# Clear browser cache
```

### **Debug Mode**
```typescript
// Enable debug logging
const showSessionInfo = () => {
  console.log('📋 Current Session Info:')
  console.log('Session ID:', sessionId.value)
  console.log('Messages Count:', messages.value.length)
  console.log('Is Loading:', isLoading.value)
  console.log('Is Open:', isOpen.value)
}
```

## 📚 **API Documentation**

### **Ask Question**
```typescript
GET /ai/ask
Query Parameters:
- query: string (required) - User message
- sessionId: string (optional) - Session ID

Response:
{
  "sessionId": "session_1234567890_abc123",
  "value": "AI response message"
}
```

### **Clear History**
```typescript
POST /ai/clear-history
Query Parameters:
- sessionId: string (required) - Session ID

Response:
"Lịch sử hội thoại cho phiên 'session_id' đã được xóa."
```

## 🔮 **Future Enhancements**

### **Planned Features**
- [ ] **File Upload**: Hỗ trợ gửi ảnh, documents
- [ ] **Voice Chat**: Chat bằng giọng nói
- [ ] **Multi-language**: Hỗ trợ nhiều ngôn ngữ
- [ ] **Rich Messages**: Markdown, emojis, links
- [ ] **Chat Export**: Xuất lịch sử chat

### **Performance Improvements**
- [ ] **Message Caching**: Cache messages locally
- [ ] **Lazy Loading**: Load messages on demand
- [ ] **WebSocket**: Real-time communication
- [ ] **Offline Support**: Queue messages khi offline

## 📞 **Support & Contact**

### **Technical Support**
- **Backend**: AI Management Service (port 8088)
- **Frontend**: Frontend_NikkoHotel repository
- **Documentation**: README files

### **Development Team**
- **AI Integration**: Spring AI Management
- **Frontend**: Nuxt.js + Vue.js
- **Styling**: Tailwind CSS

---

**Version**: 1.0.0  
**Last Updated**: 2024-08-22  
**Status**: ✅ Production Ready

