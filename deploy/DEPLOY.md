# Debian 服务器部署指南

本指南将帮助您在 Debian 服务器上部署 AI 搜索助手项目。

## 1. 系统要求

- Debian 11 或更高版本
- Docker 和 Docker Compose
- Git

## 2. 安装 Docker 和 Docker Compose

```bash
# 更新系统
sudo apt update
sudo apt upgrade -y

# 安装必要的依赖
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新包索引
sudo apt update

# 安装 Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 安装 Docker Compose
sudo apt install -y docker-compose

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker
```

## 3. 部署项目

### 3.1 克隆项目

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆项目
git clone https://github.com/your-username/ai-search-assistant.git
cd ai-search-assistant
```

### 3.2 配置环境变量

```bash
# 复制环境变量模板
cp .env.local.example .env.local

# 编辑环境变量文件
nano .env.local
```

填入必要的 API 密钥：
```
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Mistral
MISTRAL_API_KEY=your_mistral_api_key

# DeepSeek
DEEPSEEK_API_KEY=your_deepseek_api_key

# Groq
GROQ_API_KEY=your_groq_api_key

# Bing
BING_API_KEY=your_bing_api_key
```

### 3.3 构建和启动容器

```bash
# 构建和启动容器
docker-compose up -d --build

# 查看日志
docker-compose logs -f
```

现在您可以通过 http://your-server-ip:3000 访问应用。

## 4. 维护命令

```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 重启应用
docker-compose restart

# 停止应用
docker-compose down

# 更新代码和重新部署
git pull
docker-compose up -d --build
```

## 5. 故障排除

### 5.1 检查日志

```bash
# 查看容器日志
docker-compose logs -f

# 查看特定时间段的日志
docker-compose logs --since 30m
```

### 5.2 常见问题

1. 容器无法启动
   - 检查 Docker 服务状态：`sudo systemctl status docker`
   - 检查环境变量是否正确配置
   - 检查端口 3000 是否被占用：`sudo lsof -i :3000`

2. 无法访问应用
   - 检查防火墙设置：`sudo ufw status`
   - 确保端口 3000 开放：`sudo ufw allow 3000/tcp`
   - 检查容器是否正在运行：`docker-compose ps`

3. API 调用失败
   - 检查环境变量是否正确配置
   - 检查 API 密钥是否有效
   - 查看容器日志寻找错误信息

## 6. 安全建议

1. 使用强密码和密钥
2. 定期更新系统和 Docker
3. 只开放必要的端口
4. 配置 UFW 防火墙
5. 定期备份数据和配置

## 7. 性能优化

1. 调整 Docker 资源限制
2. 监控系统资源使用
3. 定期清理未使用的 Docker 镜像和容器

## 8. 备份策略

1. 备份环境变量
2. 备份 Docker 配置
3. 设置定期备份计划

## 联系方式

如果您在部署过程中遇到任何问题，请联系：[您的联系方式]
