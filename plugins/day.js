import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default defineNuxtPlugin((_nuxtApp) => {
  dayjs.locale('vi')
  dayjs.extend(customParseFormat)

  return {
    provide: {
      dayjs
    }
  }
})
