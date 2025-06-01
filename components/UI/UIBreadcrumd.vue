<template>
  <nav class="w-full bg-white p-4 dark:bg-gray-100 dark:text-gray-300" aria-label="breadcrumb">
    <div class="flex items-center justify-between">
      <BreadcrumbList :breadcrumbs="breadcrumbs" />
    </div>
  </nav>
</template>

<script setup>
import PageLogo from '~/components/page/PageLogo.vue'
import BreadcrumbList from './BreadcrumbList.vue'

const route = useRoute()
const { menuslidebar } = useMenuSidebar()
const breadcrumbs = computed(() => {
  const crumbs = []
  const currentPath = route.path
  // Tìm mục menu tương ứng với route hiện tại
  for (const menu of menuslidebar.value) {
    for (const item of menu.items) {
      if (currentPath.startsWith(item.link)) {
        crumbs.push({ name: menu.title, link: '/admin' }) // Nhóm menu
        crumbs.push({ name: item.name, link: item.link }) // Mục menu
        return crumbs
      }
    }
  }
  return crumbs
})
</script>

<style lang="scss" scoped></style>
