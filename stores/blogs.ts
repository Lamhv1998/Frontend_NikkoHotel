// data/blogs.ts
import { useNewsApi } from '~/composables/useNewsApi'

export type Blog = {
  id: string
  title: string
  summary: string
  content: string
  image: string
  category: string
  createdAt: string
  source?: string
  link?: string
}

// Blog tĩnh về khách sạn Nika
export const staticBlogList: Blog[] = [
  {
    id: '1',
    title: 'Khách sạn Nika - Điểm đến lý tưởng cho du lịch Việt Nam',
    summary: 'Khám phá vẻ đẹp và dịch vụ đẳng cấp của khách sạn Nika, nơi hội tụ giữa văn hóa truyền thống và tiện nghi hiện đại...',
    content: 'Khách sạn Nika tự hào là một trong những địa điểm lưu trú hàng đầu tại Việt Nam, nơi mang đến trải nghiệm nghỉ dưỡng hoàn hảo cho du khách trong và ngoài nước. Với thiết kế kiến trúc độc đáo kết hợp giữa phong cách Á Đông và hiện đại, khách sạn Nika không chỉ là nơi nghỉ ngơi mà còn là điểm đến văn hóa đặc sắc. Từ phòng nghỉ sang trọng đến nhà hàng phục vụ ẩm thực Việt Nam truyền thống, mỗi chi tiết đều được chăm chút tỉ mỉ để mang đến sự hài lòng tuyệt đối cho khách hàng.',
    image: '/img/hotel-nha.png',
    category: 'Khách sạn',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Top 10 khách sạn 5 sao tại Hà Nội năm 2024',
    summary: 'Danh sách những khách sạn cao cấp nhất tại thủ đô Hà Nội, nơi hội tụ của văn hóa, lịch sử và tiện nghi hiện đại...',
    content: 'Hà Nội - thủ đô nghìn năm văn hiến không chỉ nổi tiếng với những di tích lịch sử, văn hóa mà còn là điểm đến của những khách sạn 5 sao đẳng cấp quốc tế. Từ Sofitel Legend Metropole Hanoi với kiến trúc Pháp cổ điển, đến InterContinental Hanoi Westlake với view hồ Tây tuyệt đẹp, mỗi khách sạn đều mang đến trải nghiệm độc đáo riêng. Khách sạn Nika cũng góp mặt trong danh sách này với dịch vụ chăm sóc khách hàng chu đáo và không gian nghỉ dưỡng thoải mái.',
    image: '/img/ht.jpg',
    category: 'Du lịch',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Ẩm thực khách sạn Nika - Hương vị Việt Nam đích thực',
    summary: 'Khám phá menu đặc biệt của nhà hàng khách sạn Nika với những món ăn truyền thống được chế biến công phu...',
    content: 'Nhà hàng tại khách sạn Nika tự hào mang đến những món ăn Việt Nam chính gốc, từ phở Hà Nội, bún chả, đến những món ăn cung đình Huế. Đầu bếp tại đây đều là những nghệ nhân ẩm thực có kinh nghiệm lâu năm, am hiểu sâu sắc về văn hóa ẩm thực Việt Nam. Mỗi món ăn không chỉ ngon miệng mà còn là một tác phẩm nghệ thuật, thể hiện sự tinh tế và cầu kỳ trong cách chế biến.',
    image: '/img/nha-hang.png',
    category: 'Ẩm thực',
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    title: 'Dịch vụ spa và wellness tại khách sạn Nika',
    summary: 'Trải nghiệm dịch vụ spa cao cấp với các liệu pháp truyền thống Việt Nam kết hợp công nghệ hiện đại...',
    content: 'Khách sạn Nika cung cấp dịch vụ spa và wellness đẳng cấp quốc tế, nơi khách hàng có thể thư giãn hoàn toàn sau những giờ làm việc căng thẳng. Với các liệu pháp massage truyền thống Việt Nam như massage đá nóng, massage thảo dược, cùng với các dịch vụ hiện đại như liệu pháp hương thơm và yoga, khách sạn Nika cam kết mang đến trải nghiệm thư giãn hoàn hảo nhất.',
    image: '/img/spa.png',
    category: 'Spa & Wellness',
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    title: 'Xu hướng khách sạn bền vững tại Việt Nam năm 2024',
    summary: 'Khám phá những khách sạn tiên phong trong việc áp dụng mô hình kinh doanh bền vững và thân thiện môi trường...',
    content: 'Trong bối cảnh biến đổi khí hậu toàn cầu, ngành du lịch Việt Nam đang chuyển mình mạnh mẽ theo hướng bền vững. Nhiều khách sạn đã áp dụng các giải pháp tiết kiệm năng lượng, sử dụng năng lượng tái tạo, và giảm thiểu rác thải nhựa. Khách sạn Nika cũng đang trong quá trình chuyển đổi để trở thành khách sạn xanh, góp phần bảo vệ môi trường và phát triển du lịch bền vững.',
    image: '/img/bg.png',
    category: 'Bền vững',
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    title: 'Lễ hội và sự kiện đặc biệt tại khách sạn Nika',
    summary: 'Khám phá những sự kiện độc đáo và lễ hội truyền thống được tổ chức tại khách sạn Nika quanh năm...',
    content: 'Khách sạn Nika không chỉ là nơi lưu trú mà còn là trung tâm văn hóa, nơi diễn ra nhiều sự kiện đặc biệt quanh năm. Từ lễ hội Tết Nguyên Đán với không khí sum vầy gia đình, đến các buổi biểu diễn nghệ thuật truyền thống Việt Nam, mỗi sự kiện đều mang đến trải nghiệm văn hóa độc đáo cho khách hàng. Khách sạn cũng thường xuyên tổ chức các workshop nấu ăn, làm bánh truyền thống để khách hàng có thể trải nghiệm văn hóa Việt Nam một cách trực tiếp.',
    image: '/img/khuyenmai.png',
    category: 'Sự kiện',
    createdAt: '2024-02-25'
  },
  {
    id: '7',
    title: 'Đánh giá từ khách hàng về trải nghiệm tại khách sạn Nika',
    summary: 'Những phản hồi chân thực từ khách hàng đã từng lưu trú tại khách sạn Nika và lý do họ quay trở lại...',
    content: 'Khách sạn Nika nhận được vô số đánh giá tích cực từ khách hàng trong và ngoài nước. Nhiều khách hàng đánh giá cao sự nhiệt tình và chu đáo của nhân viên, chất lượng phòng nghỉ sạch sẽ, và dịch vụ ăn uống tuyệt vời. Đặc biệt, khách hàng quốc tế rất ấn tượng với văn hóa Việt Nam được thể hiện qua kiến trúc, trang trí nội thất và ẩm thực. Tỷ lệ khách hàng quay trở lại lên đến 85%, chứng minh chất lượng dịch vụ vượt trội của khách sạn.',
    image: '/img/LogoNika.png',
    category: 'Đánh giá',
    createdAt: '2024-03-01'
  }
]

// Composable để lấy tin tức từ RSS feeds
export const useBlogs = () => {
  const { newsItems, loading, error, fetchNews, getNewsByCategory, searchNews, startAutoUpdate } = useNewsApi()
  
  // Kết hợp blog tĩnh với tin tức mới
  const getAllBlogs = () => {
    const staticBlogs = staticBlogList.map(blog => ({
      ...blog,
      source: 'Khách sạn Nika',
      link: '#'
    }))
    
    const newsBlogs = newsItems.value.map(news => ({
      id: news.id,
      title: news.title,
      summary: news.summary,
      content: news.content,
      image: news.image,
      category: news.category,
      createdAt: news.createdAt,
      source: news.source,
      link: news.link
    }))
    
    // Sắp xếp theo ngày mới nhất
    return [...staticBlogs, ...newsBlogs].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
  
  // Lấy blog theo chủ đề
  const getBlogsByCategory = (category: string) => {
    return getAllBlogs().filter(blog => 
      blog.category.toLowerCase().includes(category.toLowerCase()) ||
      blog.title.toLowerCase().includes(category.toLowerCase())
    )
  }
  
  // Tìm kiếm blog
  const searchBlogs = (keyword: string) => {
    if (!keyword.trim()) return getAllBlogs()
    
    return getAllBlogs().filter(blog =>
      blog.title.toLowerCase().includes(keyword.toLowerCase()) ||
      blog.summary.toLowerCase().includes(keyword.toLowerCase()) ||
      blog.content.toLowerCase().includes(keyword.toLowerCase())
    )
  }
  
  // Lấy blog tĩnh (chỉ về khách sạn Nika)
  const getStaticBlogs = () => staticBlogList
  
  // Lấy tin tức mới từ RSS
  const getNewsBlogs = () => newsItems.value
  
  return {
    // Blog tĩnh
    staticBlogList,
    getStaticBlogs,
    
    // Tin tức từ RSS
    newsItems,
    getNewsBlogs,
    
    // Kết hợp
    getAllBlogs,
    getBlogsByCategory,
    searchBlogs,
    
    // Trạng thái và chức năng
    loading,
    error,
    fetchNews,
    startAutoUpdate
  }
}

// Export để tương thích với code cũ
export const blogList = staticBlogList
