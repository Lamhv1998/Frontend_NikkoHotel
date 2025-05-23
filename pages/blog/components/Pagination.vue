<template>
  <div class="flex gap-2 justify-center">
    <button
      v-for="page in total"
      :key="page"
      class="px-3 py-1 rounded border"
      :class="{ 'bg-blue-500 text-white': page === current }"
      @click="$emit('update:current', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ total: number; current: number }>()
defineEmits(['update:current'])
</script>
