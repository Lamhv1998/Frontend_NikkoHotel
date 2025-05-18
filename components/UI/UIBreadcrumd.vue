<template>
  <nav
    class="w-full bg-system-primary-100 p-4 dark:bg-gray-100 dark:text-gray-300"
    aria-label="breadcrumb"
  >
    <ol class="flex items-center space-x-1 md:space-x-3">
      <li class="align-items-center flex">
        <NuxtLink
          :class="{ 'font-semibold': isCurrent('/admin') }"
          class="tex t-system-primary-100 hover:underline"
          to="/admin"
        >
          Dashboard
        </NuxtLink>
        <span v-if="breadcrumbs.length" class="mx-2">/</span>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.link" class="flex items-center">
        <NuxtLink
          :class="{ 'font-semibold': index === breadcrumbs.length - 1 }"
          class="text-system-primary-100 hover:underline"
          :to="crumb.link"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const route = useRoute()
const { menuslidebar } = useMenuSidebar()
const breadcrumbs = computed(() => {
  const crumbs = []
  const currentPath = route.path
  // Tìm mục menu tương ứng với route hiện tại
  for (const menu of menuslidebar.value) {
    for (const item of menu.items) {
      if (item.link === currentPath) {
        crumbs.push({ name: menu.title, link: '/admin' }) // Nhóm menu
        crumbs.push({ name: item.name, link: item.link }) // Mục menu
        break
      }
    }
  }
  return crumbs
})
const isCurrent = (path) => {
  return route.path === path
}
</script>

<style lang="scss" scoped></style>
