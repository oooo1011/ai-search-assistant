# AI Search Assistant

一个强大的 AI 搜索助手，支持多个搜索引擎和 AI 模型。

## 功能特点

- 多搜索引擎支持
  - Google
  - Bing
  - DuckDuckGo

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
- Google API Key (用于搜索)
- Google AI API Key (用于 Gemini)
- Anthropic API Key
- Mistral API Key
- DeepSeek API Key
- Groq API Key
- Bing API Key

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
