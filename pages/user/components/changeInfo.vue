<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      class="card"
      :validation-schema="schema"
      @submit="refresh"
    >
      <h2 class="text-h6 xl:text-h5">Thông tin cơ bản</h2>

      <div class="space-y-6">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-8">
          <p>Đang tải dữ liệu...</p>
        </div>

        <!-- Thông tin cơ bản -->
        <template v-else-if="!isFormShow && customerData">
          <!-- Họ tên -->
          <CUserData title="Họ tên" :text="customerData.name.fullName" />

          <!-- Số điện thoại -->
          <CUserData title="Số điện thoại" :text="formData.phone" />

          <!-- Ngày sinh -->
          <CUserData title="Ngày sinh" :text="$dayjs(customerData.dateOfBirth).format('DD/MM/YYYY')" />

          <!-- Địa chỉ -->
          <CUserData title="Địa chỉ" :text="address" />

          <!-- Nút: Chỉnh sửa thông tin -->
          <UIButton text="Chỉnh sửa" variant="secondary" @click="toggleForm('show')" />
        </template>

        <!-- Biểu mẫu: Chỉnh sửa thông tin -->
        <template v-else-if="!loading">
          <!-- Họ tên -->
          <UIInput
            v-model="formData.name"
            name="name"
            label="Họ tên"
            placeholder="Vui lòng nhập họ tên"
            :error="errors.name"
            blackhead
            :disabled="pending"
          />

          <!-- Số điện thoại -->
          <UIInput
            v-model="formData.phone"
            name="phone"
            label="Số điện thoại"
            type="tel"
            placeholder="Vui lòng nhập số điện thoại"
            :error="errors.phone"
            blackhead
            :disabled="pending"
          />

          <!-- Ngày sinh -->
          <CBirthday
            v-model="formData.birthday"
            :error="errors.birthday"
            blackhead
            :disabled="pending"
          />

          <!-- Địa chỉ -->
          <CAddress
            v-model="formData.address"
            :detail-error="errors.detail"
            :zipcode-error="errors.zipcode"
            blackhead
            :disabled="pending"
          />

          <!-- Nút: Hủy chỉnh sửa / Lưu -->
          <div class="flex gap-2">
            <UIButton
              class="flex w-full xl:inline-flex xl:w-auto"
              type="button"
              text="Hủy chỉnh sửa"
              variant="secondary"
              :disabled="pending"
              @click="cancelEdit()"
            />

            <UIButton
              class="flex w-full xl:inline-flex xl:w-auto"
              type="submit"
              text="Lưu thay đổi"
              :disabled="pending"
              :loading="pending"
            />
          </div>
        </template>
      </div>
    </VForm>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

/* Toàn cục */
const { $Swal, $dayjs } = useNuxtApp()
const styleStore = useStyleStore()

/* State */
const loading = ref(true)
const customerData = ref(null)
const address = ref('')

/* Biểu mẫu */
const formData = reactive({
  name: '',
  phone: '',
  birthday: '',
  address: {
    zipcode: 0,
    detail: ''
  }
})
const formRefs = ref<HTMLFormElement | null>(null)

// Helper function để extract zipcode từ địa chỉ
const extractZipcodeFromAddress = (address: string): number => {
  if (!address) return 0
  
  if (address.includes('TP. Hồ Chí Minh') || address.includes('Hồ Chí Minh')) {
    return 70000 // Zipcode của TP.HCM
  }
  if (address.includes('Hà Nội')) {
    return 10000 // Zipcode của Hà Nội
  }
  if (address.includes('Đà Nẵng')) {
    return 50000 // Zipcode của Đà Nẵng
  }
  return 0
}

// Quy tắc biểu mẫu
const schema = {
  name: 'required|min:2',
  phone: (val: string) => {
    if (!val) return 'Số điện thoại là bắt buộc'
    if (!/^09\d{8}$/.test(val)) return 'Vui lòng nhập số điện thoại hợp lệ gồm 10 số'
    return {}
  },
  birthday: (val: string) => {
    return $dayjs(val, 'YYYY-M-D', true).isValid() ? {} : 'Ngày sinh là bắt buộc'
  },
  zipcode: (val: number) => {
    if (val === 0) return 'Tỉnh/Thành phố là bắt buộc'
    return {}
  },
  detail: 'required'
}

// Biểu mẫu: Hiện/ẩn
const isFormShow = ref(false)
const toggleForm = (event: string) => {
  if (event === 'show') {
    isFormShow.value = true
  } else if (event === 'close') {
    isFormShow.value = false
  }
}

const cancelEdit = () => {
  if (!customerData.value) return
  
  // Reset form về dữ liệu gốc
  formData.name = customerData.value.name.fullName
  formData.phone = formData.phone // Giữ nguyên phone vì BE chưa có
  formData.birthday = customerData.value.dateOfBirth
  formData.address.zipcode = extractZipcodeFromAddress(customerData.value.address.value) || 70000
  formData.address.detail = customerData.value.address.value
  toggleForm('close')
}

// Load dữ liệu từ BE khi component mount
onMounted(async () => {
  try {
    loading.value = true
    const res = await $fetch('http://localhost:8089/api/customers/find')
    
    console.log('BE Response:', res) // Debug log
    
    customerData.value = res
    
    // Fill dữ liệu vào form
    formData.name = res.name.fullName
    formData.phone = res.phone || '0912345678' // Fallback nếu BE chưa có phone
    formData.birthday = res.dateOfBirth
    formData.address.zipcode = extractZipcodeFromAddress(res.address.value) || 70000
    formData.address.detail = res.address.value
    
    // Set địa chỉ hiển thị
    address.value = res.address.value
    
    console.log('Customer data loaded:', customerData.value)
    console.log('Form data filled:', formData)
    
  } catch (err) {
    console.error('Không thể lấy dữ liệu customer:', err)
    $Swal?.fire({
      title: 'Lỗi',
      text: 'Không thể tải dữ liệu khách hàng',
      icon: 'error',
      confirmButtonText: 'Đóng'
    })
  } finally {
    loading.value = false
  }
})

/* api */
const { updateUserApi, getDistrictApi } = useApi()

// api: Chỉnh sửa thông tin
const { pending, refresh } = await updateUserApi({
  body: computed(() => ({
    userId: customerData.value?.id.value,
    ...formData
  })),
  watch: false,
  immediate: false,
  onResponse({ response }) {
    if (response.status === 200) {
      $Swal?.fire({
        title: 'Chỉnh sửa thông tin thành công',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor,
        willClose: () => {
          // Cập nhật lại customerData với dữ liệu mới
          const result = response._data.result
          customerData.value = {
            ...customerData.value,
            name: { fullName: result.name },
            dateOfBirth: result.birthday,
            address: { value: result.address.detail }
          }
          cancelEdit()
        }
      })
    }
  }
})
pending.value = false

// api: Lấy địa chỉ khu vực
watch(
  () => formData.address.zipcode,
  () => {
    // zipcode 0 không xử lý
    if (formData.address.zipcode === 0) return

    getDistrictApi({
      query: { zip_code: formData.address.zipcode },
      onResponse({ response }) {
        if (response.status === 200) {
          const { city, district } = response._data.data[0]
          address.value = `${city}${district}${formData.address.detail}`
        }
      }
    })
  },
  { immediate: true }
)
</script>