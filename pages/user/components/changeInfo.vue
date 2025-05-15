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
        <!-- Thông tin cơ bản -->
        <template v-if="!isFormShow">
          <!-- Họ tên -->
          <CUserData title="Họ tên" :text="props.user.name" />

          <!-- Số điện thoại -->
          <CUserData title="Số điện thoại" :text="props.user.phone" />

          <!-- Ngày sinh -->
          <CUserData title="Ngày sinh" :text="$dayjs(props.user.birthday).format('DD/MM/YYYY')" />

          <!-- Địa chỉ -->
          <CUserData title="Địa chỉ" :text="address" />

          <!-- Nút: Chỉnh sửa thông tin -->
          <UIButton text="Chỉnh sửa" variant="secondary" @click="toggleForm('show')" />
        </template>

        <!-- Biểu mẫu: Chỉnh sửa thông tin -->
        <template v-else>
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
import type { UserResponse } from '@/types'

/* props */
const props = defineProps({
  user: {
    type: Object as PropType<UserResponse>,
    required: true
  }
})

/* emit */
const emit = defineEmits(['getUserRefresh'])

/* Toàn cục */
const { $Swal, $dayjs } = useNuxtApp()
const authStore = useAuthStore()
const styleStore = useStyleStore()

/* Địa chỉ */
const address = ref('')

/* Biểu mẫu */
const formData = reactive({
  name: props.user.name,
  phone: props.user.phone,
  birthday: props.user.birthday,
  address: {
    zipcode: props.user.address.zipcode,
    detail: props.user.address.detail
  }
})
const formRefs = ref<HTMLFormElement | null>(null)

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

const cancelEdit = (data = props.user) => {
  formData.name = data.name
  formData.phone = data.phone
  formData.birthday = data.birthday
  formData.address.zipcode = data.address.zipcode
  formData.address.detail = data.address.detail
  toggleForm('close')
}

/* api */
const { updateUserApi, getDistrictApi } = useApi()

// api: Chỉnh sửa thông tin
const { pending, refresh } = await updateUserApi({
  body: computed(() => ({
    userId: props.user._id,
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
          emit('getUserRefresh')
          authStore.userName = response._data.result.name
          cancelEdit(response._data.result)
        }
      })
    }
  }
})
pending.value = false

// api: Lấy địa chỉ khu vực
watch(
  () => props.user.address,
  () => {
    // zipcode 0 không xử lý
    if (props.user.address.zipcode === 0) return

    getDistrictApi({
      query: { zip_code: props.user.address.zipcode },
      onResponse({ response }) {
        if (response.status === 200) {
          const { city, district } = response._data.data[0]
          address.value = `${city}${district}${props.user.address.detail}`
        }
      }
    })
  },
  { immediate: true }
)
</script>
