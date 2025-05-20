<template>
  <div class="py-6">
    <dashbroad />
    <adminUser />
  </div>
</template>

<script lang="ts" setup>
import dashbroad from './component/dashbroad.vue'
import adminUser from './user/index.vue'
definePageMeta({
  layout: 'adminlayout'
})
</script>
