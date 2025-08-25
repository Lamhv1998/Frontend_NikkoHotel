# 🐳 Frontend Nikko Hotel - Docker Setup

## 📋 Tổng quan

Project Frontend Nikko Hotel đã được cấu hình để chạy trên Docker với port **3001**.

## 🚀 Cách sử dụng

### **1. Build Docker Image**

```bash
# Sử dụng script build
./build-docker.sh

# Hoặc build trực tiếp
docker build -t frontend-nikko-hotel:latest .
```

### **2. Chạy với Docker Compose (Khuyến nghị)**

```bash
# Tạo file .env từ template
cp env.example .env

# Chỉnh sửa file .env với giá trị thực tế
# MAP_API_KEY=your_actual_key
# PAYOS_CLIENT_ID=your_actual_id
# ...

# Chạy container
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng container
docker-compose down
```

### **3. Chạy với Docker trực tiếp**

```bash
# Chạy container
docker run -d \
  --name frontend-nikko-hotel \
  -p 3001:3001 \
  -e PORT=3001 \
  -e NODE_ENV=production \
  frontend-nikko-hotel:latest

# Xem logs
docker logs -f frontend-nikko-hotel

# Dừng container
docker stop frontend-nikko-hotel
docker rm frontend-nikko-hotel
```

## 🌐 Truy cập ứng dụng

- **URL**: http://localhost:3001
- **Port**: 3001
- **Environment**: Production

## ⚙️ Cấu hình môi trường

### **File `.env`**

```bash
# API Configuration
NUXT_PUBLIC_API_BASE=https://api.nika.id.vn/api
API_GATEWAY_URL=https://api.nika.id.vn
AUTH_SERVICE_URL=https://api.nika.id.vn
USER_SERVICE_URL=https://api.nika.id.vn
CUSTOMER_SERVICE_URL=https://api.nika.id.vn
ROOM_SERVICE_URL=https://api.nika.id.vn
BOOKING_SERVICE_URL=https://api.nika.id.vn
NOTIFICATION_SERVICE_URL=https://api.nika.id.vn

# External Services
MAP_API_KEY=your_google_maps_api_key
PAYOS_CLIENT_ID=your_payos_client_id
PAYOS_API_KEY=your_payos_api_key
PAYOS_CHECKSUM_KEY=your_payos_checksum_key

# Environment
NODE_ENV=production
```

## 🔧 Docker Commands

### **Build Image**
```bash
# Build với tag cụ thể
./build-docker.sh -t v1.0.0

# Build với tên khác
./build-docker.sh -n myapp -t latest

# Build và push lên registry
./build-docker.sh -p -r myregistry.com
```

### **Container Management**
```bash
# Xem danh sách containers
docker ps -a

# Xem logs
docker logs frontend-nikko-hotel

# Restart container
docker restart frontend-nikko-hotel

# Xem thông tin container
docker inspect frontend-nikko-hotel
```

### **Image Management**
```bash
# Xem danh sách images
docker images

# Xóa image
docker rmi frontend-nikko-hotel:latest

# Xóa tất cả images không sử dụng
docker image prune -a
```

## 📊 Health Check

Container có health check tự động:
- **Interval**: 30 giây
- **Timeout**: 3 giây
- **Retries**: 3 lần
- **Start period**: 40 giây

## 🐛 Troubleshooting

### **Port đã được sử dụng**
```bash
# Kiểm tra port nào đang sử dụng
sudo netstat -tulpn | grep :3001

# Kill process sử dụng port
sudo kill -9 <PID>
```

### **Container không start**
```bash
# Xem logs
docker logs frontend-nikko-hotel

# Kiểm tra status
docker ps -a

# Restart container
docker restart frontend-nikko-hotel
```

### **Build failed**
```bash
# Xóa cache
docker builder prune

# Build lại
docker build --no-cache -t frontend-nikko-hotel:latest .
```

## 📁 File Structure

```
Frontend_NikkoHotel/
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── .dockerignore          # Docker ignore rules
├── build-docker.sh        # Build script
├── env.example            # Environment template
└── README_DOCKER.md       # This file
```

## 🔒 Security

- **User**: `nuxt` (non-root)
- **Port**: 3001 (internal)
- **Health Check**: Enabled
- **Signal Handling**: dumb-init

## 📈 Performance

- **Multi-stage build**: Giảm image size
- **Alpine Linux**: Base image nhẹ
- **Production target**: Chỉ copy files cần thiết
- **Cache optimization**: npm ci và layer caching

## 🚀 Deployment

### **Production**
```bash
# Build production image
./build-docker.sh -t production

# Deploy với docker-compose
docker-compose -f docker-compose.yml up -d
```

### **Development**
```bash
# Build development image
docker build --target build .

# Chạy development server
docker run -p 3001:3001 -e NODE_ENV=development frontend-nikko-hotel:dev
```

## 📞 Support

Nếu gặp vấn đề, hãy kiểm tra:
1. Docker logs
2. Environment variables
3. Port availability
4. Network connectivity
