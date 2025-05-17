<template>
  <div class="relative text-body text-black">
    <select
      v-model="input"
      :class="[cssColor, 'disabled:bg-system-gray-40 disabled:opacity-100']"
      :disabled="props.disabled"
    >
      <option :value="placeholderValue" disabled>{{ props.placeholder }}</option>
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="OptionShow(option, props.value)"
        :disabled="props.disabled"
      >
        {{ OptionShow(option, props.label) }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-1/2 right-4 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
    >
      <Icon name="ic:baseline-keyboard-arrow-down"></Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Array as PropType<(string | number | Record<string, unknown>)[]>,
    default: () => ['Title', 'Title', 'Title']
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Vui lòng chọn'
  },
  placeholderValue: {
    type: [String, Number],
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const input = defineModel<string | number>()

const OptionShow = (option: string | number | Record<string, unknown>, show: string) => {
  if (typeof option === 'object' && show) {
    return option[show] || ''
  }
  return option
}

const cssColor = computed<string>(() => {
  return props.error
    ? 'w-full appearance-none rounded-lg border border-system-error-100 p-4 pr-12 outline-none focus-visible:border-system-error-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-system-error-100/10'
    : 'w-full appearance-none rounded-lg border border-system-gray-40 p-4 pr-12 outline-none focus-visible:border-system-primary-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-system-primary-100/10'
})
</script>
