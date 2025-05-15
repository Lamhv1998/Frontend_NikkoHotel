import { gsap } from 'gsap/dist/gsap'

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      gsap
    }
  }
})
