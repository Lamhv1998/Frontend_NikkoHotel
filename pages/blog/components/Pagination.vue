<template>
  <div class="flex justify-center gap-2">
    <button
      v-for="page in total"
      :key="page"
      :class="{ 'bg-blue-500 text-white': page === current }"
      class="rounded border px-3 py-1"
      @click="$emit('update:current', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ total: number; current: number }>()
defineEmits(['update:current'])
</script>
