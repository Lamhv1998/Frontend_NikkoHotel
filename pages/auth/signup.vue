<template>
  <VForm
    ref="formRefs"
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema[progress]"
    @submit="submit"
  >
    <!-- Tiêu đề -->
    <CAuthTitle text="Đăng ký ngay" />

    <!-- Tiến trình bước -->
    <UIStepper
      v-model="progress"
      :steps="['Nhập email và mật khẩu', 'Xác nhận email', 'Điền thông tin cơ bản']"
      :disabled="apiPending"
    />

    <!-- Biểu mẫu -->
    <Transition name="modal" mode="out-in">
      <!-- Bước 0: Email & Mật khẩu -->
      <div v-if="progress === 0" class="space-y-4">
        <UIInput
          v-model="formData.email"
          name="email"
          label="Email"
          placeholder="hello@exsample.com"
          :error="errors.email"
          :disabled="apiPending"
        />
        <UIInput
          v-model="formData.password"
          name="password"
          label="Mật khẩu"
          type="password"
          placeholder="Vui lòng nhập mật khẩu"
          :error="errors.password"
          :disabled="apiPending"
        />
        <UIInput
          v-model="formCtrl.confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Vui lòng nhập lại mật khẩu"
          :error="errors.confirmPassword"
          :disabled="apiPending"
        />
      </div>

      <!-- Bước 1: Xác nhận email -->
      <div v-else-if="progress === 1" class="space-y-4">
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Xác nhận email</h3>
          <p class="text-sm text-gray-600 mb-4">
            Mã xác nhận đã được gửi đến <strong>{{ formData.email }}</strong>
          </p>
        </div>
        
        <UIInput
          v-model="verificationCode"
          name="verificationCode"
          label="Mã xác nhận"
          placeholder="Nhập mã 6 số"
          :error="errors.verificationCode"
          :disabled="apiPending"
          maxlength="6"
        />
        
        <div class="text-center">
          <button
            type="button"
            @click="resendVerificationCode"
            :disabled="resendDisabled"
            class="text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
          >
            {{ resendDisabled ? `Gửi lại sau ${resendCountdown}s` : 'Gửi lại mã' }}
          </button>
        </div>
      </div>

      <!-- Bước 2: Họ tên, SĐT, Ngày sinh, Địa chỉ -->
      <div v-else class="space-y-4">
        <UIInput
          v-model="formData.name"
          name="name"
          label="Họ và tên"
          placeholder="Vui lòng nhập họ tên"
          :error="errors.name"
          :disabled="apiPending"
        />

                 <UIInput
           v-model="formData.phone"
           name="phone"
           label="Số điện thoại"
           type="tel"
           placeholder="Vui lòng nhập số điện thoại"
           :error="errors.phone"
           :disabled="apiPending"
         />

                 <CBirthday 
           v-model="formData.birthday" 
           :error="errors.birthday" 
           :disabled="apiPending"
           @update:modelValue="(val) => { formData.birthday = val; console.log('Birthday updated:', val) }"
         />

                 <CAddress
           v-model="formData.address"
           :detail-error="errors.detail"
           :zipcode-error="errors.city || errors.district"
           :disabled="apiPending"
         />

        <UICheckbox
          v-model="formCtrl.isAgree"
          name="agree"
          label="Quy định sử dụng thông tin cá nhân"
          :error="errors.agree"
          text="Tôi đã đọc và đồng ý với quy định sử dụng thông tin cá nhân của website"
          :disabled="apiPending"
        />
      </div>
    </Transition>

    <div class="space-y-4">
             <!-- Nút: Gửi -->
       <UIButton
         type="submit"
         :text="progress === 0 ? 'Tiếp theo' : progress === 1 ? 'Xác nhận' : 'Hoàn tất đăng ký'"
         block
         :disabled="apiPending"
         :loading="apiPending"
       />

      <!-- Liên kết: Đăng nhập -->
      <div class="flex gap-2">
        <p class="text-body-2 text-text-inverse xl:text-body">Đã có tài khoản?</p>
        <NuxtLink class="hot-link-wrapper" to="/auth/login">
          <UIButton text="Đăng nhập ngay" variant="ghost" />
        </NuxtLink>
      </div>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import type { ExtendedUserCreationRequest } from '@/types/auth'

/* Thuộc tính toàn cục */
const styleStore = useStyleStore()
const { $Swal, $dayjs, $validator } = useNuxtApp()

/* PageMeta */
definePageMeta({
  middleware: 'record',
  layout: 'auth'
})

/* Biểu mẫu đăng ký */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = reactive<ExtendedUserCreationRequest>({
  email: '',
  password: '',
  name: '',
  phone: '',
  birthday: '',
  address: {
    city: '',
    district: '',
    city: '',
    district: '',
    detail: ''
  }
})
const formCtrl = ref({ confirmPassword: '', isAgree: false })
const verificationCode = ref('')
const resendCountdown = ref(0)
const resendDisabled = computed(() => resendCountdown.value > 0)

// Debug: Kiểm tra form data
watch(formData, (newVal) => {
  console.log('Form data changed:', newVal)
  console.log('Birthday value:', newVal.birthday, 'Type:', typeof newVal.birthday)
}, { deep: true })

// Quy tắc biểu mẫu
const schema = computed(() => [
  {
    email: 'required|email',
    password: (val: string) => {
      if (!val) return 'Mật khẩu là bắt buộc'
      if (!$validator.isLength(val, { min: 8 })) return 'Mật khẩu phải có ít nhất 8 ký tự'
      if ($validator.isAlpha(val)) return 'Mật khẩu không được chỉ có chữ cái'
      if ($validator.isNumeric(val)) return 'Mật khẩu không được chỉ có số'
      if (!$validator.isAlphanumeric(val))
        return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
      return {}
    },
    confirmPassword: 'required|confirmed:@password'
  },
  {
    verificationCode: (val: string) => {
      if (!val) return 'Mã xác nhận là bắt buộc'
      if (val.length !== 6) return 'Mã xác nhận phải có 6 số'
      if (!/^\d{6}$/.test(val)) return 'Mã xác nhận chỉ được chứa số'
      return {}
    }
  },
  {
    name: 'required|min:2',
    phone: (val: string) => {
      console.log('Validating phone:', val, 'Length:', val?.length, 'Pattern test:', /^0\d{9}$/.test(val))
      if (!val) return 'Số điện thoại là bắt buộc'
      if (val.length !== 10) return 'Số điện thoại phải có đúng 10 số'
      if (!/^0\d{9}$/.test(val)) return 'Số điện thoại phải bắt đầu bằng số 0'
      return {}
    },
    birthday: () => {
      const val = formData.birthday
      console.log('Validating birthday from formData:', val, 'Type:', typeof val)
      if (!val) return 'Ngày sinh là bắt buộc'
      
      // CBirthday component trả về format YYYY-MM-DD hoặc YYYY-M-D
      // Kiểm tra format ngày tháng - cho phép cả YYYY-MM-DD và YYYY-M-D
      const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
      if (!dateRegex.test(val)) {
        console.log('Date format validation failed for:', val)
        return 'Ngày sinh phải có format YYYY-MM-DD'
      }
      
      // Kiểm tra ngày hợp lệ bằng cách parse
      const [year, month, day] = val.split('-').map(Number)
      if (year < 1900 || year > new Date().getFullYear()) {
        console.log('Invalid year:', year)
        return 'Năm sinh không hợp lệ'
      }
      
      if (month < 1 || month > 12) {
        console.log('Invalid month:', month)
        return 'Tháng sinh không hợp lệ'
      }
      
      if (day < 1 || day > 31) {
        console.log('Invalid day:', day)
        return 'Ngày sinh không hợp lệ'
      }
      
      // Kiểm tra ngày không phải tương lai
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const birthDate = new Date(year, month - 1, day) // month - 1 vì Date constructor tháng bắt đầu từ 0
      
      if (birthDate > today) {
        console.log('Future date detected:', val)
        return 'Ngày sinh không thể là tương lai'
      }
      
      // Kiểm tra ngày không quá xa trong quá khứ (ví dụ: 100 năm trước)
      const minDate = new Date()
      minDate.setFullYear(today.getFullYear() - 100)
      minDate.setHours(0, 0, 0, 0)
      if (birthDate < minDate) {
        console.log('Date too far in past:', val)
        return 'Ngày sinh không hợp lệ (quá xa trong quá khứ)'
      }
      
      console.log('Birthday validation passed for:', val)
      return {}
    },
         'address.city': () => {
       const val = formData.address.city
       console.log('Validating city:', val)
       if (!val || val.trim() === '') return 'Tỉnh/Thành phố là bắt buộc'
       return {}
     },
     'address.district': () => {
       const val = formData.address.district
       console.log('Validating district:', val)
       if (!val || val.trim() === '') return 'Quận/Huyện là bắt buộc'
       return {}
     },
     detail: () => {
       const val = formData.address.detail
       console.log('Validating detail:', val)
       if (!val || val.trim() === '') return 'Địa chỉ chi tiết là bắt buộc'
       return {}
     },
     isAgree: () => {
       const val = formCtrl.value.isAgree
       console.log('Validating isAgree:', val)
       return !val ? 'Vui lòng đọc và đồng ý với quy định sử dụng thông tin cá nhân của website' : {}
     }
  }
])

// Tiến trình biểu mẫu
const progress = ref(0)

// Gửi biểu mẫu
const submit = () => {
  console.log('=== SUBMIT FUNCTION CALLED ===')
  console.log('Progress:', progress.value)
  console.log('Form data:', formData)
  console.log('Form control:', formCtrl.value)
  
  // Kiểm tra validation trước khi submit
  if (progress.value === 2) {
    console.log('=== VALIDATION CHECK ===')
    console.log('Name:', formData.name, 'Valid:', formData.name && formData.name.length >= 2)
    console.log('Phone:', formData.phone, 'Valid:', formData.phone && formData.phone.length === 10 && /^0\d{9}$/.test(formData.phone))
    console.log('Birthday:', formData.birthday, 'Valid:', formData.birthday && /^\d{4}-\d{1,2}-\d{1,2}$/.test(formData.birthday))
    console.log('City:', formData.address.city, 'Valid:', formData.address.city && formData.address.city.trim() !== '')
    console.log('District:', formData.address.district, 'Valid:', formData.address.district && formData.address.district.trim() !== '')
    console.log('Detail:', formData.address.detail, 'Valid:', formData.address.detail && formData.address.detail.trim() !== '')
    console.log('Agreement:', formCtrl.value.isAgree, 'Valid:', formCtrl.value.isAgree === true)
    
    // Debug chi tiết form data
    console.log('=== FORM DATA DEBUG ===')
    console.log('Full formData:', formData)
    console.log('Full formCtrl:', formCtrl.value)
    console.log('Address object:', formData.address)
  }
  
  if (progress.value === 0) {
    console.log('Step 0: Calling ceRefresh...')
    ceRefresh()
    return
  }
  if (progress.value === 1) {
    console.log('Step 1: Calling verifyEmailAndProceed...')
    verifyEmailAndProceed()
    return
  }
  console.log('Step 2: Calling sRefresh for final registration...')
  sRefresh()
}

const verifyEmailAndProceed = async () => {
  if (!verificationCode.value || verificationCode.value.length !== 6) {
    $Swal?.fire({
      title: 'Lỗi!',
      text: 'Vui lòng nhập mã xác nhận 6 số',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
    return
  }

  try {
    const isValid = await verifyEmailCode(formData.email, verificationCode.value)
    if (isValid) {
      progress.value = 2
      $Swal?.fire({
        title: 'Thành công!',
        text: 'Email đã được xác nhận. Vui lòng điền thông tin cá nhân.',
        icon: 'success',
        confirmButtonText: 'Tiếp tục',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    } else {
      $Swal?.fire({
        title: 'Lỗi!',
        text: 'Mã xác nhận không đúng. Vui lòng kiểm tra lại.',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } catch (error) {
    console.error('Lỗi xác nhận email:', error)
    $Swal?.fire({
      title: 'Lỗi!',
      text: 'Không thể xác nhận email. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  }
}

/* api */
const { registerCustomer, sendVerificationEmail, verifyEmailCode } = useRegister()
const apiPending = computed(() => cePending.value || vePending.value || sPending.value)

// api: Kiểm tra email đã đăng ký chưa (tạm thời bỏ qua, sẽ xử lý sau)
const cePending = ref(false)
const ceRefresh = async () => {
  // Tạm thời bỏ qua việc kiểm tra email tồn tại
  // Trong thực tế, bạn sẽ cần gọi API kiểm tra email
  // Bây giờ chỉ cần gửi mã xác nhận email
  sendVerificationEmailAndProceed()
}

// api: Xác nhận email
const vePending = ref(false)
const sendVerificationEmailAndProceed = async () => {
  try {
    vePending.value = true
    const otp = await sendVerificationEmail(formData.email)
    console.log('OTP đã gửi:', otp) // Chỉ để debug, trong production sẽ không hiển thị
    progress.value = 1
    startResendCountdown()
  } catch (error) {
    console.error('Lỗi gửi email xác nhận:', error)
    $Swal?.fire({
      title: 'Lỗi!',
      text: 'Không thể gửi mã xác nhận. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    vePending.value = false
  }
}

const resendVerificationCode = async () => {
  if (resendDisabled.value) return
  
  try {
    const otp = await sendVerificationEmail(formData.email)
    console.log('OTP mới:', otp) // Chỉ để debug
    startResendCountdown()
    $Swal?.fire({
      title: 'Thành công!',
      text: 'Mã xác nhận mới đã được gửi.',
      icon: 'success',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } catch (error) {
    console.error('Lỗi gửi lại mã:', error)
    $Swal?.fire({
      title: 'Lỗi!',
      text: 'Không thể gửi lại mã xác nhận. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  }
}

const startResendCountdown = () => {
  resendCountdown.value = 60
  const timer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// api: Đăng ký
const sPending = ref(false)
const sRefresh = async () => {
  console.log('=== SREFRESH FUNCTION STARTED ===')
  console.log('sPending:', sPending.value)
  console.log('Form data:', formData)
  console.log('Form control:', formCtrl.value)
  
  if (sPending.value) {
    console.log('Already pending, returning...')
    return
  }
  
  sPending.value = true
  console.log('Set sPending to true')
  
  try {
    // Debug: Kiểm tra dữ liệu trước khi gửi
    console.log('Form data before conversion:', formData)
    console.log('Birthday value:', formData.birthday, 'Type:', typeof formData.birthday)
    console.log('Address data:', formData.address)
    console.log('Agreement:', formCtrl.value.isAgree)
    
    // Chuyển đổi dữ liệu từ form hiện tại sang format mới
    const customerData = {
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      firstName: formData.name.split(' ').slice(-1).join(' ') || formData.name, // Lấy tên cuối cùng
      lastName: formData.name.split(' ').slice(0, -1).join(' ') || '', // Lấy họ
      sex: 'MALE' as const, // Mặc định, có thể thêm field chọn giới tính sau
      dateOfBirth: formData.birthday,
      address: {
        street: formData.address.detail,
        ward: formData.address.district || '', // Dùng district làm ward
        district: formData.address.district || '',
        city: formData.address.city || ''
      }
    }
    
    console.log('Customer data after conversion:', customerData)
    console.log('Calling registerCustomer API...')
    
         const result = await registerCustomer(customerData)
     console.log('API call successful, result:', result)
     console.log('Result type:', typeof result)
     console.log('Result keys:', Object.keys(result || {}))
     console.log('Result.id:', result?.id)
     console.log('Result.email:', result?.email)
     console.log('Result.phone:', result?.phone)
     console.log('Result.address:', result?.address)
    
         // Đăng ký thành công - hiển thị thông tin customer
     console.log('Showing success popup...')
     $Swal?.fire({
       title: 'Đăng ký thành công!',
       html: `
         <div class="text-left">
           <p><strong>Họ tên:</strong> ${result.lastName} ${result.firstName}</p>
           <p><strong>Email:</strong> ${formData.email}</p>
           <p><strong>Ngày sinh:</strong> ${result.dateOfBirth}</p>
         </div>
       `,
       icon: 'success',
       confirmButtonText: 'Đăng nhập ngay',
       confirmButtonColor: styleStore.confirmButtonColor,
               willClose: async () => {
          // Lưu thông tin customer vào localStorage
          if (result.id) {
            localStorage.setItem('customerId', result.id)
            localStorage.setItem('customerInfo', JSON.stringify(result))
          }
          // Lưu email để đăng nhập
          localStorage.setItem('userEmail', formData.email)
          
          // Hiển thị thông báo về việc đăng nhập
          $Swal?.fire({
            title: 'Thông báo',
            text: 'Tài khoản đã được tạo thành công! Vui lòng đăng nhập với email và mật khẩu vừa tạo.',
            icon: 'info',
            confirmButtonText: 'Đăng nhập ngay',
            confirmButtonColor: styleStore.confirmButtonColor
          }).then(() => {
            navigateTo('/auth/login')
          })
        }
     })
  } catch (error: any) {
    console.error('Signup error:', error)
    console.log('Showing error popup...')
    $Swal?.fire({
      title: 'Đăng ký thất bại!',
      text: error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    console.log('Setting sPending to false')
    sPending.value = false
  }
}
</script>
