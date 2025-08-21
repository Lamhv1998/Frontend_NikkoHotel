# Hướng Dẫn Sử Dụng Chức Năng Authentication UI

## Tổng Quan

Chức năng này cho phép ẩn/hiện login button và avatar box dựa trên trạng thái đăng nhập của user. Khi user đã đăng nhập, login button sẽ bị ẩn và thay thế bằng avatar box. Khi user đăng xuất, avatar box sẽ bị ẩn và hiển thị lại login button.

## Các Component Chính

### 1. UserMenu.vue
Component hiển thị avatar và dropdown menu của user khi đã đăng nhập.

**Tính năng:**
- Hiển thị avatar (hình ảnh hoặc initials)
- Dropdown menu với các tùy chọn:
  - Tài khoản của tôi
  - Đơn đặt phòng
  - Voucher của tôi
  - Hội viên
  - Đăng xuất
- Animation mượt mà khi mở/đóng dropdown
- Tự động đóng khi click bên ngoài hoặc chuyển trang

### 2. useAuthState.ts
Composable quản lý trạng thái authentication một cách tập trung.

**Các computed properties:**
- `isAuthenticated`: Kiểm tra user đã đăng nhập chưa
- `user`: Thông tin user từ store
- `customerProfile`: Thông tin profile của customer
- `userName`: Tên user
- `userEmail`: Email user

**Các methods:**
- `getFullName()`: Lấy tên đầy đủ của user
- `getInitials()`: Lấy chữ cái đầu của tên để hiển thị avatar
- `getUserAvatar()`: Lấy URL avatar của user
- `logout()`: Đăng xuất user

## Cách Sử Dụng

### 1. Trong Header
```vue
<template>
  <!-- User Menu -->
  <ClientOnly>
    <Transition name="dropdown" mode="out-in">
      <UserMenu v-if="authStore.isAuthenticated" />
      <NuxtLink 
        v-else 
        to="/auth/login"
        class="login-button"
      >
        Đăng nhập
      </NuxtLink>
    </Transition>
  </ClientOnly>
</template>
```

### 2. Trong Component Khác
```vue
<template>
  <div>
    <!-- Hiển thị nội dung khác nhau dựa trên trạng thái đăng nhập -->
    <div v-if="isAuthenticated">
      <p>Xin chào, {{ getFullName() }}!</p>
      <UserMenu />
    </div>
    <div v-else>
      <p>Vui lòng đăng nhập để tiếp tục</p>
      <NuxtLink to="/auth/login">Đăng nhập</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { isAuthenticated, getFullName } = useAuthState()
</script>
```

## Logic Hoạt Động

### 1. Khi User Đăng Nhập
1. Store được cập nhật với thông tin user và token
2. `isAuthenticated` trở thành `true`
3. Login button bị ẩn
4. UserMenu component được hiển thị

### 2. Khi User Đăng Xuất
1. Store được clear (xóa user, token, profile)
2. `isAuthenticated` trở thành `false`
3. UserMenu component bị ẩn
4. Login button được hiển thị lại

### 3. Persistence
- Thông tin authentication được lưu trong localStorage
- Khi refresh trang, store sẽ tự động hydrate từ localStorage
- Trạng thái đăng nhập được duy trì giữa các lần refresh

## Demo và Testing

### Trang Demo
Truy cập `/demo-auth` để test chức năng:
- Simulate Login: Tạo user demo để test
- Simulate Logout: Đăng xuất user demo
- Clear Auth: Xóa toàn bộ thông tin authentication
- Check LocalStorage: Kiểm tra dữ liệu trong localStorage

### Cách Test
1. Mở trang `/demo-auth`
2. Click "Simulate Login" để tạo user demo
3. Quan sát UI thay đổi từ login button sang avatar box
4. Click "Simulate Logout" để đăng xuất
5. Quan sát UI thay đổi từ avatar box sang login button

## Tùy Chỉnh

### 1. Thay Đổi Avatar Style
Chỉnh sửa CSS trong `UserMenu.vue`:
```scss
.avatar {
  // Tùy chỉnh style cho avatar
}
```

### 2. Thêm Menu Items
Thêm vào phần menu trong `UserMenu.vue`:
```vue
<NuxtLink 
  to="/new-page" 
  @click="closeDropdown"
  class="menu-item"
>
  <Icon name="ic:outline-new" class="text-icon-sm" />
  Trang mới
</NuxtLink>
```

### 3. Tùy Chỉnh Animation
Chỉnh sửa CSS transition trong `UserMenu.vue`:
```scss
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-in-out; // Thay đổi thời gian
}
```

## Troubleshooting

### 1. Avatar Không Hiển Thị
- Kiểm tra `customerProfile.imageUrl` có giá trị không
- Kiểm tra console có lỗi gì không
- Đảm bảo component đã được import đúng cách

### 2. Dropdown Không Hoạt Động
- Kiểm tra `isDropdownOpen` state
- Kiểm tra CSS z-index có bị che không
- Đảm bảo event listener được đăng ký đúng

### 3. Authentication State Không Đúng
- Kiểm tra localStorage có dữ liệu không
- Kiểm tra store có được hydrate đúng không
- Sử dụng `checkLocalStorage()` để debug

## Kết Luận

Chức năng này cung cấp một cách tiếp cận clean và maintainable để quản lý UI dựa trên trạng thái authentication. Với việc sử dụng composable pattern và reactive state, code dễ dàng mở rộng và bảo trì.
