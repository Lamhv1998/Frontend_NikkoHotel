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
    <VField v-model.trim="formatBirthday" class="hidden" name="birthday" />
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      name="birthday"
    />
  </div>
</template>

<script lang="ts" setup>
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
  YYYY: formatBirthday.value ? $dayjs(formatBirthday.value).year() : '',
  MM: formatBirthday.value ? $dayjs(formatBirthday.value).month() + 1 : '', // Tháng cần cộng thêm 1, $dayjs tháng bắt đầu từ 0
  DD: formatBirthday.value ? $dayjs(formatBirthday.value).date() : ''
})

// Ngày hiện tại
watch(
  birthday,
  () => {
    const { YYYY, MM, DD } = birthday.value
    const formattedDate = `${YYYY}-${MM}-${DD}`
    formatBirthday.value = $dayjs(formattedDate, 'YYYY-M-D', true).isValid() ? formattedDate : ''
  },
  { immediate: true, deep: true }
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
