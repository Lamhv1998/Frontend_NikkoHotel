<template>
  <div>
    <!-- Banner -->
    <CBanner rooms />

    <div v-if="rooms" class="section-container bg-system-primary-10">
      <div class="max-w-screen-xl mx-auto px-4 space-y-10 xl:space-y-20 xl:flex xl:gap-10">

        <!-- Sidebar Bộ lọc bên trái -->
        <aside class="w-full xl:w-1/4 space-y-4">
          <!-- Thanh tìm kiếm -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="updateSuggestions"
              @focus="showSuggestions = true"
              @blur="hideSuggestions"
              type="text"
              placeholder="Tìm kiếm theo tên phòng hoặc mô tả..."
              class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-system-primary-100"
            />
            <!-- Danh sách gợi ý -->
            <ul
              v-if="showSuggestions && suggestions.length"
              class="absolute z-10 w-full bg-white border rounded-md shadow mt-1 max-h-60 overflow-auto"
            >
              <li
                v-for="(suggestion, index) in suggestions"
                :key="index"
                @mousedown.prevent="selectSuggestion(suggestion)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {{ suggestion }}
              </li>
            </ul>
          </div>

          <!-- Bộ lọc diện tích -->
          <div>
            <label class="block mb-1 font-medium">Diện tích</label>
            <select v-model="areaFilter" class="w-full p-2 border rounded-md">
              <option value="">Tất cả diện tích</option>
              <option value="30">30 m²</option>
              <option value="50">50 m²</option>
            </select>
          </div>

          <!-- Bộ lọc số người -->
          <div>
            <label class="block mb-1 font-medium">Số người</label>
            <select v-model="peopleFilter" class="w-full p-2 border rounded-md">
              <option value="">Tất cả số người</option>
              <option value="2">2 người</option>
              <option value="4">4 người</option>
            </select>
          </div>

          <!-- Sắp xếp theo giá -->
          <div>
            <label class="block mb-1 font-medium">Sắp xếp theo giá</label>
            <select v-model="sortOrder" class="w-full p-2 border rounded-md">
              <option value="">Mặc định</option>
              <option value="asc">Giá thấp đến cao</option>
              <option value="desc">Giá cao đến thấp</option>
            </select>
          </div>

          <!-- Nút tìm kiếm -->
          <button
            @click="filterRooms"
            class="w-full px-4 py-2 bg-system-primary-100 text-white rounded-md hover:bg-system-primary-80 transition"
          >
            Tìm kiếm
          </button>
        </aside>

        <!-- Nội dung bên phải -->
        <div class="w-full xl:w-3/4 space-y-8">
          <!-- Tiêu đề -->
          <div class="space-y-2">
            <p class="text-sub-title text-system-gray-80 xl:text-h6">Chọn loại phòng</p>
            <p class="text-h3 text-system-primary-100 xl:text-h1">Nhiều loại phòng, thoải mái lựa chọn</p>
          </div>

          <!-- Danh sách phòng -->
          <ol class="space-y-6 xl:space-y-12">
            <li v-for="(room, index) in sortedRooms" :key="index">
              <Card :room="room" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Card from './components/card.vue'

definePageMeta({ layout: 'landing' })

const rooms = ref([
  {
    _id: '1',
    name: 'Phòng Deluxe',
    description: 'Phòng Deluxe với đầy đủ tiện nghi.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 800000
  },
  {
    _id: '2',
    name: 'Phòng Suite',
    description: 'Phòng Suite sang trọng với không gian rộng rãi.',
    areaInfo: '50 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 4,
    price: 1200000
  },
  {
    _id: '3',
    name: 'Phòng Standard',
    description: 'Phòng Standard thoải mái và tiện nghi.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 600000
  }
])

const searchQuery = ref('')
const areaFilter = ref('')
const peopleFilter = ref('')
const sortOrder = ref('')
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)

const updateSuggestions = () => {
  const keyword = searchQuery.value.toLowerCase()
  if (!keyword) {
    suggestions.value = []
    return
  }
  const matches = rooms.value.flatMap(room => [room.name, room.description])
    .filter(text => text.toLowerCase().includes(keyword))
  suggestions.value = [...new Set(matches)].slice(0, 6)
}

const selectSuggestion = (text: string) => {
  searchQuery.value = text
  showSuggestions.value = false
}

const hideSuggestions = () => {
  setTimeout(() => showSuggestions.value = false, 100)
}

const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    const matchSearch = room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      || room.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchArea = areaFilter.value ? room.areaInfo.includes(areaFilter.value) : true
    const matchPeople = peopleFilter.value ? room.maxPeople === Number(peopleFilter.value) : true
    return matchSearch && matchArea && matchPeople
  })
})

const sortedRooms = computed(() => {
  const sorted = [...filteredRooms.value]
  if (sortOrder.value === 'asc') {
    return sorted.sort((a, b) => a.price - b.price)
  }
  if (sortOrder.value === 'desc') {
    return sorted.sort((a, b) => b.price - a.price)
  }
  return sorted
})

const filterRooms = () => {
  console.log('Tìm kiếm:', searchQuery.value)
}
</script>

<style scoped>
.search-filter-container {
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
