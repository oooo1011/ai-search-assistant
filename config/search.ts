export const searchConfig = {
  // DuckDuckGo 搜索配置
  duckduckgo: {
    endpoint: 'https://api.duckduckgo.com/',
  },

  // Tavily 搜索配置
  tavily: {
    endpoint: 'https://api.tavily.com/search',
  },

  // 搜索结果配置
  resultLimit: 5, // 每个搜索引擎返回的结果数量
  timeout: 10000, // 请求超时时间（毫秒）

  providers: {
    duckduckgo: {
      enabled: true,
      weight: 0.4,
      resultsPerQuery: 5,
    },
    tavily: {
      enabled: true,
      weight: 0.6,  // 给予更高权重，因为 Tavily 专门为 AI 优化
      resultsPerQuery: 5,
    },
  },
  
  // 结果合并和排序设置
  mergeSettings: {
    removeDuplicates: true,
    scoreThreshold: 0.1,
    maxResults: 10,
  },
}
