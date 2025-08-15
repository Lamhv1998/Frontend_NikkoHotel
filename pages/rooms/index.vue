<template>
  <div class="min-h-screen">
    <!-- Banner -->
    <CBanner rooms />

    <div v-if="rooms" class="section-container bg-system-primary-10">
      <div class="container space-y-10 xl:space-y-20">
        <!-- Khối tìm kiếm nâng cao -->
        <div class="search-filter-container relative rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-system-primary-100">Tìm kiếm phòng</h3>
            <p class="text-sm text-gray-600">Chọn tiêu chí phù hợp với nhu cầu của bạn</p>
          </div>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <!-- Thanh tìm kiếm -->
            <div class="relative">
              <label class="mb-2 block text-sm font-medium text-gray-700">Tìm kiếm</label>
              <input
                v-model="searchQuery"
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                type="text"
                placeholder="Tên phòng, mô tả..."
                @blur="hideSuggestions"
                @focus="showSuggestions = true"
                @input="updateSuggestions"
              />
              <!-- Danh sách gợi ý -->
              <ul
                v-if="showSuggestions && suggestions.length"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow-lg"
              >
                <li
                  v-for="(suggestion, index) in suggestions"
                  :key="index"
                  class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  @mousedown.prevent="selectSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </li>
              </ul>
            </div>

            <!-- Bộ lọc diện tích -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Diện tích</label>
              <select 
                v-model="areaFilter" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
              >
                <option value="">Tất cả diện tích</option>
                <option value="25">25 m²</option>
                <option value="30">30 m²</option>
                <option value="40">40 m²</option>
                <option value="50">50 m²</option>
                <option value="60">60 m² trở lên</option>
              </select>
            </div>

            <!-- Bộ lọc số người -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Số người</label>
              <select 
                v-model="peopleFilter" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
              >
                <option value="">Tất cả số người</option>
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người</option>
                <option value="5">5+ người</option>
              </select>
            </div>

            <!-- Bộ lọc giá -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Khoảng giá</label>
              <select 
                v-model="priceFilter" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
              >
                <option value="">Tất cả giá</option>
                <option value="1000000">Dưới 1 triệu</option>
                <option value="2000000">1-2 triệu</option>
                <option value="3000000">2-3 triệu</option>
                <option value="4000000">3-4 triệu</option>
                <option value="5000000">Trên 4 triệu</option>
              </select>
            </div>
          </div>

          <!-- Nút tìm kiếm và reset -->
          <div class="mt-6 flex gap-4">
            <button
              class="rounded-lg bg-system-primary-100 px-6 py-3 text-white transition-all duration-300 hover:bg-system-primary-80 hover:shadow-lg"
              @click="filterRooms"
            >
              🔍 Tìm kiếm
            </button>
            <button
              class="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-50"
              @click="resetFilters"
            >
              🔄 Đặt lại
            </button>
          </div>
        </div>

        <!-- Tiêu đề -->
        <div class="text-center space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">Chọn loại phòng</p>
          <h2 class="text-h3 text-system-primary-100 xl:text-h1">
            Nhiều loại phòng, thoải mái lựa chọn
          </h2>
          <p class="text-body text-gray-600 max-w-2xl mx-auto">
            Khám phá các loại phòng đa dạng từ phòng tiêu chuẩn đến suite cao cấp, 
            mỗi phòng đều được thiết kế để mang đến trải nghiệm lưu trú tuyệt vời nhất
          </p>
        </div>

        <!-- Thống kê kết quả -->
        <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div class="text-sm text-gray-600">
            Hiển thị <span class="font-semibold text-system-primary-100">{{ filteredRooms.length }}</span> 
            trong tổng số <span class="font-semibold">{{ rooms.length }}</span> phòng
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Sắp xếp:</span>
            <select 
              v-model="sortBy" 
              class="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-system-primary-100 focus:outline-none"
              @change="sortRooms"
            >
              <option value="name">Tên phòng</option>
              <option value="price">Giá</option>
              <option value="area">Diện tích</option>
              <option value="people">Số người</option>
            </select>
          </div>
        </div>

        <!-- Danh sách phòng -->
        <div v-if="filteredRooms.length > 0" class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div 
            v-for="(room, index) in filteredRooms" 
            :key="index"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <Card :room="room" />
          </div>
        </div>

        <!-- Không có kết quả -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy phòng phù hợp</h3>
          <p class="text-gray-500 mb-6">Hãy thử thay đổi tiêu chí tìm kiếm</p>
          <button
            class="rounded-lg bg-system-primary-100 px-6 py-3 text-white transition-all duration-300 hover:bg-system-primary-80"
            @click="resetFilters"
          >
            Đặt lại bộ lọc
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

// Dữ liệu mẫu cải tiến
const rooms = ref([
  {
    _id: '1',
    name: 'Phòng Deluxe',
    description: 'Phòng Deluxe với đầy đủ tiện nghi, view thành phố tuyệt đẹp.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 1800000,
    amenities: ['WiFi', 'TV', 'Mini bar', 'Phòng tắm riêng']
  },
  {
    _id: '2',
    name: 'Phòng Suite',
    description: 'Phòng Suite sang trọng với không gian rộng rãi, phòng khách riêng biệt.',
    areaInfo: '50 m²',
    bedInfo: '1 giường đôi + 1 sofa giường',
    maxPeople: 4,
    price: 3200000,
    amenities: ['WiFi', 'TV 2 màn hình', 'Mini bar', 'Phòng tắm riêng', 'Phòng khách']
  },
  {
    _id: '3',
    name: 'Phòng Standard',
    description: 'Phòng Standard thoải mái và tiện nghi, phù hợp cho khách du lịch.',
    areaInfo: '25 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 1200000,
    amenities: ['WiFi', 'TV', 'Phòng tắm riêng']
  },
  {
    _id: '4',
    name: 'Phòng Family',
    description: 'Phòng Family rộng rãi với 2 phòng ngủ, lý tưởng cho gia đình.',
    areaInfo: '60 m²',
    bedInfo: '2 giường đôi',
    maxPeople: 5,
    price: 4500000,
    amenities: ['WiFi', 'TV 2 màn hình', 'Mini bar', '2 phòng tắm', 'Phòng khách']
  },
  {
    _id: '5',
    name: 'Phòng Executive',
    description: 'Phòng Executive cao cấp với view toàn cảnh thành phố.',
    areaInfo: '40 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    price: 2800000,
    amenities: ['WiFi', 'TV', 'Mini bar', 'Phòng tắm riêng', 'View thành phố']
  }
])

// Biến reactive
const searchQuery = ref('')
const areaFilter = ref('')
const peopleFilter = ref('')
const priceFilter = ref('')
const sortBy = ref('name')
const suggestions = ref<string[]>([])
const showSuggestions = ref(false)

// Gợi ý từ khóa
const updateSuggestions = () => {
  const keyword = searchQuery.value.toLowerCase()
  if (!keyword) {
    suggestions.value = []
    return
  }
  const matches = rooms.value
    .flatMap((room) => [room.name, room.description])
    .filter((text) => text.toLowerCase().includes(keyword))
  suggestions.value = [...new Set(matches)].slice(0, 6)
}

// Chọn gợi ý
const selectSuggestion = (text: string) => {
  searchQuery.value = text
  showSuggestions.value = false
}

// Ẩn gợi ý
const hideSuggestions = () => {
  setTimeout(() => (showSuggestions.value = false), 100)
}

// Đặt lại bộ lọc
const resetFilters = () => {
  searchQuery.value = ''
  areaFilter.value = ''
  peopleFilter.value = ''
  priceFilter.value = ''
  sortBy.value = 'name'
}

// Sắp xếp phòng
const sortRooms = () => {
  // Logic sắp xếp sẽ được xử lý trong computed
}

// Danh sách phòng lọc
const filteredRooms = computed(() => {
  let result = rooms.value.filter((room) => {
    const matchSearch =
      room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchArea = areaFilter.value ? room.areaInfo.includes(areaFilter.value) : true
    
    const matchPeople = peopleFilter.value ? room.maxPeople === Number(peopleFilter.value) : true
    
    const matchPrice = priceFilter.value ? room.price <= Number(priceFilter.value) : true
    
    return matchSearch && matchArea && matchPeople && matchPrice
  })

  // Sắp xếp
  switch (sortBy.value) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price':
      result.sort((a, b) => a.price - b.price)
      break
    case 'area':
      result.sort((a, b) => parseInt(a.areaInfo) - parseInt(b.areaInfo))
      break
    case 'people':
      result.sort((a, b) => a.maxPeople - b.maxPeople)
      break
  }

  return result
})

// Tìm kiếm
const filterRooms = () => {
  console.log('Tìm kiếm:', {
    search: searchQuery.value,
    area: areaFilter.value,
    people: peopleFilter.value,
    price: priceFilter.value,
    sort: sortBy.value
  })
}
</script>

<style scoped>
.search-filter-container {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #e2e8f0;
}
</style>
