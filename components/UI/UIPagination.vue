<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div class="flex items-center justify-between gap-2 text-title">
    <!-- Prev Button -->
    <button :disabled="localPage <= 1" @click="updatePage(localPage - 1)">Prev</button>
    <!-- Page numbers -->
    <button
      v-for="pageNum in pagesToShow"
      :key="pageNum"
      :class="['px-2', pageNum === localPage ? 'bg-blue-500 text-white' : 'text-gray-700']"
      @click="updatePage(pageNum)"
    >
      {{ pageNum }}
    </button>
    <!-- Next Button -->
    <button :disabled="localPage >= pageCount" @click="updatePage(localPage + 1)">Next</button>
    <div v-if="showSizePicker" class="flex items-center gap-2">
      <select id="page-size" v-model.number="localPageSize" @change="onSizeChange">
        <option v-for="page in pageSizes" :key="page" :value="pageSize">
          {{ pageSize }}
        </option>
      </select>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  showSizePicker: {
    type: Boolean,
    default: false
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100]
  }
})
const emit = defineEmits(['update:page', 'update:pageSize'])

const localPage = ref(props.page)
const localPageSize = ref(props.pageSize)

// Đồng bộ localPage với props.page nếu cha thay đổi
watch(
  () => props.pageSize,
  (val) => {
    localPageSize.value = val
  }
)

// Khi đổi trang
function updatePage(page: number) {
  if (page < 1 || page > props.pageCount) return
  localPage.value = page
  emit('update:page', page)
}

// Khi đổi pageSize
function onSizeChange() {
  emit('update:pageSize', localPageSize.value)
}

// Hiển thị số trang (giới hạn 5 trang gần trang hiện tại)
const pagesToShow = computed(() => {
  const total = props.pageCount
  const current = localPage.value
  const delta = 2
  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)
  if (current <= delta) end = Math.min(total, 1 + delta * 2)
  if (current + delta > total) start = Math.max(1, total - delta * 2)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})
</script>
