export const usePerformance = () => {
  // Monitor Core Web Vitals
  const monitorCoreWebVitals = () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        
        // Send to analytics if needed
        if (lastEntry.startTime > 2500) {
          console.warn('LCP is slow:', lastEntry.startTime)
        }
      })
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('LCP observer failed:', e)
      }
      
      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime)
          
          if (entry.processingStart - entry.startTime > 100) {
            console.warn('FID is slow:', entry.processingStart - entry.startTime)
          }
        })
      })
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('FID observer failed:', e)
      }
      
      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        const entries = list.getEntries()
        
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        
        console.log('CLS:', clsValue)
        
        if (clsValue > 0.1) {
          console.warn('CLS is poor:', clsValue)
        }
      })
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('CLS observer failed:', e)
      }
    }
  }
  
  // Monitor page load performance
  const monitorPageLoad = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          const paint = performance.getEntriesByType('paint')
          
          if (navigation) {
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.navigationStart)
            console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.navigationStart)
          }
          
          paint.forEach((entry) => {
            console.log(`${entry.name}:`, entry.startTime)
          })
        }, 0)
      })
    }
  }
  
  // Monitor API performance
  const monitorApiPerformance = () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
            console.log(`API Call to ${entry.name}:`, entry.duration)
            
            if (entry.duration > 3000) {
              console.warn('Slow API call:', entry.name, entry.duration)
            }
          }
        })
      })
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] })
      } catch (e) {
        console.warn('Resource observer failed:', e)
      }
    }
  }
  
  // Preload critical resources
  const preloadCriticalResources = () => {
    if (typeof window !== 'undefined') {
      // Preload critical images
      const criticalImages = [
        '/img/Hotel nikko.svg',
        '/img/bg.png'
      ]
      
      criticalImages.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })
      
      // Preload critical fonts
      const criticalFonts = [
        '/assets/fonts/NotoSerifTC-Bold.otf',
        '/assets/fonts/NotoSerifTC-Medium.otf'
      ]
      
      criticalFonts.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.href = src
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }
  }
  
  // Lazy load images
  const lazyLoadImages = () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove('lazy')
              imageObserver.unobserve(img)
            }
          }
        })
      })
      
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img)
      })
    }
  }
  
  // Initialize all performance monitoring
  const initPerformanceMonitoring = () => {
    monitorCoreWebVitals()
    monitorPageLoad()
    monitorApiPerformance()
    preloadCriticalResources()
    
    // Lazy load images after page load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(lazyLoadImages, 100)
      })
    }
  }
  
  return {
    monitorCoreWebVitals,
    monitorPageLoad,
    monitorApiPerformance,
    preloadCriticalResources,
    lazyLoadImages,
    initPerformanceMonitoring
  }
}
