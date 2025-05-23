<template>
  <div>
    <!-- Toàn màn hình -->
    <CBanner rooms />

    <div v-if="rooms" class="section-container bg-system-primary-10">
      <!-- Khối chứa -->
      <div class="container space-y-10 xl:space-y-20">
        <!-- Phần tìm kiếm và bộ lọc -->
        <div class="search-filter-container flex flex-col xl:flex-row gap-4 items-center">
          <!-- Thanh tìm kiếm theo chữ -->
          <div class="w-full xl:w-1/3">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm theo tên phòng hoặc mô tả..."
              class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-system-primary-100"
            />
          </div>

          <!-- Bộ lọc -->
          <div class="w-full xl:w-1/3 flex gap-4">
            <!-- Lọc theo diện tích -->
            <select
              v-model="areaFilter"
              class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-system-primary-100"
            >
              <option value="">Tất cả diện tích</option>
              <option value="30">30 m²</option>
              <option value="50">50 m²</option>
            </select>

            <!-- Lọc theo số người tối đa -->
            <select
              v-model="peopleFilter"
              class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-system-primary-100"
            >
              <option value="">Tất cả số người</option>
              <option value="2">2 người</option>
              <option value="4">4 người</option>
            </select>
          </div>

          <!-- Nút tìm kiếm -->
          <button
            @click="filterRooms"
            class="px-4 py-2 bg-system-primary-100 text-white rounded-md hover:bg-system-primary-80 transition"
          >
            Tìm kiếm
          </button>
        </div>

        <!-- Tiêu đề lớn -->
        <div class="space-x-2 xl:space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">Chọn loại phòng</p>
          <p class="text-h3 text-system-primary-100 xl:text-h1">
            Nhiều loại phòng, thoải mái lựa chọn
          </p>
        </div>

        <!-- Danh sách phòng -->
        <ol class="space-y-6 xl:space-y-12">
          <li v-for="(room, index) in filteredRooms" :key="index">
            <!-- Thẻ phòng -->
            <Card :room="room" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Card from './components/card.vue'

// Định nghĩa layout
definePageMeta({
  layout: 'landing'
})

// Dữ liệu phòng mẫu
const rooms = ref([
  {
    _id: '1',
    name: 'Phòng Deluxe',
    description: 'Phòng Deluxe với đầy đủ tiện nghi.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    layoutInfo: [{ name: 'Giường đôi' }, { name: 'Bàn làm việc' }, { name: 'Tủ lạnh' }],
    facilityInfo: [{ name: 'Điều hòa' }, { name: 'Tivi' }, { name: 'Wifi miễn phí' }],
    amenityInfo: [{ name: 'Khăn tắm' }, { name: 'Dầu gội' }, { name: 'Xà phòng' }]
  },
  {
    _id: '2',
    name: 'Phòng Suite',
    description: 'Phòng Suite sang trọng với không gian rộng rãi.',
    areaInfo: '50 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 4,
    layoutInfo: [{ name: 'Giường đôi' }, { name: 'Bàn làm việc' }, { name: 'Tủ lạnh' }],
    facilityInfo: [{ name: 'Điều hòa' }, { name: 'Tivi' }, { name: 'Wifi miễn phí' }],
    amenityInfo: [{ name: 'Khăn tắm' }, { name: 'Dầu gội' }, { name: 'Xà phòng' }]
  },
  {
    _id: '3',
    name: 'Phòng Standard',
    description: 'Phòng Standard thoải mái và tiện nghi.',
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    layoutInfo: [{ name: 'Giường đôi' }, { name: 'Bàn làm việc' }, { name: 'Tủ lạnh' }],
    facilityInfo: [{ name: 'Điều hòa' }, { name: 'Tivi' }, { name: 'Wifi miễn phí' }],
    amenityInfo: [{ name: 'Khăn tắm' }, { name: 'Dầu gội' }, { name: 'Xà phòng' }]
  }
])

// Biến cho tìm kiếm và bộ lọc
const searchQuery = ref('')
const areaFilter = ref('')
const peopleFilter = ref('')

// Computed property để lọc danh sách phòng
const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesArea = areaFilter.value ? room.areaInfo.includes(areaFilter.value) : true
    const matchesPeople = peopleFilter.value ? room.maxPeople === Number(peopleFilter.value) : true

    return matchesSearch && matchesArea && matchesPeople
  })
})

// Hàm xử lý khi nhấn nút tìm kiếm (tùy chọn, vì computed tự động cập nhật)
const filterRooms = () => {
  // Logic bổ sung nếu cần, ví dụ: gọi API mới
  console.log('Tìm kiếm với:', { searchQuery: searchQuery.value, areaFilter: areaFilter.value, peopleFilter: peopleFilter.value })
}
</script>

<style scoped>
.search-filter-container {
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>