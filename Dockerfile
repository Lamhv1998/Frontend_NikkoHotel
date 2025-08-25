# ========================================
# FRONTEND NIKKO HOTEL - DOCKERFILE
# ========================================

# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Copy lockfile trước để tối ưu cache
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build Nuxt app
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production

# Cài đặt dumb-init để xử lý tín hiệu
RUN apk add --no-cache dumb-init

# Tạo user không phải root
RUN addgroup -g 1001 -S nodejs && adduser -S nuxt -u 1001

WORKDIR /app

# Copy output đã build từ build stage
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output
COPY --from=build --chown=nuxt:nodejs /app/package.json ./package.json

# Chuyển sang user nuxt
USER nuxt

# Mở port 3001
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Sử dụng dumb-init để xử lý tín hiệu
ENTRYPOINT ["dumb-init", "--"]

# Khởi động ứng dụng với port 3001
CMD ["node", ".output/server/index.mjs"]
