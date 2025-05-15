<template>
  <!-- Nút: Quên mật khẩu -->
  <UIButton text="Quên mật khẩu?" variant="text" @click="openForgot()" />

  <!-- Modal: Quên mật khẩu -->
  <UIModal v-model="forgotIsOpen" focus>
    <!-- Modal: Tiêu đề -->
    <template #header> Quên mật khẩu </template>

    <template #form>
      <VForm ref="formRefs" v-slot="{ errors }" :validation-schema="schema.forgot" @submit="submit">
        <!-- Modal: Nội dung -->
        <div class="p-4">
          <UIInput
            v-model="formData.email"
            name="email"
            label="Email"
            placeholder="hello@exsample.com"
            :error="errors.email"
            blackhead
            :disabled="apiPending"
          />
        </div>

        <div
          class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
        >
          <!-- Modal: Chân trang -->
          <UIButton
            text="Hủy"
            variant="secondary"
            :disabled="apiPending"
            @click="forgotIsOpen = false"
          />
          <UIButton type="submit" text="Xác nhận" :disabled="apiPending" :loading="apiPending" />
        </div>
      </VForm>
    </template>
  </UIModal>

  <!-- Modal: Đặt lại mật khẩu -->
  <UIModal v-model="resetIsOpen" focus>
    <!-- Modal: Tiêu đề -->
    <template #header> Đặt lại mật khẩu </template>

    <template #form>
      <VForm ref="formRefs" v-slot="{ errors }" :validation-schema="schema.reset" @submit="submit">
        <!-- Modal: Nội dung -->
        <div class="space-y-4 p-4">
          <UIInput
            v-model="formData.email"
            name="email"
            label="Email"
            placeholder="hello@exsample.com"
            :error="errors.email"
            blackhead
            disabled
          />
          <UIInput
            v-model="formData.code"
            name="code"
            label="Mã xác nhận"
            :error="errors.code"
            blackhead
            :disabled="apiPending"
          />
          <UIInput
            v-model="formData.newPassword"
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            :error="errors.newPassword"
            blackhead
            :disabled="apiPending"
          />
        </div>

        <div
          class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
        >
          <!-- Modal: Chân trang -->
          <UIButton
            text="Hủy"
            variant="secondary"
            :disabled="apiPending"
            @click="resetIsOpen = false"
          />
          <UIButton type="submit" text="Xác nhận" :disabled="apiPending" :loading="apiPending" />
        </div>
      </VForm>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import type { ForgotPayload } from '@/types'

/* Thuộc tính toàn cục */
const { $Swal, $validator } = useNuxtApp()
const styleStore = useStyleStore()

/* Trạng thái modal */
const forgotIsOpen = ref(false)
const resetIsOpen = ref(false)

// Quên mật khẩu: mở modal
const openForgot = () => {
  Object.assign(formData, {
    email: '',
    code: '',
    newPassword: ''
  })
  forgotIsOpen.value = true
}

/* Xác thực form */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = reactive<ForgotPayload>({ email: '', code: '', newPassword: '' })

// Quy tắc form
const schema = ref({
  forgot: { email: 'required|email' },
  reset: {
    email: 'required',
    code: 'required',
    newPassword: (val: string) => {
      if (!val) return 'Mật khẩu là bắt buộc'
      if (!$validator.isLength(val, { min: 8 })) return 'Mật khẩu phải có ít nhất 8 ký tự'
      if ($validator.isAlpha(val)) return 'Mật khẩu không được chỉ có chữ cái'
      if ($validator.isNumeric(val)) return 'Mật khẩu không được chỉ có số'
      if (!$validator.isAlphanumeric(val))
        return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
      return {}
    }
  }
})

// Gửi form
const submit = () => {
  if (forgotIsOpen.value) {
    ceRefresh()
  } else {
    fpRefresh()
  }
}

/* api */
const { checkEmailApi, getEmailCodeApi, forgotPwdApi } = useApi()
const apiPending = computed(() => cePending.value || fpPending.value)

// api: Kiểm tra email đã đăng ký chưa
const { pending: cePending, refresh: ceRefresh } = await checkEmailApi({
  body: computed(() => ({
    email: formData.email
  })),
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response.status === 200) {
      if (response._data.result.isEmailExists) {
        const { data } = await getEmailCodeApi({
          body: computed(() => ({
            email: formData.email
          }))
        })
        if (data) {
          forgotIsOpen.value = false
          $Swal?.fire({
            title: 'Gửi mã xác nhận thành công',
            icon: 'success',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: styleStore.confirmButtonColor,
            willClose: () => {
              resetIsOpen.value = true
            }
          })
        }
      } else {
        formRefs.value?.setFieldError('email', 'Email không tồn tại')
      }
    }
  }
})
cePending.value = false

// api: Đặt lại mật khẩu
const { pending: fpPending, refresh: fpRefresh } = await forgotPwdApi({
  body: formData,
  immediate: false,
  watch: false,
  onResponse({ response }) {
    if (response.status === 200) {
      resetIsOpen.value = false
      $Swal?.fire({
        title: 'Đặt lại mật khẩu thành công',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  },
  onResponseError() {
    formRefs.value?.setFieldError('code', 'Mã xác nhận sai, vui lòng kiểm tra Email')
  }
})
fpPending.value = false
</script>
