export async function searchWeb(query: string): Promise<string> {
  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 60 }, // 缓存1分钟
      }
    )

    if (!response.ok) {
      throw new Error('Search request failed')
    }

    const data = await response.json()
    return data.results || '未找到相关搜索结果。'
  } catch (error) {
    console.error('Search error:', error)
    return '搜索过程中发生错误，请稍后重试。'
  }
}
