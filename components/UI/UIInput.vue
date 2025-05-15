<template>
  <label class="block space-y-2" :for="props.name">
    <div
      v-if="!headless && (attrs.label || props.name)"
      :class="[
        blackhead ? 'text-black' : 'text-white',
        'flex items-center justify-between text-sub-title xl:text-title'
      ]"
    >
      <span>
        {{ attrs.label || props.name }}
      </span>
      <span v-if="props.required" class="text-system-primary-100">必填</span>
    </div>
    <VField
      :id="props.name"
      v-bind="attrs"
      v-model.trim="input"
      :class="[cssColor, 'disabled:pointer-events-none disabled:bg-system-gray-40']"
      :name="props.name"
      :type="props.type"
    />
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      :name="props.name"
    />
  </label>
</template>

<script lang="ts" setup>
const attrs = useAttrs()

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  },
  required: Boolean,
  headless: Boolean,
  blackhead: Boolean
})

const input = defineModel<string>()

const cssColor = computed<string>(() => {
  return props.error
    ? 'w-full rounded-lg border border-system-error-100 bg-white p-4 text-body-2 xl:text-body text-system-gray-80 caret-system-error-100 placeholder:text-system-gray-60 focus:border-system-error-100 focus:outline focus:outline-4 focus:outline-system-error-100/10'
    : 'w-full rounded-lg border border-system-gray-40 bg-white p-4 text-body-2 xl:text-body text-system-gray-80 caret-system-primary-100 placeholder:text-system-gray-60 focus:border-system-primary-100 focus:outline focus:outline-4 focus:outline-system-primary-100/10'
})
</script>
