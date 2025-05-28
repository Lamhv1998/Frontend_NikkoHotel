<template>
  <div class="mb-6 flex gap-4">
    <input
      v-model="searchModel"
      class="w-full rounded border px-4 py-2"
      type="text"
      placeholder="Tìm kiếm tiêu đề..."
    />
    <select v-model="categoryModel" class="rounded border px-4 py-2">
      <option value="">Tất cả chuyên mục</option>
      <option value="Nuxt">Nuxt</option>
      <option value="Vue">Vue</option>
      <option value="Deploy">Deploy</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  search: string
  category: string
}>()

const emits = defineEmits(['update:search', 'update:category'])

const searchModel = computed({
  get: () => props.search,
  set: (val) => emits('update:search', val)
})

const categoryModel = computed({
  get: () => props.category,
  set: (val) => emits('update:category', val)
})
</script>
