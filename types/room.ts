// ========== EXISTING TYPES ==========

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

// ========== BACKEND DTO TYPES ==========

// Room Type DTOs
export interface RoomTypeDto {
  typeId: string
  typeName: string
  description: string
  basePrice: number
  maxOccupancy: number
  amenities?: string
  isActive: boolean
}

export interface RoomTypeResponse {
  id: string
  typeName: string
  description: string
  basePrice: string
  maxOccupancy: number
  furnitureRequirements?: FurnitureRequirementResponse[]
}

// Room Status DTOs
export interface RoomStatusDto {
  roomId: string
  roomNumber: string
  roomType: string
  status: string
  floor: number
  basePrice: number
  currentGuestName?: string
  currentGuestId?: string
  checkInTime?: string
  checkOutTime?: string
  lastCleaned?: string
  lastMaintenance?: string
  notes?: string
  isAvailable: boolean
  assignedStaff?: string
  statusUpdatedAt?: string
}

// Room Statistics DTOs
export interface RoomStatisticsDto {
  totalRooms: number
  availableRooms: number
  occupiedRooms: number
  maintenanceRooms: number
  cleaningRooms: number
  occupancyRatio: number
  averageRoomPrice: number
  totalRevenue: number
}

// Furniture DTOs
export interface FurnitureRequirementResponse {
  furniture: Furniture
  roomType: RoomTypeResponse
  requiredQuantity: number
}

export interface Furniture {
  id: string
  name: string
  price: string
}

// Maintenance DTOs
export interface RoomMaintenanceResponse {
  id: string
  roomId: string
  staffId: string
  scheduledDate: string
  startDate: string
  completionDate: string
  maintenanceTypeId: number
  maintenanceTypeName: string
  description: string
  maintenanceStatus: string
}

export interface MaintenanceTypeResponse {
  id: string
  name: string
}

// Request DTOs
export interface CreateRoomRequest {
  roomNumber: string
  roomTypeId: string
  floor: number
  basePrice: number
  description?: string
  amenities?: string
}

export interface UpdateRoomRequest {
  roomId?: string
  roomTypeId?: string
  floor?: number
  basePrice?: number
  description?: string
  amenities?: string
  status?: string
}

export interface CreateRoomTypeRequest {
  typeName: string
  description: string
  basePrice: string
  maxOccupancy: number
  furnitureRequirements?: FurnitureRequirementRequest[]
}

export interface FurnitureRequirementRequest {
  furnitureId: string
  roomTypeId: string
  quantity: number
}

// Search & Filter Types
export interface RoomSearchParams {
  roomNumber?: string
  roomType?: string
  status?: string
  floor?: number
  minPrice?: number
  maxPrice?: number
  page?: number
  size?: number
}

export interface AvailableRoomParams {
  roomType?: string
  floor?: number
  minPrice?: number
  maxPrice?: number
  page?: number
  size?: number
}

// ========== RECEPTION DTOs ==========

export interface CheckInDto {
  checkInId: string
  bookingId: string
  guestName: string
  guestPhone: string
  guestEmail: string
  roomNumber: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  checkInTime: string
  numberOfGuests: number
  specialRequests?: string
  status: string
  checkedInBy: string
  notes?: string
}

export interface CheckOutDto {
  checkOutId: string
  checkInId: string
  guestName: string
  guestPhone: string
  roomNumber: string
  checkInDate: string
  checkOutDate: string
  checkOutTime: string
  numberOfNights: number
  totalAmount: number
  additionalCharges: number
  paymentStatus: string
  status: string
  checkedOutBy: string
  notes?: string
}

export interface GuestDto {
  guestId: string
  fullName: string
  phone: string
  email: string
  idNumber?: string
  idType?: string
  nationality?: string
  address?: string
  dateOfBirth?: string
  gender?: string
  specialRequests?: string
  status: string
}

export interface ReceptionDashboardDto {
  availableRooms: number
  occupiedRooms: number
  todayCheckIns: number
  todayCheckOuts: number
  todayCheckInGuests: number
  todayCheckOutGuests: number
  pendingCheckIns: number
  pendingCheckOuts: number
  currentGuests: number
  occupancyRate: number
  pendingHousekeeping: number
  pendingMaintenance: number
}

export interface DailyOccupancyDto {
  date: string
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  occupancyRate: number
  checkIns: number
  checkOuts: number
  revenue: number
  averageRoomRate: number
}

export interface DailyReportDto {
  date: string
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  checkIns: number
  checkOuts: number
  occupancyRate: number
  revenue: number
  averageRoomRate: number
  totalGuests: number
  newGuests: number
  returningGuests: number
  pendingCheckIns: number
  pendingCheckOuts: number
  maintenanceRequests: number
  cleaningRequests: number
  notes: string[]
}

export interface HousekeepingRequestDto {
  requestId: string
  roomNumber: string
  requestType: string
  priority: string
  status: string
  description?: string
  notes?: string
  requestedBy: string
  assignedTo?: string
  requestedAt: string
  scheduledAt?: string
  startedAt?: string
  completedAt?: string
  isUrgent: boolean
  specialInstructions?: string
}

export interface MaintenanceRequestDto {
  requestId: string
  roomNumber: string
  issueType: string
  priority: string
  status: string
  description?: string
  notes?: string
  requestedBy: string
  assignedTo?: string
  requestedAt: string
  scheduledAt?: string
  startedAt?: string
  completedAt?: string
  estimatedCost: number
  actualCost?: number
  isUrgent: boolean
  specialInstructions?: string
}

export interface RoomServiceDto {
  serviceId: string
  roomNumber: string
  guestName: string
  serviceType: string
  serviceName: string
  description?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  status: string
  requestedAt: string
  completedAt?: string
  requestedBy: string
  completedBy?: string
  notes?: string
  specialInstructions?: string
}

export interface ServiceOrderDto {
  orderId: string
  roomNumber: string
  guestName: string
  guestPhone: string
  items: ServiceOrderItemDto[]
  subtotal: number
  tax: number
  totalAmount: number
  status: string
  orderTime: string
  expectedDeliveryTime?: string
  actualDeliveryTime?: string
  specialInstructions?: string
  paymentMethod?: string
  paymentStatus?: string
  orderedBy: string
  deliveredBy?: string
  notes?: string
}

export interface ServiceOrderItemDto {
  itemId: string
  serviceName: string
  description?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specialInstructions?: string
  status: string
  preparedBy?: string
  deliveredBy?: string
}

// Interface cho Room Type hiển thị trên frontend
export interface RoomTypeDisplay {
  id: string
  name: string
  description: string
  price: number
  maxOccupancy: number
  area: number
  image: string
  areaInfo: string
  bedInfo: string
  layoutInfo: string
  facilityInfo: string
  amenityInfo: string
  typeName: string
  basePrice: number
  discountPrice?: number
  isAvailable: boolean
  rating: number
  reviewCount: number
  tags: string[]
}