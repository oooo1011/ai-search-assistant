export const searchConfig = {
  // Google Custom Search API 配置
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
    endpoint: 'https://www.googleapis.com/customsearch/v1',
  },
  
  // Bing Web Search API 配置
  bing: {
    apiKey: process.env.BING_API_KEY,
    endpoint: 'https://api.bing.microsoft.com/v7.0/search',
  },

  // DuckDuckGo 配置（不需要 API key）
  duckduckgo: {
    endpoint: 'https://api.duckduckgo.com/',
  },

  // 搜索结果配置
  resultLimit: 5, // 每个搜索引擎返回的结果数量
  timeout: 10000, // 请求超时时间（毫秒）
}
