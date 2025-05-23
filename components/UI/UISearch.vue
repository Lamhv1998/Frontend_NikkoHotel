````<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 20 20">
        <path
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </div>
    <input
      class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm"
      type="text"
      :value="modelValue"
      placeholder="Search for users"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
