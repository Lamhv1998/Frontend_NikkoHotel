import '@/assets/css/v-calendar.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin((_nuxtApp) => {
  _nuxtApp.vueApp.use(VCalendar, {})
})
