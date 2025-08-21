<template>
  <div class="space-y-2">
    <label :class="[blackhead ? 'text-black' : 'text-text-inverse', 'text-sub-title xl:text-title']"
      >Ngày sinh</label
    >

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <UISelect
        v-model="birthday.YYYY"
        placeholder="--Năm--"
        :error="props.error"
        :options="YYYY"
        :disabled="props.disabled"
      />
      <UISelect
        v-model="birthday.MM"
        placeholder="--Tháng--"
        :error="props.error"
        :options="MM"
        :disabled="props.disabled"
      />
      <UISelect
        v-model="birthday.DD"
        placeholder="--Ngày--"
        :error="props.error"
        :options="DD"
        :disabled="props.disabled"
      />
    </div>
    <VField v-model.trim="formatBirthday" class="hidden" name="dateOfBirth" />
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      name="dateOfBirth"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

const props = defineProps({
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  blackhead: Boolean
})

const { $dayjs } = useNuxtApp()

const formatBirthday = defineModel<string>({
  default: ''
})

const birthday = ref<Record<string, string | number>>({
  YYYY: '',
  MM: '',
  DD: ''
})

// Khởi tạo birthday từ formatBirthday nếu có
const initializeBirthday = () => {
  if (formatBirthday.value && $dayjs(formatBirthday.value).isValid()) {
    birthday.value.YYYY = $dayjs(formatBirthday.value).year()
    birthday.value.MM = $dayjs(formatBirthday.value).month() + 1 // Tháng cần cộng thêm 1, $dayjs tháng bắt đầu từ 0
    birthday.value.DD = $dayjs(formatBirthday.value).date()
  }
}

// Khởi tạo khi component mount
onMounted(() => {
  initializeBirthday()
})

// Watch birthday để cập nhật formatBirthday
watch(
  birthday,
  () => {
    const { YYYY, MM, DD } = birthday.value
    if (YYYY && MM && DD) {
      const formattedDate = `${YYYY}-${MM.toString().padStart(2, '0')}-${DD.toString().padStart(2, '0')}`
      if ($dayjs(formattedDate, 'YYYY-MM-DD', true).isValid()) {
        formatBirthday.value = formattedDate
      } else {
        formatBirthday.value = ''
      }
    } else {
      formatBirthday.value = ''
    }
  },
  { deep: true }
)

// Watch formatBirthday để cập nhật birthday khi có thay đổi từ bên ngoài
watch(
  formatBirthday,
  (newValue) => {
    if (newValue && newValue !== formatBirthday.value) {
      initializeBirthday()
    }
  }
)

// Tính toán các tùy chọn
const YYYY = computed(() => {
  const currentYear = $dayjs().year()
  return Array.from({ length: 100 }, (_, i) => currentYear - i)
})
const MM = computed(() => Array.from({ length: 12 }, (_, i) => 1 + i))
const DD = computed(() => {
  const { YYYY, MM, DD } = birthday.value
  const daysInMonth = $dayjs(`${YYYY}-${MM}`).daysInMonth() || 31
  if (typeof DD === 'number' && DD > daysInMonth) {
    birthday.value.DD = daysInMonth
  }
  return Array.from({ length: daysInMonth }, (_, i) => 1 + i)
})
</script>
