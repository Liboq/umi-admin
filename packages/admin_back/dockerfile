FROM node:16-alpine
WORKDIR /nest-typeorm
COPY package*.json /nest-typeorm/

# 安装 pnpm
RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

# 设置 Nginx 镜像
FROM nginx:alpine
# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/admin_end.conf

FROM node:16-alpine

COPY --from=0 /nest-typeorm/dist ./dist

COPY --from=0 /nest-typeorm/node_modules ./node_modules

EXPOSE 1101

CMD node dist/main.js
