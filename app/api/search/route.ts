import { NextResponse } from 'next/server'
import { searchConfig } from '@/config/search'

// 谷歌搜索
async function googleSearch(query: string) {
  try {
    const params = new URLSearchParams({
      key: searchConfig.google.apiKey || '',
      cx: searchConfig.google.searchEngineId || '',
      q: query,
      num: searchConfig.resultLimit.toString(),
    })

    const response = await fetch(
      `${searchConfig.google.endpoint}?${params.toString()}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }, // 缓存5分钟
      }
    )

    if (!response.ok) {
      throw new Error('Google search failed')
    }

    const data = await response.json()
    return data.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: 'google',
    })) || []
  } catch (error) {
    console.error('Google search error:', error)
    return []
  }
}

// 必应搜索
async function bingSearch(query: string) {
  try {
    const response = await fetch(
      `${searchConfig.bing.endpoint}?q=${encodeURIComponent(query)}&count=${
        searchConfig.resultLimit
      }`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': searchConfig.bing.apiKey || '',
        },
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      throw new Error('Bing search failed')
    }

    const data = await response.json()
    return data.webPages?.value?.map((item: any) => ({
      title: item.name,
      link: item.url,
      snippet: item.snippet,
      source: 'bing',
    })) || []
  } catch (error) {
    console.error('Bing search error:', error)
    return []
  }
}

// DuckDuckGo 搜索
async function duckduckgoSearch(query: string) {
  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      no_html: '1',
      no_redirect: '1',
    })

    const response = await fetch(
      `${searchConfig.duckduckgo.endpoint}?${params.toString()}`,
      {
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      throw new Error('DuckDuckGo search failed')
    }

    const data = await response.json()
    return data.RelatedTopics?.slice(0, searchConfig.resultLimit)?.map(
      (item: any) => ({
        title: item.Text,
        link: item.FirstURL,
        snippet: item.Text,
        source: 'duckduckgo',
      })
    ) || []
  } catch (error) {
    console.error('DuckDuckGo search error:', error)
    return []
  }
}

// 合并搜索结果并去重
function mergeAndDedupResults(results: any[]) {
  const seen = new Set()
  return results.filter((result) => {
    const duplicate = seen.has(result.link)
    seen.add(result.link)
    return !duplicate
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    )
  }

  try {
    // 并行执行所有搜索
    const [googleResults, bingResults, duckduckgoResults] = await Promise.all([
      googleSearch(query),
      bingSearch(query),
      duckduckgoSearch(query),
    ])

    // 合并并去重结果
    const allResults = mergeAndDedupResults([
      ...googleResults,
      ...bingResults,
      ...duckduckgoResults,
    ])

    // 格式化结果为易于阅读的文本
    const formattedResults = allResults
      .map(
        (result, index) =>
          `[${index + 1}] ${result.title}\n链接：${result.link}\n摘要：${
            result.snippet
          }\n来源：${result.source}\n`
      )
      .join('\n')

    return NextResponse.json({ results: formattedResults })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed. Please try again.' },
      { status: 500 }
    )
  }
}
