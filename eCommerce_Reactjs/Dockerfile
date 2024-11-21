# Dockerfile cho eCommerce_ReactJs
# Sử dụng Node.js 14.17.2 cho build
FROM node:14.17.2 as build

# Thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY eCommerce_Reactjs/package*.json ./
# Thêm lệnh xóa cache của npm trước khi cài đặt
RUN npm cache clean --force && npm install --no-audit --no-fund

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn vào container
COPY . .
# Build ứng dụng
RUN npm run build

# Sử dụng Nginx để phục vụ ứng dụng đã build
FROM nginx:latest

# Sao chép từ build stage sang thư mục phục vụ của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở port 80 cho Nginx
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
