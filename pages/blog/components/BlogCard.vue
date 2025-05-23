<template>
  <NuxtLink :to="`/blog/${blog.id}`" class="block border p-4 rounded hover:shadow">
    <h3 class="text-xl font-bold">{{ blog.title }}</h3>
    <p class="text-gray-600">{{ blog.summary }}</p>
    <p class="text-sm text-gray-400 mt-1">Chuyên mục: {{ blog.category }} - {{ blog.createdAt }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ blog: Blog }>()
</script>
