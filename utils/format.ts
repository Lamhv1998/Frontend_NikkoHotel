import { Dayjs } from 'dayjs'

export function useFormatCurrency(amount: number) {
  return `NT$ ${amount.toLocaleString('zh-TW')}`
}

export function useFormatData(val: Date | string | Dayjs) {
  const { $dayjs } = useNuxtApp()
  return $dayjs(val).format('YYYY/MM/DD')
}
