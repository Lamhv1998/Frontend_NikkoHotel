# Chọn image Node.js làm nền tảng
FROM node:20

# Thiết lập thư mục làm việc, WORKDIR là lệnh Dockerfile dùng để chỉ định thư mục lưu trữ mã nguồn ứng dụng bên trong container.
WORKDIR /app

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các phụ thuộc theo đúng phiên bản
RUN npm install

# Build phiên bản production
RUN npm run build

# Mở cổng ứng dụng
EXPOSE 3000

# Khởi động ứng dụng của bạn
# Lệnh CMD dùng để chỉ định lệnh sẽ chạy khi container khởi động. Mỗi Dockerfile chỉ nên có một lệnh CMD.
# Tóm lại, RUN được thực thi khi build image, còn CMD được thực thi khi container khởi động.
CMD ["npm","start"]
