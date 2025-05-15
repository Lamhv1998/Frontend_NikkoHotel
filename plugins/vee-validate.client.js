import { localize, setLocale } from '@vee-validate/i18n'
import vi from '@vee-validate/i18n/dist/locale/vi.json'
import * as allRules from '@vee-validate/rules'
import { configure, defineRule } from 'vee-validate'

// Bắt buộc định nghĩa, dùng để đóng gói plugin
export default defineNuxtPlugin((_nuxtApp) => {
  // Lặp qua và thêm từng rule
  Object.keys(allRules)
    .filter((k) => k !== 'default')
    .forEach((rule) => {
      // eslint-disable-next-line import/namespace
      defineRule(rule, allRules[rule])
    })

  // Cấu hình thông báo
  configure({
    generateMessage: localize({ vi })
  })

  setLocale('vi')
})
