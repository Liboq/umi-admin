# 使用 Node.js 官方镜像作为基础
FROM node:latest as builder

# 设置工作目录
WORKDIR /hotel-admin

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装依赖项
RUN npm install -g pnpm
RUN pnpm install

# 复制项目文件到工作目录
COPY . .

# 构建项目
RUN pnpm run build

# 设置 Nginx 镜像
FROM nginx:alpine

RUN mkdir -p /ruanjian/admin_front
# 将构建的项目复制到 Nginx 默认的 HTML 目录
COPY --from=builder /hotel-admin/dist /ruanjian/admin_front

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/admin_front.conf
