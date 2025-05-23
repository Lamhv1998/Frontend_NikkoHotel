<template>
  <div class="flex items-center">
    <input
      id="id"
      class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      type="checkbox"
      :checked="modelValue"
      @change="onChange"
    />
    <label class="mx-2" for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id: string
  label?: string
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style lang="scss" scoped></style>
