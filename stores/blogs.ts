// data/blogs.ts
export type Blog = {
  id: string
  title: string
  summary: string
  content: string
  image: string
  category: string
  createdAt: string
}

export const blogList: Blog[] = [
  {
    id: '1',
    title: 'Hướng dẫn Nuxt 3 từ A đến Z',
    summary: 'Tìm hiểu toàn diện về Nuxt 3...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Nuxt',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Sử dụng Pinia hiệu quả',
    summary: 'Hướng dẫn sử dụng Pinia...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Vue',
    createdAt: '2024-02-15'
  },
  {
    id: '3',
    title: 'Triển khai website lên Vercel',
    summary: 'Cách deploy dễ dàng với Vercel...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Deploy',
    createdAt: '2024-03-05'
  },
    {
    id: '4',
    title: 'Triển khai website lên Vercel',
    summary: 'Cách deploy dễ dàng với Vercel...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Deploy',
    createdAt: '2024-03-05'
  },
    {
    id: '5',
    title: 'Triển khai website lên Vercel',
    summary: 'Cách deploy dễ dàng với Vercel...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Deploy',
    createdAt: '2024-03-05'
  },
    {
    id: '6',
    title: 'Triển khai website lên Vercel',
    summary: 'Cách deploy dễ dàng với Vercel...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Deploy',
    createdAt: '2024-03-05'
  },
    {
    id: '7',
    title: 'Triển khai website lên Vercel',
    summary: 'Cách deploy dễ dàng với Vercel...',
    content: 'Nội dung chi tiết của bài viết...',
    image: "https://picsum.photos/600/400?random=1",
    category: 'Deploy',
    createdAt: '2024-03-05'
  },
]
