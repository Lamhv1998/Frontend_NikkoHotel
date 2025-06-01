<template>
  <ol class="flex items-center space-x-1 md:space-x-3">
    <li class="flex items-center text-gray-600">
      <NuxtLink
        :class="{ 'font-semibold': isCurrent('/admin') }"
        class="hover:underline"
        to="/admin"
      >
        Admin
      </NuxtLink>
      <span v-if="breadcrumbs.length" class="mx-2">➤</span>
    </li>
    <li
      v-for="(crumb, index) in breadcrumbs"
      :key="crumb.link"
      class="flex items-center"
    >
      <NuxtLink
        :class="{ 'font-semibold': index === breadcrumbs.length - 1 }"
        class="hover:underline text-gray-600"
        :to="crumb.link"
      >
        {{ crumb.name }}
      </NuxtLink>
      <span v-if="index < breadcrumbs.length - 1" class="mx-2">➤</span>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  breadcrumbs: Array
})

const route = useRoute()
const isCurrent = (path) => {
  return route.path === path
}
</script>
