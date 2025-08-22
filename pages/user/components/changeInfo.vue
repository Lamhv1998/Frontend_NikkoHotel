<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      :validation-schema="schema"
      @submit="updateCustomerInfo"
    >
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            class="h-8 w-8 animate-spin text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.001 01-15.357-2m15.357 2H15"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
        <p class="text-gray-600">Đang tải dữ liệu...</p>
      </div>

      <!-- Thông tin cơ bản -->
      <template v-else-if="!isFormShow && customerData">
        <div class="space-y-8">
          <!-- User Avatar and Basic Info -->
          <div
            class="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-8"
          >
            <div
              class="flex flex-col space-y-6 lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0"
            >
              <!-- Avatar Section -->
              <div class="flex flex-col items-center lg:items-start">
                <div class="relative mb-4">
                  <div
                    class="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-4xl font-bold text-white shadow-lg"
                  >
                    <img 
                      v-if="customerData.imageUrl" 
                      :src="customerData.imageUrl" 
                      :alt="getFullName()"
                      class="h-full w-full rounded-full object-cover"
                    />
                    <span v-else>{{ getInitials() }}</span>
                  </div>
                  <button 
                    @click="showImageUpload = true"
                    class="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110"
                    title="Thay đổi ảnh đại diện"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Quick Actions -->
                <div class="flex flex-col space-y-2">
                  <button 
                    @click="showImageUpload = true"
                    class="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Thay đổi ảnh</span>
                  </button>
                </div>
              </div>

              <!-- User Info Section -->
              <div class="flex-1 space-y-6">
                <!-- Basic Info Header -->
                <div class="border-b border-amber-200 pb-4">
                  <h3 class="mb-2 text-3xl font-bold text-gray-900">Họ tên: {{ getFullName() }}</h3>
                </div>

                <!-- Customer Profile Info Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Ngày sinh -->
                  <div class="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Ngày sinh</p>
                      <p class="text-base font-semibold text-gray-900">
                        {{ customerData.dateOfBirth ? $dayjs(customerData.dateOfBirth).format('DD/MM/YYYY') : 'Chưa cập nhật' }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Giới tính -->
                  <div class="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Giới tính</p>
                      <p class="text-base font-semibold text-gray-900">
                        {{ getSexText(customerData.sex) }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Địa chỉ -->
                  <div class="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100 md:col-span-2">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Địa chỉ</p>
                                             <p class="text-base font-semibold text-gray-900">
                         {{ formatAddress(customerData.address) || 'Chưa cập nhật' }}
                       </p>
                    </div>
                  </div>
                  
                  <!-- Hạng thành viên -->
                  <div class="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Hạng thành viên</p>
                      <p class="text-base font-semibold text-gray-900">{{ getLevelText(customerData.level) }}</p>
                    </div>
                  </div>
                  
                  <!-- Customer ID -->
                  <!-- <div class="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 12a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M13 12a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Customer ID</p>
                      <p class="text-base font-semibold text-gray-900 font-mono">
                        {{ customerData.customerId?.slice(0, 8) }}...
                      </p>
                    </div>
                  </div> -->

                  <!-- Số điện thoại (Chỉ đọc) -->
                  <div class="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 shadow-sm border border-gray-200">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Số điện thoại</p>
                      <p class="text-base font-semibold text-gray-900">
                        {{ user.phone || 'Chưa cập nhật' }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">Không thể thay đổi</p>
                    </div>
                  </div>

                  <!-- Email (Chỉ đọc) -->
                  <div class="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 shadow-sm border border-gray-200">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 flex-shrink-0">
                      <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-500 mb-1">Email</p>
                      <p class="text-base font-semibold text-gray-900 break-all">
                        {{ user.email || 'Chưa cập nhật' }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">Không thể thay đổi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Edit Button -->
          <div class="flex justify-center">
            <UIButton 
              class="rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 px-8 py-4 text-lg font-semibold text-white hover:from-amber-600 hover:to-yellow-700 shadow-lg hover:shadow-xl transition-all duration-200"
              text="Chỉnh sửa thông tin" 
              variant="secondary" 
              @click="toggleForm('show')"
            />
          </div>
        </div>
      </template>

      <!-- Biểu mẫu: Chỉnh sửa thông tin -->
      <template v-else-if="!loading">
        <div class="space-y-8">
          <!-- Form Header -->
          <div class="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
            <h3 class="mb-2 flex items-center text-xl font-semibold text-gray-900">
              <svg class="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Chỉnh sửa thông tin cá nhân
            </h3>
            <p class="text-gray-600">Cập nhật thông tin cá nhân của bạn (Số điện thoại và Email không thể thay đổi)</p>
          </div>
            
          <!-- Form Fields -->
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-2 md:col-span-2">
              <UIInput
                v-model="user.phone"
                name="phone"
                label="Số điện thoại *"
                placeholder="Vui nhập số điện thoại"
                :error="errors.phone"
                blackhead
                :disabled="pending"
                class="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <!-- Họ -->
            <div class="space-y-2">
              <UIInput
                v-model="formData.firstName"
                name="firstName"
                label="Họ *"
                placeholder="Vui lòng nhập họ"
                :error="errors.firstName"
                blackhead
                :disabled="pending"
                class="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <!-- Tên -->
            <div class="space-y-2">
              <UIInput
                v-model="formData.lastName"
                name="lastName"
                label="Tên *"
                placeholder="Vui lòng nhập tên"
                :error="errors.lastName"
                blackhead
                :disabled="pending"
                class="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <!-- Ngày sinh -->
            <div class="space-y-2">
              <CBirthday
                v-model="formData.dateOfBirth"
                name="dateOfBirth"
                :error="errors.dateOfBirth"
                blackhead
                :disabled="pending"
                class="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <VErrorMessage name="dateOfBirth" class="text-sm text-red-600" />
            </div>

            <!-- Giới tính -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Giới tính *</label>
              <VField
                v-model="formData.sex"
                name="sex"
                as="select"
                :disabled="pending"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                <option value="">Chọn giới tính</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </VField>
              <VErrorMessage name="sex" class="text-sm text-red-600" />
            </div>

                         <!-- Địa chỉ -->
             <div class="md:col-span-2 space-y-2">
               <CAddress
                 v-model="formData.address"
                 :detail-error="errors['address.detail']"
                 blackhead
                 :disabled="pending"
                 class="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
               />
             </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <UIButton
              type="button"
              text="Hủy chỉnh sửa"
              variant="secondary"
              :disabled="pending"
              @click="cancelEdit()"
              class="flex-1 sm:flex-none rounded-2xl bg-gray-500 px-8 py-3 text-white hover:bg-gray-600 transition-colors"
            />

            <UIButton
              type="submit"
              text="Lưu thay đổi"
              :disabled="pending"
              :loading="pending"
              @click="updateCustomerInfo()"
              class="flex-1 sm:flex-none rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-3 text-white hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            />
          </div>
        </div>
      </template>
    </VForm>

    <!-- Image Upload Modal -->
    <UIModal v-model="showImageUpload">
      <div class="p-6 max-w-md mx-auto">
        <h3 class="mb-6 text-xl font-semibold text-gray-900 text-center">Thay đổi ảnh đại diện</h3>
        
        <div class="mb-6">
          <!-- Image Preview -->
          <div class="mb-6 text-center">
            <div v-if="previewImage" class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-blue-200">
              <img :src="previewImage" alt="Preview" class="h-full w-full object-cover" />
            </div>
            <div v-else class="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-gray-100 border-4 border-gray-200">
              <svg class="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          
          <!-- File Input -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleImageSelect"
            class="hidden"
          />
          
          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button
              @click="() => fileInput?.click()"
              class="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              <svg class="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Chọn ảnh
            </button>
            <button
              v-if="previewImage"
              @click="previewImage = null"
              class="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Xóa
            </button>
          </div>

          <!-- File Info -->
          <div v-if="selectedFile" class="text-center p-3 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800 font-medium">{{ selectedFile.name }}</p>
            <p class="text-xs text-blue-600">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
        </div>
        
        <!-- Modal Actions -->
        <div class="flex gap-3">
          <button
            @click="showImageUpload = false"
            class="flex-1 rounded-lg bg-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-400 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            @click="uploadImage()"
            :disabled="!previewImage || imageUploading"
            class="flex-1 rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="imageUploading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tải...
            </span>
            <span v-else>Cập nhật ảnh</span>
          </button>
        </div>
      </div>
    </UIModal>
  </section>
</template>

<script lang="ts" setup>
import type { UserResponse, UserUpdatedRequest } from '@/types/auth'

/* Props */
interface Props {
  user: any
  customerProfile?: any
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
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: {
    city: '',
    district: '',
    detail: ''
  },
  sex: ''
})


const schema = {
  firstName: 'required',
  lastName: 'required',
  dateOfBirth: 'required',
  sex: 'required'
}

// Loading state
const loading = ref(false)
const pending = ref(false)
const isFormShow = ref(false)

// Image upload state
const showImageUpload = ref(false)
const previewImage = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const imageUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

/* Dữ liệu khách hàng */
const customerData = computed(() => props.customerProfile || props.user)

/* API */
const { updateCustomerApi, updateUserApi } = useApi()

// Function để cập nhật thông tin
const updateCustomerInfo = async () => {
  try {
    pending.value = true
    
         // Đảm bảo dateOfBirth có format "yyyy-MM-dd" trước khi gửi
     let formattedDateOfBirth = formData.value.dateOfBirth
     if (formData.value.dateOfBirth) {
       // Kiểm tra nếu đã đúng format "yyyy-MM-dd"
       if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.value.dateOfBirth)) {
         // Chuyển đổi sang format "yyyy-MM-dd"
         formattedDateOfBirth = $dayjs(formData.value.dateOfBirth).format('YYYY-MM-DD')
       }
     }
    
    console.log('Sending dateOfBirth with format:', formattedDateOfBirth)
    
    // Gọi API update customer
    const customerResponse = await updateCustomerApi({
      body: {
        customerId: customerData.value?.customerId,
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        address: formData.value.address,
        dateOfBirth: formattedDateOfBirth,
        sex: formData.value.sex
      }
    });
    
    // Gọi API update user (để cập nhật phone và các thông tin khác nếu cần)
    const userUpdateRequest: UserUpdatedRequest = {
      userId: props.user?.userId || props.user?.id,
      phone: props.user?.phone,
    }
    
    const userResponse = await updateUserApi({
      body: userUpdateRequest
    });
    
    console.log('Customer update response:', customerResponse)
    console.log('User update response:', userResponse)
    
    if (customerResponse && userResponse) {
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
  } catch (error: any) {
    console.error('Error updating customer info:', error)
    
    // Hiển thị thông báo lỗi
    const commonStore = useCommonStore()
    const styleStore = useStyleStore()
    
    let errorMessage = 'Có lỗi xảy ra khi cập nhật thông tin'
    
    if (error?.data?.message) {
      errorMessage = error.data.message
    } else if (error?.message) {
      errorMessage = error.message
    } else if (error?.status === 400) {
      errorMessage = 'Dữ liệu không hợp lệ'
    } else if (error?.status === 401) {
      errorMessage = 'Phiên đăng nhập đã hết hạn'
    } else if (error?.status === 500) {
      errorMessage = 'Lỗi máy chủ'
    }
    
    commonStore.sweetalertList.push({
      title: 'Cập nhật thất bại',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    pending.value = false
  }
}

/* Methods */
const toggleForm = (action: 'show' | 'hide') => {
  isFormShow.value = action === 'show'
  
  if (action === 'show' && customerData.value) {
    // Điền dữ liệu vào form
    formData.value.firstName = customerData.value.firstName || ''
    formData.value.lastName = customerData.value.lastName || ''
    
    // Đảm bảo dateOfBirth có format "yyyy-MM-dd"
    if (customerData.value.dateOfBirth) {
      // Nếu dateOfBirth đã có format "yyyy-MM-dd" thì giữ nguyên
      if (/^\d{4}-\d{2}-\d{2}$/.test(customerData.value.dateOfBirth)) {
        formData.value.dateOfBirth = customerData.value.dateOfBirth
      } else {
        // Nếu là format khác, chuyển đổi sang "yyyy-MM-dd"
        formData.value.dateOfBirth = $dayjs(customerData.value.dateOfBirth).format('YYYY-MM-DD')
      }
    } else {
      formData.value.dateOfBirth = ''
    }
    
    formData.value.address = customerData.value.address || { city: '', district: '', detail: '' }
    formData.value.sex = customerData.value.sex || ''
    
    console.log('Form data populated:', formData.value)
    
    // Đảm bảo form được validate sau khi dữ liệu được load
    nextTick(() => {
      if (formRefs.value) {
        formRefs.value.validate()
      }
    })
  }
}

const cancelEdit = () => {
  isFormShow.value = false
  // Reset form
  formRefs.value?.resetForm()
}

const getInitials = () => {
  if (!customerData.value) return 'U'
  const firstName = customerData.value.firstName || ''
  const lastName = customerData.value.lastName || ''
  if (!firstName && !lastName) return 'U'
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
}

const getFullName = () => {
  if (!customerData.value) return 'Khách hàng'
  const firstName = customerData.value.firstName || ''
  const lastName = customerData.value.lastName || ''
  if (!firstName && !lastName) return 'Khách hàng'
  return `${firstName} ${lastName}`.trim()
}

const getLevelText = (level: string) => {
  switch (level?.toUpperCase()) {
    case 'SILVER':
      return 'Bạc'
    case 'GOLD':
      return 'Vàng'
    case 'PLATINUM':
      return 'Bạch kim'
    case 'DIAMOND':
      return 'Kim cương'
    case 'BRONZE':
      return 'Đồng'
    default:
      return 'Thành viên'
  }
}

const getSexText = (sex: string) => {
  switch (sex?.toUpperCase()) {
    case 'MALE':
      return 'Nam'
    case 'FEMALE':
      return 'Nữ'
    case 'OTHER':
      return 'Khác'
    default:
      return 'Chưa cập nhật'
  }
}

const formatAddress = (address: any) => {
  if (!address) return ''
  
  // Nếu address là string (từ API cũ)
  if (typeof address === 'string') {
    return address
  }
  
  // Nếu address là object (từ API mới)
  if (address.city || address.district || address.detail) {
    const parts = []
    if (address.city) parts.push(address.city)
    if (address.district) parts.push(address.district)
    if (address.detail) parts.push(address.detail)
    return parts.join(', ')
  }
  
  return ''
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Image handling methods
const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      const commonStore = useCommonStore()
      const styleStore = useStyleStore()
      
      commonStore.sweetalertList.push({
        title: 'File quá lớn',
        text: 'Kích thước file không được vượt quá 5MB',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      const commonStore = useCommonStore()
      const styleStore = useStyleStore()
      
      commonStore.sweetalertList.push({
        title: 'File không hợp lệ',
        text: 'Vui lòng chọn file ảnh',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      return
    }
    
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const uploadImage = async () => {
  if (!selectedFile.value || !customerData.value?.customerId) {
    console.error('Missing file or customer ID for upload')
    return
  }
  
  try {
    imageUploading.value = true
    
    console.log('Uploading image for customer:', customerData.value.customerId)
    console.log('Selected file:', selectedFile.value)
    
    // Sử dụng API mới
    const { updateCustomerAvatarApi } = useApi()
    const response = await updateCustomerAvatarApi({
      body: {
        customerId: customerData.value.customerId,
        imageFile: selectedFile.value
      }
    })
    
    console.log('Upload response:', response)
    
    if (response) {
      // Hiển thị thông báo thành công
      const commonStore = useCommonStore()
      const styleStore = useStyleStore()
      
      commonStore.sweetalertList.push({
        title: 'Cập nhật ảnh thành công',
        text: 'Ảnh đại diện đã được cập nhật',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      
      // Đóng modal và refresh dữ liệu
      showImageUpload.value = false
      previewImage.value = null
      selectedFile.value = null
      emit('getUserRefresh')
    }
  } catch (error: any) {
    console.error('Error uploading image:', error)
    
    // Hiển thị thông báo lỗi
    const commonStore = useCommonStore()
    const styleStore = useStyleStore()
    
    commonStore.sweetalertList.push({
      title: 'Cập nhật ảnh thất bại',
      text: error?.data?.message || error?.message || 'Có lỗi xảy ra khi cập nhật ảnh đại diện',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    imageUploading.value = false
  }
}
</script>