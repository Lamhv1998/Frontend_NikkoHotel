<template>
  <NuxtLink class="block rounded border p-4 hover:shadow" :to="`/blog/${blog.id}`">
    <h3 class="text-xl font-bold">{{ blog.title }}</h3>
    <p class="text-gray-600">{{ blog.summary }}</p>
    <p class="mt-1 text-sm text-gray-400">Chuyên mục: {{ blog.category }} - {{ blog.createdAt }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{ blog: Blog }>()
</script>
