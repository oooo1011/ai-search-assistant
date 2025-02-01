# Debian 服务器部署指南

本指南将帮助您在 Debian 服务器上部署 AI 搜索助手项目。

## 1. 系统要求

- Debian 11 或更高版本
- Node.js 18.x 或更高版本
- Nginx
- PM2 (Node.js 进程管理器)

## 2. 安装基础软件

```bash
# 更新系统
sudo apt update
sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 Nginx
sudo apt install -y nginx

# 安装 PM2
sudo npm install -g pm2
```

## 3. 项目部署

### 3.1 克隆项目

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆项目
git clone <your-repository-url> ai-search-assistant
cd ai-search-assistant
```

### 3.2 安装依赖

```bash
# 安装项目依赖
npm install

# 构建项目
npm run build
```

### 3.3 配置环境变量

```bash
# 创建环境变量文件
cp .env.local.example .env.local

# 编辑环境变量文件，填入您的 API 密钥
nano .env.local
```

## 4. 配置 Nginx

```bash
# 复制 Nginx 配置文件
sudo cp deploy/nginx.conf /etc/nginx/sites-available/ai-search-assistant

# 创建符号链接
sudo ln -s /etc/nginx/sites-available/ai-search-assistant /etc/nginx/sites-enabled/

# 测试 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

## 5. 启动应用

```bash
# 使用 PM2 启动应用
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save
```

## 6. SSL 配置（可选但推荐）

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your_domain.com

# Certbot 会自动修改 Nginx 配置
```

## 7. 防火墙配置

```bash
# 安装 UFW
sudo apt install -y ufw

# 配置防火墙规则
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# 启用防火墙
sudo ufw enable
```

## 8. 维护命令

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs ai-search-assistant

# 重启应用
pm2 restart ai-search-assistant

# 更新代码
cd /var/www/ai-search-assistant
git pull
npm install
npm run build
pm2 restart ai-search-assistant
```

## 9. 故障排除

### 9.1 检查日志

```bash
# PM2 日志
pm2 logs ai-search-assistant

# Nginx 错误日志
sudo tail -f /var/log/nginx/error.log

# Nginx 访问日志
sudo tail -f /var/log/nginx/access.log
```

### 9.2 常见问题

1. 502 Bad Gateway
   - 检查 Node.js 应用是否正在运行
   - 检查 Nginx 配置中的端口是否正确
   - 检查防火墙设置

2. 无法上传文件
   - 检查 Nginx 配置中的 client_max_body_size
   - 检查目录权限

3. API 调用失败
   - 检查环境变量是否正确配置
   - 检查 API 密钥是否有效

## 10. 性能优化

1. 启用 Nginx 缓存
2. 配置 PM2 集群模式
3. 使用 CDN 加速静态资源

## 11. 备份策略

1. 定期备份数据
2. 备份环境变量
3. 备份 Nginx 配置

## 12. 监控

1. 使用 PM2 监控
2. 配置服务器监控
3. 设置告警机制

## 联系方式

如果您在部署过程中遇到任何问题，请联系：[您的联系方式]
