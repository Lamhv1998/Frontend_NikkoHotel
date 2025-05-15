export type InfoDetail = {
  title: string
  isProvide: boolean
}

export type RoomResponse = {
  _id: string
  name: string
  description: string
  imageUrl: string
  imageUrlList: string[]
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  status: number
  layoutInfo: InfoDetail[]
  facilityInfo: InfoDetail[]
  amenityInfo: InfoDetail[]
  createdAt: string
  updatedAt: string
}
