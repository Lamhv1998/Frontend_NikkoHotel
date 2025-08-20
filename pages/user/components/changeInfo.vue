<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      :validation-schema="schema"
      @submit="refresh"
    >
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        <p class="text-gray-600">Đang tải dữ liệu...</p>
      </div>

      <!-- Thông tin cơ bản -->
      <template v-else-if="!isFormShow && customerData">
        <div class="space-y-6">
          <!-- User Avatar and Basic Info -->
          <div class="flex items-center space-x-6 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
            <div class="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {{ (customerData.firstName + ' ' + customerData.lastName).charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ customerData.firstName + ' ' + customerData.lastName }}</h3>
              <p class="text-gray-600">Thành viên từ {{ $dayjs(customerData.createdDate).format('MM/YYYY') }}</p>
            </div>
          </div>

          <!-- Info Cards -->
          <div class="grid gap-6 md:grid-cols-2">
            <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Họ và tên</p>
                  <p class="font-semibold text-gray-900">{{ customerData.firstName + ' ' + customerData.lastName }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Ngày sinh</p>
                  <p class="font-semibold text-gray-900">{{ $dayjs(customerData.dateOfBirth).format('DD/MM/YYYY') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Card -->
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div class="flex items-start mb-4">
              <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3 mt-1">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 mb-1">Địa chỉ</p>
                <p class="font-semibold text-gray-900">{{ address }}</p>
              </div>
            </div>
          </div>

          <!-- Edit Button -->
          <div class="flex justify-center">
            <UIButton 
              text="Chỉnh sửa thông tin" 
              variant="secondary" 
              @click="toggleForm('show')"
              class="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-8 py-3 rounded-2xl"
            />
          </div>
        </div>
      </template>

      <!-- Biểu mẫu: Chỉnh sửa thông tin -->
      <template v-else-if="!loading">
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Chỉnh sửa thông tin cá nhân
            </h3>
            <p class="text-gray-600">Cập nhật thông tin cá nhân của bạn</p>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <!-- Họ tên -->
            <div class="md:col-span-2">
              <UIInput
                v-model="formData.name"
                name="name"
                label="Họ tên"
                placeholder="Vui lòng nhập họ tên"
                :error="errors.name"
                blackhead
                :disabled="pending"
                class="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <!-- Số điện thoại -->
            <div>
              <UIInput
                v-model="formData.phone"
                name="phone"
                label="Số điện thoại"
                type="tel"
                placeholder="Vui lòng nhập số điện thoại"
                :error="errors.phone"
                blackhead
                :disabled="pending"
                class="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <!-- Ngày sinh -->
            <div>
              <CBirthday
                v-model="formData.birthday"
                :error="errors.birthday"
                blackhead
                :disabled="pending"
                class="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <!-- Địa chỉ -->
            <div class="md:col-span-2">
              <CAddress
                v-model="formData.address"
                :detail-error="errors.detail"
                :zipcode-error="errors.zipcode"
                blackhead
                :disabled="pending"
                class="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-6">
            <UIButton
              type="button"
              text="Hủy chỉnh sửa"
              variant="secondary"
              :disabled="pending"
              @click="cancelEdit()"
              class="flex-1 md:flex-none bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-2xl"
            />

            <UIButton
              type="submit"
              text="Lưu thay đổi"
              :disabled="pending"
              :loading="pending"
              class="flex-1 md:flex-none bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 px-8 py-3 rounded-2xl"
            />
          </div>
        </div>
      </template>
    </VForm>
  </section>
</template>

<script lang="ts" setup>
import type { CustomerResponse } from '@/types/customer'

/* Props */
interface Props {
  user: CustomerResponse
}

const props = defineProps<Props>()

/* Emits */
const emit = defineEmits<{
  getUserRefresh: []
}>()

/* Thuộc tính toàn cục */
const { $dayjs } = useNuxtApp()

/* Form đăng nhập */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = ref({
  name: '',
  phone: '',
  birthday: '',
  address: {
    detail: '',
    zipcode: 0
  }
})

// Quy tắc form
const schema = {
  name: 'required',
  phone: 'required|phone',
  birthday: 'required',
  address: {
    detail: 'required',
    zipcode: 'required|numeric'
  }
}

// Loading state
const loading = ref(false)
const pending = ref(false)
const isFormShow = ref(false)

/* Dữ liệu khách hàng */
const customerData = computed(() => props.user)

/* Địa chỉ */
const address = computed(() => {
  if (!customerData.value?.address) return 'Chưa cập nhật'
  return customerData.value.address
})

/* API */
const { updateCurrentCustomerApi } = useApi()

// api: Cập nhật thông tin customer
const { refresh } = await updateCurrentCustomerApi({
  body: formData,
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response.status === 200) {
      // Hiển thị thông báo thành công
      const commonStore = useCommonStore()
      const styleStore = useStyleStore()
      
      commonStore.sweetalertList.push({
        title: 'Cập nhật thành công',
        text: 'Thông tin cá nhân đã được cập nhật',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      
      // Ẩn form và refresh dữ liệu
      isFormShow.value = false
      emit('getUserRefresh')
    }
  },
  onResponseError({ response }) {
    // Hiển thị thông báo lỗi
    const commonStore = useCommonStore()
    const styleStore = useStyleStore()
    
    commonStore.sweetalertList.push({
      title: 'Cập nhật thất bại',
      text: response._data?.message || 'Có lỗi xảy ra khi cập nhật thông tin',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  }
})

/* Methods */
const toggleForm = (action: 'show' | 'hide') => {
  isFormShow.value = action === 'show'
  
  if (action === 'show' && customerData.value) {
    // Điền dữ liệu vào form
    formData.value.name = customerData.value.firstName + ' ' + customerData.value.lastName
    formData.value.phone = ''
    formData.value.birthday = customerData.value.dateOfBirth
    formData.value.address = {
      detail: customerData.value.address,
      zipcode: 0
    }
  }
}

const cancelEdit = () => {
  isFormShow.value = false
  // Reset form
  formRefs.value?.resetForm()
}
</script>