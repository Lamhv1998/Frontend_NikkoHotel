<template>
  <div class="min-h-screen bg-gradient-to-b from-[#4B2E00] to-[#8B5E3C] text-white p-8 font-serif">
    <h1 class="text-4xl font-bold mb-8 text-center tracking-wide drop-shadow-lg">
      Đặt dịch vụ khách sạn
    </h1>

    <!-- Filter category -->
    <div class="flex justify-center flex-wrap gap-4 mb-10">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectCategory(cat)"
        :class="[
          'px-6 py-2 rounded-full font-semibold transition-colors duration-300',
          selectedCategory === cat
            ? 'bg-yellow-400 text-[#4B2E00] shadow-lg'
            : 'bg-transparent border border-yellow-400 hover:bg-yellow-300 hover:text-[#4B2E00]'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Danh sách dịch vụ -->
    <ul class="max-w-3xl mx-auto space-y-4">
      <li
        v-for="service in pagedServices"
        :key="service.id"
        class="bg-[#5C3A00] bg-opacity-70 rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
      >
        <h2 class="text-xl font-semibold mb-1">{{ service.name }}</h2>
        <p class="text-yellow-300 italic">{{ service.category }}</p>
      </li>
    </ul>

    <!-- Phân trang -->
    <div class="flex justify-center mt-12 space-x-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-md font-semibold transition-colors duration-300',
          currentPage === page
            ? 'bg-yellow-400 text-[#4B2E00] shadow-lg'
            : 'bg-transparent border border-yellow-400 hover:bg-yellow-300 hover:text-[#4B2E00]'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ['Tất cả', 'Đồ ăn', 'Thức uống', 'Giặt ủi', 'Đặt xe', 'Khác']

const services = [
  { id: 1, name: 'Phở bò', category: 'Đồ ăn' },
  { id: 2, name: 'Cafe sữa', category: 'Thức uống' },
  { id: 3, name: 'Giặt áo sơ mi', category: 'Giặt ủi' },
  { id: 4, name: 'Thuê xe máy', category: 'Đặt xe' },
  { id: 5, name: 'Massage', category: 'Khác' },
  { id: 6, name: 'Bún chả', category: 'Đồ ăn' },
  { id: 7, name: 'Nước ép cam', category: 'Thức uống' },
]

const selectedCategory = ref('Tất cả')
const currentPage = ref(1)
const pageSize = 3

function selectCategory(cat) {
  selectedCategory.value = cat
  currentPage.value = 1
}

const filteredServices = computed(() => {
  if (selectedCategory.value === 'Tất cả') return services
  return services.filter(s => s.category === selectedCategory.value)
})

const totalPages = computed(() => Math.ceil(filteredServices.value.length / pageSize))

const pagedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredServices.value.slice(start, start + pageSize)
})
</script>
