```vue
<template>
  <div id="admin-layout" class="flex min-h-screen bg-system-gray-10">
    <!-- Sidebar -->
    <UISlideBar />
    <!-- Nội dung chính -->
    <div class="flex flex-1 flex-col">
      <!-- Breadcrumb -->
      <UIBreadcrumd class="sticky top-0 z-10" />
      <!-- Nội dung động từ page -->
      <main class="flex-1 p-6">
        <slot />
      </main>
      <PageAdminFooter />
    </div>
  </div>
</template>
<script lang="ts" setup>
import UISlideBar from '~/components/UI/UISlideBar.vue'
import UIBreadcrumd from '~/components/UI/UIBreadcrumd.vue'
import PageAdminFooter from '~/components/page/PageAdminFooter.vue'
</script>

<style lang="scss" scoped>
#admin-layout {
  @apply relative flex;
}
</style>
```
