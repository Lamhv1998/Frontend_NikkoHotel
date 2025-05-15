import type { SweetAlertOptions } from 'sweetalert2'

export const useCommonStore = defineStore(
  'common',
  () => {
    const isMobile = ref(true)
    const isClient = ref(false)
    const sweetalertList = ref<SweetAlertOptions[]>([])
    const routerGuide = ref('')

    return {
      isMobile,
      isClient,
      sweetalertList,
      routerGuide
    }
  },
  {
    persist: true
  }
)
