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

  // Cấu hình thông báo mặc định
  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: 'Trường này là bắt buộc',
        email: 'Email không hợp lệ',
        min: `Trường này phải có ít nhất ${ctx.rule.params} ký tự`,
        max: `Trường này không được vượt quá ${ctx.rule.params} ký tự`,
        numeric: 'Trường này phải là số',
        alpha: 'Trường này chỉ được chứa chữ cái',
        alpha_num: 'Trường này chỉ được chứa chữ cái và số',
        confirmed: 'Giá trị không khớp',
        url: 'URL không hợp lệ',
        phone: 'Số điện thoại không hợp lệ'
      }
      
      return messages[ctx.rule.name] || 'Giá trị không hợp lệ'
    }
  })
})
