<!-- UIBreadcrumd.vue -->
<template>
  <nav
    class="w-full bg-white p-4 dark:bg-gray-100 dark:text-gray-300"
    aria-label="breadcrumb"
  >
    <div class="flex items-center justify-between">
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
      <PageLogo />
    </div>
  </nav>
</template>

<script setup>
import PageLogo from '~/components/page/PageLogo.vue'

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

const isCurrent = (path) => {
  return route.path === path
}
</script>


<style scoped>
nav {
  background: #a39f9f;
  border-bottom: 1px solid #f3f3f3; /* Light gray border to separate from content */
  border-top-left-radius: 50px;
  border-top-right-radius: 50px; 
}

.text-gray-600 {
  color: #4b5563; /* Match the text color in the image */
}

.hover:underline:hover {
  text-decoration: underline;
}
</style>