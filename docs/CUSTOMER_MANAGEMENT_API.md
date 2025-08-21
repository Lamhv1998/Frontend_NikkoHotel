# Customer Management API - Hướng dẫn sử dụng

## Tổng quan
API này cung cấp các chức năng quản lý thông tin khách hàng trong hệ thống khách sạn Nikko.

## Các endpoint chính

### 1. Cập nhật thông tin khách hàng
- **URL**: `PUT /customers/profile`
- **Body**: 
```json
{
  "customerId": "uuid-string",
  "firstName": "Tên",
  "lastName": "Họ", 
  "address": "Địa chỉ",
  "dateOfBirth": "YYYY-MM-DD",
  "sex": "MALE|FEMALE|OTHER"
}
```

### 2. Cập nhật ảnh đại diện
- **URL**: `PUT /customers/profile/{customerId}/avatar`
- **Content-Type**: `multipart/form-data`
- **Body**: `imageRaw` (file ảnh)

### 3. Lấy thông tin khách hàng
- **URL**: `GET /customers/profile/{userId}`
- **Response**: Thông tin profile khách hàng

### 4. Lấy thông tin theo Customer ID
- **URL**: `GET /customers/profile/customer/{customerId}`
- **Response**: Thông tin profile khách hàng

## Sử dụng trong Frontend

### Composable: useCustomerManagement

```typescript
import { useCustomerManagement } from '@/composables/useCustomerManagement'

const { 
  updateCustomerInfo, 
  updateCustomerAvatar, 
  getCustomerProfile 
} = useCustomerManagement()

// Cập nhật thông tin
const updateInfo = async () => {
  try {
    const response = await updateCustomerInfo({
      customerId: 'uuid',
      firstName: 'Tên mới',
      lastName: 'Họ mới',
      address: 'Địa chỉ mới',
      dateOfBirth: '1990-01-01',
      sex: 'MALE'
    })
    console.log('Cập nhật thành công:', response)
  } catch (error) {
    console.error('Lỗi cập nhật:', error)
  }
}

// Cập nhật ảnh đại diện
const updateAvatar = async (customerId: string, imageFile: File) => {
  try {
    const response = await updateCustomerAvatar(customerId, imageFile)
    console.log('Cập nhật ảnh thành công:', response)
  } catch (error) {
    console.error('Lỗi cập nhật ảnh:', error)
  }
}
```

### Component: changeInfo.vue

Component này đã được tích hợp sẵn với API và có các chức năng:
- Hiển thị thông tin khách hàng
- Chỉnh sửa thông tin cá nhân
- Cập nhật ảnh đại diện
- Validation form
- Xử lý lỗi và thông báo

## Cấu trúc dữ liệu

### CustomerDto
```typescript
type CustomerDto = {
  customerId: string
  userId: string
  firstName: string
  lastName: string
  address: string
  dateOfBirth: string
  accumulatedSpending?: number
  level: string
  imageUrl?: string
  createdDate: string
  updatedDate: string
  sex: string
  active: boolean
  behaviorData?: string
}
```

### UpdateCustomerCommand
```typescript
type UpdateCustomerCommand = {
  customerId: string
  firstName?: string
  lastName?: string
  address?: string
  dateOfBirth?: string
  sex?: string
}
```

## Xử lý lỗi

API trả về cấu trúc response chuẩn:
```typescript
type ApiResponse<T> = {
  code: number
  message?: string
  result: T
}
```

- `code = 0`: Thành công
- `code != 0`: Có lỗi xảy ra
- `message`: Mô tả lỗi (nếu có)

## Lưu ý quan trọng

1. **Customer ID**: Phải là UUID hợp lệ
2. **Ảnh đại diện**: 
   - Chỉ chấp nhận file ảnh
   - Kích thước tối đa: 5MB
   - Format: JPG, PNG, GIF
3. **Ngày sinh**: Format YYYY-MM-DD
4. **Giới tính**: Chỉ chấp nhận MALE, FEMALE, OTHER
5. **Số điện thoại và Email**: Không thể thay đổi qua API này

## Ví dụ hoàn chỉnh

```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.firstName" placeholder="Tên" />
      <input v-model="form.lastName" placeholder="Họ" />
      <input v-model="form.address" placeholder="Địa chỉ" />
      <input type="date" v-model="form.dateOfBirth" />
      <select v-model="form.sex">
        <option value="MALE">Nam</option>
        <option value="FEMALE">Nữ</option>
        <option value="OTHER">Khác</option>
      </select>
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script setup>
import { useCustomerManagement } from '@/composables/useCustomerManagement'

const { updateCustomerInfo } = useCustomerManagement()

const form = ref({
  customerId: 'uuid-here',
  firstName: '',
  lastName: '',
  address: '',
  dateOfBirth: '',
  sex: ''
})

const handleSubmit = async () => {
  try {
    const response = await updateCustomerInfo(form.value)
    console.log('Thành công:', response)
  } catch (error) {
    console.error('Lỗi:', error)
  }
}
</script>
```
