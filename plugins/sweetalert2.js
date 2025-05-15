import Swal from 'sweetalert2'

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      Swal
    }
  }
})
