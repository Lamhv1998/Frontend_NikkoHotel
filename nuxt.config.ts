// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  typescript: {
    typeCheck: false
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-swiper'
  ],

  css: ['@/assets/scss/main.scss'],

  vite: {
    vue: {
      script: {
        defineModel: true
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/_variable.scss";'
        }
      }
    }
  },

  build: {
    transpile: ['@googlemaps/js-api-loader']
  },

  app: {
    head: {
      title: 'Nikko Hotel', // Tiêu đề website
      htmlAttrs: {
        lang: 'vi' // Thiết lập ngôn ngữ
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }], // Biểu tượng website

      meta: [
        { charset: 'utf-8' }, // Mã hóa ký tự
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }, // Thiết kế responsive
        {
          name: 'description',
          content:
            'Đây là website đặt phòng khách sạn sang trọng Nikko Hotel, cung cấp nhiều lựa chọn phòng độc đáo.'
        }, // Mô tả website
        {
          name: 'keywords',
          content: 'Nikko Hotel, đặt phòng khách sạn, khách sạn sang trọng, loại phòng'
        }, // Từ khóa
        { name: 'author', content: 'Lâm' }, // Tác giả
        { name: 'robots', content: 'index, follow' }, // Chỉ mục tìm kiếm
        { property: 'og:title', content: 'Nikko Hotel' }, // Tiêu đề Open Graph
        {
          property: 'og:description',
          content:
            'Đây là website đặt phòng khách sạn sang trọng Nikko Hotel, cung cấp nhiều lựa chọn phòng độc đáo.'
        }, // Mô tả Open Graph
        { property: 'og:image', content: 'URL ảnh đại diện website của bạn' }, // Ảnh Open Graph
        { property: 'og:url', content: '' }, // Đường dẫn Open Graph
        { property: 'og:type', content: 'website' } // Loại Open Graph
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      mapApiKey: process.env.MAP_API_KEY
    }
  },

  i18n: {
    langDir: 'locales',
    locales: [{ code: 'vi', file: 'vi.json', iso: 'vi-VN', name: 'Tiếng Việt' }],
    lazy: true,
    defaultLocale: 'vi',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.js'
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VForm',
      Field: 'VField',
      FieldArray: 'VFieldArray',
      ErrorMessage: 'VErrorMessage'
    }
  },

  image: {
    domains: ['i.imgur.com'],
    alias: {
      imgur: 'https://i.imgur.com'
    },
    screens: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      '2xl': 1400
    }
  }
})
