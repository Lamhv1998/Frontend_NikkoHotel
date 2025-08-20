<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      class="card"
      :validation-schema="schema"
      @submit="refresh"
    >
      <h2 class="text-h6 xl:text-h5">Đổi mật khẩu</h2>

      <div class="space-y-6">
        <!-- Email -->
        <CUserData title="Email" :text="props.user.firstName + ' ' + props.user.lastName" />

        <!-- Mật khẩu -->
        <div v-if="!isFormShow" class="flex items-center justify-between">
          <div class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">Mật khẩu</label>
            <div class="space-x-2 py-2">
              <span
                v-for="(_, index) in 10"
                :key="index"
                class="inline-block h-2 w-2 rounded-full bg-black"
              />
            </div>
          </div>

          <!-- Nút: Đổi mật khẩu -->
          <UIButton text="Đổi mật khẩu" variant="text" @click="toggleForm('show')" />
        </div>

        <!-- Biểu mẫu: Đổi mật khẩu -->
        <template v-else>
          <!-- Mật khẩu cũ -->
          <UIInput
            v-model="formData.oldPassword"
            name="oldPassword"
            label="Mật khẩu cũ"
            type="password"
            placeholder="Vui lòng nhập mật khẩu cũ"
            :error="errors.oldPassword"
            blackhead
            :disabled="pending"
          />

          <!-- Mật khẩu mới -->
          <UIInput
            v-model="formData.newPassword"
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            placeholder="Vui lòng nhập mật khẩu mới"
            :error="errors.newPassword"
            blackhead
            :disabled="pending"
          />

          <!-- Xác nhận mật khẩu -->
          <UIInput
            v-model="formData.confirmPassword"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="Vui lòng nhập lại mật khẩu mới"
            :error="errors.confirmPassword"
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
              @click="cancelEdit"
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
import type { CustomerResponse } from '@/types/customer'

/* props */
const props = defineProps({
  user: {
    type: Object as PropType<CustomerResponse>,
    required: true
  }
})

/* Toàn cục */
const { $Swal, $validator } = useNuxtApp()
const styleStore = useStyleStore()

/* Biểu mẫu */
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const formRefs = ref<HTMLFormElement | null>(null)

// Quy tắc biểu mẫu
const schema = {
  oldPassword: (val: string) => {
    if (!val) return 'Mật khẩu cũ là bắt buộc'
    if (!$validator.isLength(val, { min: 8 })) return 'Mật khẩu cũ phải có ít nhất 8 ký tự'
    if ($validator.isAlpha(val)) return 'Mật khẩu cũ không được chỉ có chữ cái'
    if ($validator.isNumeric(val)) return 'Mật khẩu cũ không được chỉ có số'
    if (!$validator.isAlphanumeric(val))
      return 'Mật khẩu cũ phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
    return {}
  },
  newPassword: (val: string) => {
    if (!val) return 'Mật khẩu mới là bắt buộc'
    if (!$validator.isLength(val, { min: 8 })) return 'Mật khẩu mới phải có ít nhất 8 ký tự'
    if ($validator.isAlpha(val)) return 'Mật khẩu mới không được chỉ có chữ cái'
    if ($validator.isNumeric(val)) return 'Mật khẩu mới không được chỉ có số'
    if (!$validator.isAlphanumeric(val))
      return 'Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
    return {}
  },
  confirmPassword: 'required|confirmed:@newPassword'
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
  formData.oldPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''

  toggleForm('close')
}

/* api */
const { updateCurrentCustomerApi } = useApi()

// api: Đổi mật khẩu customer
const { pending, refresh } = await updateCurrentCustomerApi({
  body: computed(() => ({
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword
  })),
  watch: false,
  immediate: false,
  onResponse({ response }) {
    if (response.status === 200) {
      $Swal?.fire({
        title: 'Đổi mật khẩu thành công',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor,
        willClose: () => {
          cancelEdit()
        }
      })
    }
  },
  onResponseError({ response }) {
    if (response._data?.message === '密碼錯誤') {
      formRefs.value?.setFieldError('oldPassword', 'Mật khẩu cũ không đúng')
    }
  }
})
pending.value = false
</script>
