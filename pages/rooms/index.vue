<template>
  <div>
    <!-- Banner -->
    <CBanner rooms />

    <div v-if="rooms" class="section-container bg-system-primary-10">
      <div class="container space-y-8 xl:space-y-12">
        <!-- Khối tìm kiếm và lọc -->
        <div class="search-filter-container">
          <div class="grid gap-4 xl:grid-cols-12 xl:gap-6">
            <!-- Thanh tìm kiếm -->
            <div class="relative xl:col-span-4">
              <div class="relative">
                                 <Icon 
                   name="ic:baseline-search" 
                   class="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-system-gray-60"
                 />
                                 <input
                   v-model="searchQuery"
                   class="w-full rounded-lg border border-system-gray-40 bg-white pl-8 pr-3 py-2.5 text-body-sm transition-colors placeholder:text-system-gray-60 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                   type="text"
                   placeholder="Tìm kiếm phòng..."
                   @blur="hideSuggestions"
                   @focus="showSuggestions = true"
                   @input="updateSuggestions"
                 />
              </div>
              <!-- Danh sách gợi ý -->
              <ul
                v-if="showSuggestions && suggestions.length"
                class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-system-gray-40 bg-white shadow-lg"
              >
                <li
                  v-for="(suggestion, index) in suggestions"
                  :key="index"
                  class="cursor-pointer px-4 py-3 text-body transition-colors hover:bg-system-primary-10"
                  @mousedown.prevent="selectSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </li>
              </ul>
            </div>

            <!-- Bộ lọc diện tích -->
            <div class="xl:col-span-2">
                             <select 
                 v-model="areaFilter" 
                 class="w-full rounded-lg border border-system-gray-40 bg-white px-3 py-2.5 text-body-sm transition-colors focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
               >
                <option value="">Tất cả diện tích</option>
                <option value="30">30 m²</option>
                <option value="50">50 m²</option>
              </select>
            </div>

            <!-- Bộ lọc số người -->
            <div class="xl:col-span-2">
                             <select 
                 v-model="peopleFilter" 
                 class="w-full rounded-lg border border-system-gray-40 bg-white px-3 py-2.5 text-body-sm transition-colors focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
               >
                <option value="">Tất cả số người</option>
                <option value="2">2 người</option>
                <option value="4">4 người</option>
              </select>
            </div>

            <!-- Nút tìm kiếm -->
            <div class="xl:col-span-2">
                             <button
                 class="w-full rounded-lg bg-system-primary-100 px-4 py-2.5 text-body-sm font-medium text-white transition-all hover:bg-system-primary-120 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20 active:scale-95"
                 @click="filterRooms"
               >
                 <Icon name="ic:baseline-search" class="mr-1.5 h-4 w-4" />
                 Tìm kiếm
               </button>
            </div>

            <!-- Nút reset -->
            <div class="xl:col-span-2">
                             <button
                 class="w-full rounded-lg border border-system-gray-40 bg-white px-4 py-2.5 text-body-sm font-medium text-system-gray-80 transition-all hover:bg-system-gray-10 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20 active:scale-95"
                 @click="resetFilters"
               >
                 <Icon name="ic:baseline-refresh" class="mr-1.5 h-4 w-4" />
                 Làm mới
               </button>
            </div>
          </div>
        </div>

        <!-- Tiêu đề -->
        <div class="space-y-2 xl:space-y-4">
          <p class="text-h6 text-system-gray-80">Chọn loại phòng</p>
          <p class="text-h3 text-system-primary-100 xl:text-h1">
            Nhiều loại phòng, thoải mái lựa chọn
          </p>
        </div>

        <!-- Thông tin kết quả -->
        <div class="flex items-center justify-between">
          <p class="text-body text-system-gray-80">
            Tìm thấy <span class="font-medium text-system-primary-100">{{ filteredRooms.length }}</span> phòng
          </p>
          <div class="flex items-center gap-2">
            <span class="text-body-sm text-system-gray-60">Sắp xếp:</span>
            <select 
              v-model="sortBy" 
              class="rounded-lg border border-system-gray-40 bg-white px-3 py-2 text-body-sm transition-colors focus:border-system-primary-100 focus:outline-none"
            >
              <option value="name">Tên phòng</option>
              <option value="price">Giá</option>
              <option value="area">Diện tích</option>
            </select>
          </div>
        </div>

        <!-- Danh sách phòng -->
        <div v-if="filteredRooms.length > 0" class="space-y-6 xl:space-y-8">
          <div 
            v-for="(room, index) in sortedRooms" 
            :key="room._id"
            class="group"
          >
            <Card :room="room" />
          </div>
        </div>

        <!-- Không tìm thấy kết quả -->
        <div v-else class="text-center py-12 xl:py-20">
          <Icon 
            name="ic:baseline-search-off" 
            class="mx-auto h-16 w-16 text-system-gray-40 xl:h-24 xl:w-24"
          />
          <h3 class="mt-4 text-h5 text-system-gray-80 xl:text-h4">Không tìm thấy phòng phù hợp</h3>
          <p class="mt-2 text-body text-system-gray-60">
            Hãy thử thay đổi tiêu chí tìm kiếm hoặc liên hệ với chúng tôi để được hỗ trợ
          </p>
          <button
            class="mt-6 rounded-lg bg-system-primary-100 px-6 py-3 text-body font-medium text-white transition-all hover:bg-system-primary-120 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
            @click="resetFilters"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Card from './components/card.vue'

definePageMeta({ layout: 'landing' })

// Dữ liệu mẫu
const rooms = ref([
  {
    _id: '1',
    name: 'Phòng Deluxe',
    description: 'Phòng Deluxe với đầy đủ tiện nghi, view đẹp và không gian thoải mái.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 1200000,
    imageUrlList: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'
    ]
  },
  {
    _id: '2',
    name: 'Phòng Suite',
    description: 'Phòng Suite sang trọng với không gian rộng rãi, phù hợp cho gia đình.',
    areaInfo: '50 m²',
    bedInfo: '1 giường đôi + 1 giường sofa',
    maxPeople: 4,
    price: 2500000,
    imageUrlList: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop'
    ]
  },
  {
    _id: '3',
    name: 'Phòng Standard',
    description: 'Phòng Standard thoải mái và tiện nghi, giá cả hợp lý.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 800000,
    imageUrlList: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-05c94a8e4d3b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop'
    ]
  },
  {
    _id: '4',
    name: 'Phòng Premium',
    description: 'Phòng Premium cao cấp với view toàn cảnh thành phố.',
    areaInfo: '40 m²',
    bedInfo: '1 giường king size',
    maxPeople: 2,
    price: 1800000,
    imageUrlList: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop'
    ]
  }
])

// Biến reactive
const searchQuery = ref('')
const areaFilter = ref('')
const peopleFilter = ref('')
const sortBy = ref('name')
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)

// Gợi ý từ khóa (theo name + description)
const updateSuggestions = () => {
  const keyword = searchQuery.value.toLowerCase()
  if (!keyword) {
    suggestions.value = []
    return
  }
  const matches = rooms.value
    .flatMap((room) => [room.name, room.description])
    .filter((text) => text.toLowerCase().includes(keyword))
  suggestions.value = [...new Set(matches)].slice(0, 6) // loại trùng, lấy 6 gợi ý
}

// Chọn gợi ý
const selectSuggestion = (text: string) => {
  searchQuery.value = text
  showSuggestions.value = false
}

// Ẩn gợi ý (delay 100ms để tránh mất khi click)
const hideSuggestions = () => {
  setTimeout(() => (showSuggestions.value = false), 100)
}

// Danh sách phòng lọc
const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const matchSearch =
      room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchArea = areaFilter.value ? room.areaInfo.includes(areaFilter.value) : true
    const matchPeople = peopleFilter.value ? room.maxPeople === Number(peopleFilter.value) : true
    return matchSearch && matchArea && matchPeople
  })
})

// Danh sách phòng đã sắp xếp
const sortedRooms = computed(() => {
  const rooms = [...filteredRooms.value]
  
  switch (sortBy.value) {
    case 'name':
      return rooms.sort((a, b) => a.name.localeCompare(b.name))
    case 'price':
      return rooms.sort((a, b) => (a.price || 0) - (b.price || 0))
    case 'area':
      return rooms.sort((a, b) => {
        const areaA = parseInt(a.areaInfo.match(/\d+/)?.[0] || '0')
        const areaB = parseInt(b.areaInfo.match(/\d+/)?.[0] || '0')
        return areaA - areaB
      })
    default:
      return rooms
  }
})

// Hàm reset tất cả bộ lọc
const resetFilters = () => {
  searchQuery.value = ''
  areaFilter.value = ''
  peopleFilter.value = ''
  sortBy.value = 'name'
  showSuggestions.value = false
}

// (Tuỳ chọn) gọi khi nhấn nút tìm kiếm
const filterRooms = () => {
  console.log('Tìm kiếm:', searchQuery.value)
}
</script>

<style scoped>
.search-filter-container {
  background: linear-gradient(135deg, #faf7f5 0%, #f1eae4 100%);
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e1d1c2;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (min-width: 1280px) {
  .search-filter-container {
    padding: 1.5rem;
  }
}
</style>
