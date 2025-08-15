<template>
  <AppLoading />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UIScrollTop />
  <AIChatButton />
</template>

<script lang="ts" setup>
import AppLoading from './components/global/AppLoading.vue'
import AIChatButton from './components/UI/AIChatButton.vue'
import { useLoadingStore } from './stores/loading'

/* Thuộc tính toàn cục */
const commonStore = useCommonStore()
const { $Swal } = useNuxtApp()
const loadingStore = useLoadingStore()

/* Lưu thuộc tính toàn cục */
const { width } = useWindowSize()
onMounted(() => {
  watch(
    width,
    () => {
      // Xác định: Có phải thiết bị di động không
      commonStore.isMobile = width.value <= 1200
    },
    {
      immediate: true
    }
  )
  // Xác định: Có phải phía client không
  commonStore.isClient = true
})

/* Chuyển trang về đầu trang */
const { y } = useWindowScroll()
const route = useRoute()
watch(
  () => route.name,
  () => {
    y.value = 0
  }
)

/* Theo dõi thông báo lỗi */
onMounted(() => {
  const showSweetAlert = () => {
    if (commonStore.sweetalertList.length > 0) {
      $Swal?.fire(commonStore.sweetalertList[0]).then(() => {
        commonStore.sweetalertList.shift()
        showSweetAlert()
      })
    }
  }

  watchEffect(() => {
    if (commonStore.sweetalertList.length > 0) {
      showSweetAlert()
    }
  })
})

/* Tối ưu loading system */
const isNavigating = ref(false)
watch(
  () => route.fullPath,
  async (newRoute, oldRoute) => {
    // Chỉ loading khi thực sự chuyển route
    if (newRoute !== oldRoute && !isNavigating.value) {
      isNavigating.value = true
      loadingStore.startLoading()
      
      try {
        // Chờ route transition hoàn tất
        await nextTick()
        
        // Loading ngắn hơn để UX tốt hơn
        setTimeout(() => {
          loadingStore.stopLoading()
          isNavigating.value = false
        }, 300) // Giảm từ 1000ms xuống 300ms
      } catch (error) {
        // Silent error handling for route transitions
        loadingStore.stopLoading()
        isNavigating.value = false
      }
    }
  }
)
</script>
