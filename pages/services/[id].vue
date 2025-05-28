<template>
  <div class="min-h-screen w-full" style="background-color: antiquewhite">
    <div class="mx-auto max-w-screen-xl p-6 font-serif">
      <!-- Quay lại -->
      <button class="mb-6 text-sm text-yellow-500 hover:underline" @click="$router.back()">
        ← Quay lại danh sách dịch vụ
      </button>

      <!-- Thông tin dịch vụ chính -->
      <div v-if="service" class="space-y-6 rounded-xl bg-white p-6 shadow-md md:flex md:space-x-8">
        <!-- Ảnh -->
        <img
          class="h-64 w-full rounded-lg object-cover shadow md:w-1/2"
          :src="service.image"
          alt=""
        />

        <!-- Nội dung -->
        <div class="flex-1 space-y-4">
          <h1 class="text-3xl font-bold text-gray-800">{{ service.name }}</h1>
          <p class="text-sm italic text-gray-500">{{ service.category }}</p>
          <p class="text-xl font-semibold text-yellow-500">{{ service.price.toLocaleString() }}₫</p>

          <!-- Mô tả -->
          <div v-if="service.description">
            <h2 class="mb-1 mt-4 text-lg font-semibold text-gray-700">Mô tả:</h2>
            <p class="whitespace-pre-line leading-relaxed text-gray-600">
              {{ service.description }}
            </p>
          </div>

          <!-- Số lượng -->
          <div class="flex items-center space-x-4 pt-2">
            <label class="font-medium">Số lượng:</label>
            <div class="flex items-center overflow-hidden rounded border">
              <button class="bg-yellow-400 px-4 py-2 hover:bg-yellow-300" @click="decrement">
                -
              </button>
              <input
                v-model.number="quantity"
                class="w-16 border-l border-r text-center focus:outline-none"
                type="number"
                min="1"
              />
              <button class="bg-yellow-400 px-4 py-2 hover:bg-yellow-300" @click="increment">
                +
              </button>
            </div>
          </div>

          <!-- Ghi chú -->
          <div>
            <label class="mb-1 block font-medium">Ghi chú:</label>
            <textarea
              v-model="note"
              class="w-full rounded border p-3 focus:outline-yellow-400"
              placeholder="Ví dụ: Không lấy hành, giao lúc 12h..."
              rows="3"
            ></textarea>
          </div>

          <!-- Hẹn giờ -->
          <div>
            <label class="mb-1 block font-medium">Hẹn giờ giao dịch vụ:</label>
            <input
              v-model="scheduledTime"
              class="w-full rounded border p-2 focus:outline-yellow-400"
              type="datetime-local"
            />
          </div>

          <!-- Đặt dịch vụ -->
          <button
            class="w-full rounded bg-yellow-500 py-3 text-lg font-semibold text-white transition-all hover:bg-yellow-400"
          >
            Đặt dịch vụ
          </button>
        </div>
      </div>

      <!-- Dịch vụ cùng loại -->
      <div v-if="relatedServices.length" class="mt-10">
        <div class="mx-auto mb-8 max-w-5xl">
          <UITitle text1="Dịch vụ cùng loại" />
        </div>
        <!-- <h2 class="text-2xl font-semibold mb-4">Dịch vụ cùng loại</h2> -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div
            v-for="item in relatedServices"
            :key="item.id"
            class="cursor-pointer rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
            @click="$router.push(`/services/${item.id}`)"
          >
            <img class="h-32 w-full rounded object-cover" :src="item.image" alt="" />
            <h3 class="mt-2 font-semibold text-gray-800">{{ item.name }}</h3>
            <p class="font-bold text-yellow-500">{{ item.price.toLocaleString() }}₫</p>
          </div>
        </div>
      </div>

      <!-- Không có dịch vụ -->
      <div v-else class="mt-10 text-center italic text-gray-500">
        Không có dịch vụ nào cùng loại.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import UITitle from '~/pages/blog/components/UI/UITitle.vue'

// Dữ liệu mẫu (thêm description)
const services = [
  {
    id: 1,
    name: 'Phở bò',
    category: 'Đồ ăn',
    price: 75000,
    image: 'https://picsum.photos/400/300?random=10',
    description:
      'Một tô phở bò truyền thống với nước dùng đậm đà, thịt bò mềm, hành ngò thơm lừng. Phù hợp cho bữa sáng, trưa hoặc tối.'
  },
  {
    id: 2,
    name: 'Cafe sữa',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=11',
    description:
      'Cà phê pha phin truyền thống kết hợp với sữa đặc ngọt béo. Uống nóng hoặc đá đều ngon.'
  },
  {
    id: 6,
    name: 'Bún chả',
    category: 'Đồ ăn',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=15',
    description:
      'Bún chả Hà Nội với thịt nướng thơm lừng, nước chấm pha vừa miệng, ăn kèm rau sống.'
  },
  {
    id: 8,
    name: 'Bánh mì pate',
    category: 'Đồ ăn',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=17',
    description: 'Ổ bánh mì giòn rụm với lớp pate béo ngậy, dưa leo, đồ chua, và nước sốt đặc biệt.'
  },
  {
    id: 9,
    name: 'Cơm tấm',
    category: 'Đồ ăn',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=18',
    description: 'Cơm tấm sườn bì chả, ăn kèm nước mắm chua ngọt, đồ chua, trứng ốp và mỡ hành.'
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

const relatedServices = computed(() => {
  if (!service) return []
  return services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3)
})
</script>
