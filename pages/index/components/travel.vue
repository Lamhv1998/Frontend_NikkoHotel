<template>
  <section class="section-container">
    <div class="container space-y-10 xl:space-y-20">
      <!-- Tiêu đề lớn -->
      <UITitle text1="Phương tiện" text2="di chuyển" />

      <div class="space-y-6 text-white xl:space-y-10">
        <div class="space-y-4">
          <!-- Địa chỉ -->
          <div class="text-body">Quận 1 Hồ Chí Minh Việt Nam</div>

          <!-- Bản đồ google -->
          <div
            id="GOOGLE_MAP"
            ref="mapRefs"
            class="h-[22.5rem] w-full overflow-hidden rounded-lg"
          />
        </div>

        <!-- Phương tiện di chuyển -->
        <ul class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <li v-for="(travel, index) in travels" :key="index">
            <!-- Biểu tượng -->
            <Icon
              class="text-icon-48 text-system-primary-100 xl:text-icon-80"
              :name="travel.icon"
            />

            <!-- Tên -->
            <h3 class="mt-2 text-title xl:mt-4 text-white xl:text-h5">{{ travel.name }}</h3>

            <!-- Mô tả -->
            <p class="mt-2 text-body-2 xl:text-body text-white">{{ travel.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'
// import googleMapStyles from './google-map-styles.json'
import UITitle from './UI/UITitle.vue'

/* Phương tiện di chuyển */
const travels = [
  {
    icon: 'ic:baseline-directions-car',
    name: 'Tự lái xe',
    description:
      'Nếu bạn chọn tự lái xe, có thể đi theo Quốc lộ 1, ra khỏi giao lộ Hồ Chí Minh, đi về hướng trung tâm thành phố và làm theo biển chỉ dẫn để đến "Khách sạn Nika". Khách sạn có bãi đậu xe thuận tiện cho bạn.'
  },
  {
    icon: 'ic:baseline-train',
    name: 'Tàu cao tốc / Tàu hỏa',
    description:
      'Nếu bạn đi tàu cao tốc hoặc tàu hỏa đi taxi khoảng 20 phút là đến nơi, xuống tại ga Công viên Trung tâm, đi bộ khoảng 10 phút là tới.'
  },
  {
    icon: 'IconLuxuryCar',
    name: 'Dịch vụ xe đưa đón',
    description:
      'Nika Hotel cung cấp dịch vụ xe đưa đón riêng, phí sẽ thay đổi tùy theo điểm đến. Vui lòng gọi số (07)123-4567 để được tư vấn chi tiết.'
  }
]

/* Google Maps */
const mapRefs = ref<HTMLElement | null>(null)

// Tọa độ
const location = { lat: 10.764645231021714, lng: 106.68311493253726 }
// ApiKey
const loader = new Loader({
  apiKey: 'AIzaSyDDes3MJu5RkOYFeTvZWNbvMZwH6eetYHs',
  version: 'weekly'
})

// Khởi tạo
onMounted(() => {
  loader.importLibrary('maps').then(async () => {
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
    const { ColorScheme } = await google.maps.importLibrary('core')

    const map = new Map(mapRefs.value as HTMLElement, {
      center: location,
      zoom: 18,
      disableDefaultUI: true,
      mapId: '784f9fa87240c874',
      colorScheme: ColorScheme.DARK
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const marker = new AdvancedMarkerElement({
      map,
      position: location
    })
  })
})
</script>

<style lang="scss" scoped>
.section-container {
  @apply bg-system-background;
}

:deep(.gm-style-cc) {
  @apply hidden;
}
</style>
