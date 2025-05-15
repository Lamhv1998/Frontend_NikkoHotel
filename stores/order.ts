import type { OrderPayload } from '@/types'

const initialOrder: OrderPayload = {
  roomId: '',
  checkInDate: '',
  checkOutDate: '',
  peopleNum: 1,
  userInfo: {
    address: {
      zipcode: 0,
      detail: ''
    },
    name: '',
    phone: '',
    email: ''
  }
}

export const useOrderStore = defineStore(
  'order',
  () => {
    /* 全局屬性 */
    const { $dayjs } = useNuxtApp()

    const order = ref<OrderPayload>({
      ...initialOrder
    })

    const resetOrder = () => {
      order.value = { ...initialOrder }
    }

    // 是否已選擇日期
    const isConfirmedDate = computed(() => {
      const { checkInDate, checkOutDate } = order.value
      return checkInDate !== '' && checkOutDate !== ''
    })

    const totalNights = computed(() => {
      const { checkInDate, checkOutDate } = order.value
      return isConfirmedDate.value ? $dayjs(checkOutDate).diff(checkInDate, 'day') : 0
    })

    const dateRange = computed(() => {
      const { checkInDate, checkOutDate } = order.value
      return isConfirmedDate.value ? `${checkInDate} - ${checkOutDate}` : ''
    })

    return {
      order,
      isConfirmedDate,
      resetOrder,
      totalNights,
      dateRange
    }
  },
  {
    persist: {
      storage: persistedState.sessionStorage
    }
  }
)
