import dayjs from 'dayjs'
import zhTw from 'dayjs/locale/zh-tw'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default defineNuxtPlugin((_nuxtApp) => {
  dayjs.locale(zhTw)
  dayjs.extend(customParseFormat)

  return {
    provide: {
      dayjs
    }
  }
})
