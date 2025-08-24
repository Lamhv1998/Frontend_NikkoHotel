<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-700 py-20 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <NuxtLink
            to="/services"
            class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <Icon name="ic:baseline-arrow-back" class="h-4 w-4" />
            Quay lại danh sách dịch vụ
          </NuxtLink>
          <div class="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Icon name="ic:outline-room-service" class="mr-2 h-5 w-5" />
            {{ service?.category || 'Dịch vụ' }}
          </div>
          <h1 class="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {{ service?.name || 'Chi tiết dịch vụ' }}
          </h1>
          <p class="mx-auto max-w-2xl text-xl text-primary-100">
            Khám phá chi tiết và đặt dịch vụ ngay bây giờ
          </p>
        </div>
      </div>
    </section>

    <!-- Service Details -->
    <section class="py-12">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div v-if="service" class="grid gap-8 lg:grid-cols-2">
          <!-- Service Image -->
          <div class="space-y-6">
            <div class="overflow-hidden rounded-2xl bg-white shadow-xl">
              <img
                class="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
                :src="service.image"
                :alt="service.name"
              />
            </div>
            
            <!-- Service Info -->
            <div class="rounded-2xl bg-white p-6 shadow-xl">
              <div class="mb-6">
                <h2 class="mb-2 text-2xl font-bold text-gray-900">{{ service.name }}</h2>
                <div class="flex items-center justify-between">
                  <span class="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                    {{ service.category }}
                  </span>
                  <span class="text-3xl font-bold text-primary-600">
                    {{ service.price.toLocaleString() }}₫
                  </span>
                </div>
              </div>

              <!-- Description -->
              <div v-if="service.description" class="mb-6">
                <h3 class="mb-3 text-lg font-semibold text-gray-900">Mô tả dịch vụ</h3>
                <p class="leading-relaxed text-gray-600">
                  {{ service.description }}
                </p>
              </div>

              <!-- Features -->
              <div class="mb-6">
                <h3 class="mb-3 text-lg font-semibold text-gray-900">Đặc điểm</h3>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-gray-600">
                    <Icon name="ic:outline-check-circle" class="h-5 w-5 text-green-500" />
                    <span>Giao hàng tận phòng</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <Icon name="ic:outline-check-circle" class="h-5 w-5 text-green-500" />
                    <span>Chất lượng đảm bảo</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <Icon name="ic:outline-check-circle" class="h-5 w-5 text-green-500" />
                    <span>Thanh toán an toàn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Form -->
          <div class="space-y-6">
            <div class="rounded-2xl bg-white p-6 shadow-xl">
              <h3 class="mb-6 text-xl font-bold text-gray-900">Đặt dịch vụ</h3>
              
              <!-- Quantity -->
              <div class="mb-6">
                <label class="mb-3 block text-sm font-medium text-gray-700">Số lượng</label>
                <div class="flex items-center gap-4">
                  <div class="flex items-center overflow-hidden rounded-lg border border-gray-200">
                    <button 
                      @click="decrement"
                      class="flex h-12 w-12 items-center justify-center bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100"
                    >
                      <Icon name="ic:baseline-remove" class="h-5 w-5" />
                    </button>
                    <input
                      v-model.number="quantity"
                      class="h-12 w-20 border-x border-gray-200 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
                      type="number"
                      min="1"
                    />
                    <button 
                      @click="increment"
                      class="flex h-12 w-12 items-center justify-center bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100"
                    >
                      <Icon name="ic:baseline-add" class="h-5 w-5" />
                    </button>
                  </div>
                  <span class="text-sm text-gray-500">x {{ service.price.toLocaleString() }}₫</span>
                </div>
              </div>

              <!-- Scheduled Time -->
              <div class="mb-6">
                <label class="mb-3 block text-sm font-medium text-gray-700">Hẹn giờ giao dịch vụ</label>
                <input
                  v-model="scheduledTime"
                  class="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  type="datetime-local"
                />
              </div>

              <!-- Notes -->
              <div class="mb-6">
                <label class="mb-3 block text-sm font-medium text-gray-700">Ghi chú</label>
                <textarea
                  v-model="note"
                  class="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Ví dụ: Không lấy hành, giao lúc 12h, yêu cầu đặc biệt..."
                  rows="3"
                ></textarea>
              </div>

              <!-- Total -->
              <div class="mb-6 rounded-lg bg-gray-50 p-4">
                <div class="flex items-center justify-between text-lg font-semibold text-gray-900">
                  <span>Tổng cộng:</span>
                  <span class="text-2xl text-primary-600">{{ totalPrice.toLocaleString() }}₫</span>
                </div>
              </div>

              <!-- Order Button -->
              <button
                @click="orderService"
                class="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-4 text-lg font-bold text-white transition-all hover:from-primary-700 hover:to-primary-800 hover:shadow-lg"
              >
                <Icon name="ic:outline-shopping-cart" class="mr-2 h-5 w-5 inline" />
                Đặt dịch vụ ngay
              </button>
            </div>

            <!-- Quick Info -->
            <div class="rounded-2xl bg-white p-6 shadow-xl">
              <h3 class="mb-4 text-lg font-semibold text-gray-900">Thông tin nhanh</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-gray-600">
                  <Icon name="ic:outline-schedule" class="h-5 w-5 text-primary-500" />
                  <span>Thời gian giao: 15-30 phút</span>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <Icon name="ic:outline-payment" class="h-5 w-5 text-primary-500" />
                  <span>Thanh toán: Tiền mặt hoặc thẻ</span>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <Icon name="ic:outline-support" class="h-5 w-5 text-primary-500" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Not Found -->
        <div v-else class="text-center py-16">
          <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Icon name="ic:outline-search-off" class="h-12 w-12 text-gray-400" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900">Không tìm thấy dịch vụ</h3>
          <p class="mb-6 text-gray-600">Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa</p>
          <NuxtLink
            to="/services"
            class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2 text-white transition-colors hover:bg-primary-700"
          >
            <Icon name="ic:baseline-arrow-back" class="h-4 w-4" />
            Quay lại danh sách
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Related Services -->
    <section v-if="relatedServices.length > 0" class="py-12 bg-gray-50">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="mb-8 text-center">
          <h2 class="mb-2 text-3xl font-bold text-gray-900">Dịch vụ liên quan</h2>
          <p class="text-gray-600">Khám phá thêm các dịch vụ cùng danh mục</p>
        </div>
        
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in relatedServices"
            :key="item.id"
            class="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            @click="$router.push(`/services/${item.id}`)"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                :src="item.image" 
                :alt="item.name" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800">
                  {{ item.category }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {{ item.name }}
              </h3>
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-primary-600">
                  {{ item.price.toLocaleString() }}₫
                </span>
                <Icon name="ic:baseline-arrow-forward" class="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Dữ liệu mẫu (thêm description)
const services = [
  {
    id: 1,
    name: 'Phở bò truyền thống',
    category: 'Đồ ăn',
    price: 75000,
    image: 'https://picsum.photos/400/300?random=10',
    description:
      'Một tô phở bò truyền thống với nước dùng đậm đà, thịt bò mềm, hành ngò thơm lừng. Phù hợp cho bữa sáng, trưa hoặc tối. Được chế biến từ những nguyên liệu tươi ngon nhất.'
  },
  {
    id: 2,
    name: 'Cà phê sữa đá',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=11',
    description:
      'Cà phê pha phin truyền thống kết hợp với sữa đặc ngọt béo. Uống nóng hoặc đá đều ngon. Hương vị đậm đà, thơm ngon đặc trưng của Việt Nam.'
  },
  {
    id: 6,
    name: 'Bún chả Hà Nội',
    category: 'Đồ ăn',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=15',
    description:
      'Bún chả Hà Nội với thịt nướng thơm lừng, nước chấm pha vừa miệng, ăn kèm rau sống tươi ngon. Món ăn đặc trưng của ẩm thực Hà Nội.'
  },
  {
    id: 8,
    name: 'Bánh mì pate truyền thống',
    category: 'Đồ ăn',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=17',
    description: 'Ổ bánh mì giòn rụm với lớp pate béo ngậy, dưa leo, đồ chua, và nước sốt đặc biệt. Bữa sáng hoàn hảo cho mọi lứa tuổi.'
  },
  {
    id: 9,
    name: 'Cơm tấm sườn nướng',
    category: 'Đồ ăn',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=18',
    description: 'Cơm tấm sườn bì chả, ăn kèm nước mắm chua ngọt, đồ chua, trứng ốp và mỡ hành. Hương vị đậm đà của miền Nam.'
  }
]

const route = useRoute()
const id = Number(route.params.id)

const service = services.find((s) => s.id === id) || null

const quantity = ref(1)
const increment = () => quantity.value++
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

const note = ref('')
const scheduledTime = ref('')

const totalPrice = computed(() => {
  if (!service) return 0
  return service.price * quantity.value
})

const relatedServices = computed(() => {
  if (!service) return []
  return services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3)
})

const orderService = () => {
  // Xử lý đặt dịch vụ
  
  // Hiển thị thông báo thành công
  alert('Đặt dịch vụ thành công!')
}
</script>
