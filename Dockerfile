# 使用 Node.js 18 作为基础镜像
FROM node:18-alpine AS deps

# 安装依赖
RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 使用淘宝镜像安装依赖
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --frozen-lockfile

# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN npm run build

# 生产环境
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 启动应用
CMD ["node", "server.js"]
