# AI Search Assistant

一个强大的 AI 搜索助手，支持多个搜索引擎和 AI 模型。

## 功能特点

- 多搜索引擎支持
  - DuckDuckGo（无需 API 密钥）
  - Tavily（AI 优化搜索引擎）

- 多 AI 模型支持
  - OpenAI (GPT-4, GPT-3.5)
  - Anthropic (Claude)
  - Google (Gemini)
  - Mistral AI
  - DeepSeek
  - Groq (Mixtral, LLaMA)
  - Ollama (本地模型)
    - Llama 2
    - Mistral
    - Code Llama

- 知识库功能
  - 支持多个知识库
  - 文档智能向量化
  - 相似度搜索
  - 上下文增强回答

- 对话历史
  - 本地存储
  - 服务端存储（可选）
  - 历史记录管理
  - 对话导出

- 文档处理
  - 支持 PDF、Word、Excel、PowerPoint
  - 智能文本提取
  - 上下文分析

- 实时交互
  - 流式响应
  - 实时搜索
  - 智能对话

## 快速开始

### 方式一：使用 Docker（推荐）

1. 克隆项目
```bash
git clone https://github.com/your-username/ai-search-assistant.git
cd ai-search-assistant
```

2. 配置环境变量
```bash
cp .env.local.example .env.local
# 编辑 .env.local 文件，填入您的 API 密钥
```

3. 使用 Docker 运行
```bash
docker-compose up -d
```

4. 访问 http://localhost:3000

### 方式二：本地开发

1. 克隆项目
```bash
git clone https://github.com/your-username/ai-search-assistant.git
cd ai-search-assistant
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.local.example .env.local
# 编辑 .env.local 文件，填入您的 API 密钥
```

4. 运行开发服务器
```bash
npm run dev
```

## 环境要求

### Docker 部署
- Docker
- Docker Compose

### 本地开发
- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

## 部署

详细的部署指南请参考 [deploy/DEPLOY.md](deploy/DEPLOY.md)。

## API 密钥配置

您需要配置以下 API 密钥：

- OpenAI API Key
- Google AI API Key (用于 Gemini)
- Anthropic API Key
- Mistral API Key
- DeepSeek API Key
- Groq API Key
- Tavily API Key

## API 密钥申请指南

### OpenAI API
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册或登录账号
3. 进入 [API Keys](https://platform.openai.com/api-keys) 页面
4. 点击 "Create new secret key"
5. 复制并保存生成的 API 密钥

### Google AI API（用于 Gemini）
1. 访问 [Google AI Studio](https://ai.google.dev/)
2. 注册或登录账号
3. 进入 API Keys 页面
4. 创建新的 API 密钥

### Anthropic API
1. 访问 [Anthropic Console](https://console.anthropic.com/)
2. 注册或登录账号
3. 进入 API Keys 页面
4. 创建新的 API 密钥

### Mistral AI API
1. 访问 [Mistral AI Platform](https://console.mistral.ai/)
2. 注册或登录账号
3. 进入 API 页面
4. 生成新的 API 密钥

### DeepSeek API
1. 访问 [DeepSeek Platform](https://platform.deepseek.ai/)
2. 注册账号
3. 访问 API Keys 页面
4. 创建新的 API 密钥

### Groq API
1. 访问 [Groq Cloud](https://console.groq.com/)
2. 注册账号
3. 进入 API Keys 页面
4. 生成新的 API 密钥

### Tavily API
1. 访问 [Tavily AI](https://tavily.com/)
2. 点击 "Get API Key"
3. 注册账号
4. 在仪表板中获取 API 密钥

### DuckDuckGo
- 无需 API 密钥，可直接使用

### Supabase（可选，用于服务端存储）
1. 访问 [Supabase](https://supabase.com/)
2. 注册账号
3. 创建新项目
4. 获取项目 URL 和 anon key

### Ollama（本地模型）
1. 访问 [Ollama](https://ollama.ai/)
2. 下载并安装 Ollama
3. 运行 Ollama 服务
4. 无需 API 密钥，直接使用本地服务

## 环境变量配置

创建 `.env.local` 文件并添加以下配置：

```bash
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Mistral
MISTRAL_API_KEY=your_mistral_api_key

# DeepSeek
DEEPSEEK_API_KEY=your_deepseek_api_key

# Groq
GROQ_API_KEY=your_groq_api_key

# Tavily
TAVILY_API_KEY=your_tavily_api_key

# Supabase（可选）
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Ollama（可选，默认为 http://localhost:11434）
OLLAMA_BASE_URL=http://localhost:11434
```

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- LangChain
- Docker

## 贡献指南

1. Fork 项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

您的姓名 - [@您的推特](https://twitter.com/your_username)

项目链接: [https://github.com/your-username/ai-search-assistant](https://github.com/your-username/ai-search-assistant)
