import { ref, onMounted } from 'vue'

export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  image: string
  category: string
  createdAt: string
  source: string
  link: string
}

export const useNewsApi = () => {
  const newsItems = ref<NewsItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // RSS Feed URLs từ các báo Việt Nam
  const rssFeeds = [
    {
      name: 'Tuổi Trẻ',
      url: 'https://tuoitre.vn/rss/du-lich.rss',
      category: 'Du lịch'
    },
    {
      name: 'Thanh Niên',
      url: 'https://thanhnien.vn/rss/du-lich.rss',
      category: 'Du lịch'
    },
    {
      name: 'VnExpress',
      url: 'https://vnexpress.net/rss/du-lich.rss',
      category: 'Du lịch'
    }
  ]

  // Hàm decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
  }

  // Hàm chuyển đổi RSS XML thành JSON
  const parseRSS = (xmlText: string, source: string): NewsItem[] => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    const items = xmlDoc.querySelectorAll('item')
    
    return Array.from(items).map((item, index) => {
      let title = item.querySelector('title')?.textContent || ''
      let description = item.querySelector('description')?.textContent || ''
      const link = item.querySelector('link')?.textContent || ''
      const pubDate = item.querySelector('pubDate')?.textContent || ''
      
      // Decode HTML entities để sửa lỗi ký tự tiếng Việt
      title = decodeHtmlEntities(title)
      description = decodeHtmlEntities(description)
      
      // Lọc tin tức liên quan đến khách sạn, du lịch, ẩm thực
      const relevantKeywords = ['khách sạn', 'du lịch', 'ẩm thực', 'nghỉ dưỡng', 'spa', 'resort', 'hotel', 'travel', 'food']
      const isRelevant = relevantKeywords.some(keyword => 
        title.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword)
      )

      if (!isRelevant) return null

      return {
        id: `${source}-${Date.now()}-${index}`,
        title: title,
        summary: description.length > 150 ? description.substring(0, 150) + '...' : description,
        content: description,
        image: '/img/bg.png', // Hình ảnh mặc định
        category: 'Tin tức',
        createdAt: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        source: source,
        link: link
      }
    }).filter(item => item !== null) as NewsItem[]
  }

  // Hàm lấy tin tức từ RSS feeds
  const fetchNews = async () => {
    loading.value = true
    error.value = null
    
    try {
      const allNews: NewsItem[] = []
      
      for (const feed of rssFeeds) {
        try {
          // Sử dụng CORS proxy để tránh vấn đề CORS
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`
          const response = await fetch(proxyUrl)
          const data = await response.json()
          
          if (data.contents) {
            const newsFromFeed = parseRSS(data.contents, feed.name)
            allNews.push(...newsFromFeed)
          }
        } catch (feedError) {
          //.warn(`Không thể lấy tin từ ${feed.name}:`, feedError)
        }
      }
      
      // Sắp xếp theo ngày mới nhất
      allNews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      
      // Giới hạn 10 tin mới nhất
      newsItems.value = allNews.slice(0, 10)
      
    } catch (err) {
      error.value = 'Không thể lấy tin tức từ RSS feeds'
      //.error('Lỗi khi lấy tin tức:', err)
    } finally {
      loading.value = false
    }
  }

  // Hàm lấy tin tức theo chủ đề
  const getNewsByCategory = (category: string) => {
    return newsItems.value.filter(item => 
      item.category.toLowerCase().includes(category.toLowerCase()) ||
      item.title.toLowerCase().includes(category.toLowerCase())
    )
  }

  // Hàm tìm kiếm tin tức
  const searchNews = (keyword: string) => {
    if (!keyword.trim()) return newsItems.value
    
    return newsItems.value.filter(item =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      item.summary.toLowerCase().includes(keyword.toLowerCase()) ||
      item.content.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  // Tự động cập nhật tin tức mỗi 1 phút
  const startAutoUpdate = () => {
    const interval = setInterval(fetchNews, 5 * 60 * 1000) // 5 phút
    
    // Cleanup function
    return () => clearInterval(interval)
  }

  onMounted(() => {
    fetchNews()
  })

  return {
    newsItems,
    loading,
    error,
    fetchNews,
    getNewsByCategory,
    searchNews,
    startAutoUpdate
  }
}
