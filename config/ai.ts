export const aiConfig = {
  // OpenAI 配置
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    models: {
      gpt4: 'gpt-4-turbo-preview',
      gpt35: 'gpt-3.5-turbo',
      gpt35_16k: 'gpt-3.5-turbo-16k',
    },
  },

  // Anthropic 配置
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    models: {
      claude3: 'claude-3-opus-20240229',
      claude2: 'claude-2.1',
    },
  },

  // Google AI 配置
  google: {
    apiKey: process.env.GOOGLE_AI_API_KEY,
    models: {
      gemini_pro: 'gemini-pro',
    },
  },

  // Mistral AI 配置
  mistral: {
    apiKey: process.env.MISTRAL_API_KEY,
    models: {
      mistral_large: 'mistral-large-latest',
      mistral_medium: 'mistral-medium-latest',
      mistral_small: 'mistral-small-latest',
    },
  },

  // DeepSeek 配置
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
    models: {
      deepseek_chat: 'deepseek-chat',
      deepseek_coder: 'deepseek-coder-33b-instruct',
    },
  },

  // Groq 配置
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    models: {
      mixtral: 'mixtral-8x7b-32768',
      llama2: 'llama2-70b-4096',
    },
  },

  // 默认设置
  defaultModel: 'gpt-3.5-turbo',
  defaultProvider: 'openai',
  
  // 模型上下文窗口大小（token）
  contextWindows: {
    'gpt-4-turbo-preview': 128000,
    'gpt-3.5-turbo': 4096,
    'gpt-3.5-turbo-16k': 16384,
    'claude-3-opus-20240229': 200000,
    'claude-2.1': 100000,
    'gemini-pro': 32768,
    'mistral-large-latest': 32768,
    'mistral-medium-latest': 32768,
    'mistral-small-latest': 32768,
    'deepseek-chat': 32768,
    'deepseek-coder-33b-instruct': 32768,
    'mixtral-8x7b-32768': 32768,
    'llama2-70b-4096': 4096,
  }
}
