import dayjs from 'dayjs'
// import zhTw from 'dayjs/locale/zh-tw'
import vi from 'dayjs/locale/vi'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default defineNuxtPlugin((_nuxtApp) => {
  dayjs.locale(vi)
  dayjs.extend(customParseFormat)

  return {
    provide: {
      dayjs
    }
  }
})
