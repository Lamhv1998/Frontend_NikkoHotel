// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
    },
    // Tối ưu build performance
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            ui: ['@nuxt/image', 'nuxt-icon', 'nuxt-swiper'],
            utils: ['@vueuse/core', 'dayjs', 'axios']
          }
        }
      }
    },
    // Tối ưu development
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core']
    }
  },

  build: {
    transpile: ['@googlemaps/js-api-loader']
  },

  // Tối ưu performance
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    treeshakeClientOnly: true
  },

  // Tối ưu nitro
  nitro: {
    compressPublicAssets: true,
    minify: true,
    // Tối ưu caching
    storage: {
      redis: {
        driver: 'memory'
      }
    }
  },

  app: {
    head: {
      title: 'Nikko Hotel', // Tiêu đề website
      htmlAttrs: {
        lang: 'vi' // Thiết lập ngôn ngữ
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }], // Biểu tượng website
      script: [
        {
          src: 'https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js',
          async: true,
          defer: true
        } // Thêm script PayOS
      ],
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
      // API Gateway
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api',
      apiGatewayUrl: process.env.API_GATEWAY_URL || 'http://localhost:8080',
      apiGatewayTimeout: parseInt(process.env.API_GATEWAY_TIMEOUT || '30000'),
      
      // Authentication & User Services
      authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:8081',
      authServiceTimeout: parseInt(process.env.AUTH_SERVICE_TIMEOUT || '15000'),
      userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:8082',
      userServiceTimeout: parseInt(process.env.USER_SERVICE_TIMEOUT || '15000'),
      
      // Core Business Services
      roomServiceUrl: process.env.ROOM_SERVICE_URL || 'http://localhost:8083',
      roomServiceTimeout: parseInt(process.env.ROOM_SERVICE_TIMEOUT || '20000'),
      bookingServiceUrl: process.env.BOOKING_SERVICE_URL || 'http://localhost:8084',
      bookingServiceTimeout: parseInt(process.env.BOOKING_SERVICE_TIMEOUT || '25000'),
      paymentServiceUrl: process.env.PAYMENT_SERVICE_URL || 'http://localhost:8085',
      paymentServiceTimeout: parseInt(process.env.PAYMENT_SERVICE_TIMEOUT || '30000'),
      
      // Supporting Services
      notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8086',
      notificationServiceTimeout: parseInt(process.env.NOTIFICATION_SERVICE_TIMEOUT || '10000'),
      fileServiceUrl: process.env.FILE_SERVICE_URL || 'http://localhost:8087',
      fileServiceTimeout: parseInt(process.env.FILE_SERVICE_TIMEOUT || '20000'),
      emailServiceUrl: process.env.EMAIL_SERVICE_URL || 'http://localhost:8088',
      emailServiceTimeout: parseInt(process.env.EMAIL_SERVICE_TIMEOUT || '15000'),
      
      // Analytics & Reporting
      analyticsServiceUrl: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:8089',
      analyticsServiceTimeout: parseInt(process.env.ANALYTICS_SERVICE_TIMEOUT || '30000'),
      reportServiceUrl: process.env.REPORT_SERVICE_URL || 'http://localhost:8090',
      reportServiceTimeout: parseInt(process.env.REPORT_SERVICE_TIMEOUT || '25000'),
      
      // Integration Services
      integrationServiceUrl: process.env.INTEGRATION_SERVICE_URL || 'http://localhost:8091',
      integrationServiceTimeout: parseInt(process.env.INTEGRATION_SERVICE_TIMEOUT || '20000'),
      workflowServiceUrl: process.env.WORKFLOW_SERVICE_URL || 'http://localhost:8092',
      workflowServiceTimeout: parseInt(process.env.WORKFLOW_SERVICE_TIMEOUT || '25000'),
      
      // WebSocket & Real-time
      wsUrl: process.env.NUXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws',
      
      // External Services
      mapApiKey: process.env.GOOGLE_MAPS_API_KEY,
      payosClientId: process.env.PAYOS_CLIENT_ID,
      payosApiKey: process.env.PAYOS_API_KEY,
      payosChecksumKey: process.env.PAYOS_CHECKSUM_KEY,
      
      // App Configuration
      appEnv: process.env.NUXT_PUBLIC_APP_ENV || 'development',
      appVersion: process.env.npm_package_version || '1.0.0'
    },
    
    // Private server-side configs
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    rateLimitWindow: process.env.RATE_LIMIT_WINDOW || '15m'
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'vi', file: 'vi.json', iso: 'vi-VN', name: 'Tiếng Việt' },
      { code: 'en', file: 'en.json', iso: 'en-US', name: 'English' }
    ],
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
    },
    // Tối ưu image loading
    format: ['webp', 'avif', 'jpg', 'png'],
    quality: 80,
    loading: 'lazy'
  }
})
