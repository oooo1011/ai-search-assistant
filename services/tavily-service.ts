import { SearchResult } from '@/types/search';

export class TavilyService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.TAVILY_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('Tavily API key is not configured');
    }
  }

  async search(query: string, maxResults: number = 10): Promise<SearchResult[]> {
    try {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          query,
          max_results: maxResults,
          include_answer: true,
          include_raw_content: false,
          include_images: false,
          search_depth: 'advanced',
        }),
      });

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.results.map((result: any) => ({
        title: result.title,
        link: result.url,
        snippet: result.content,
        source: 'tavily',
        score: result.relevance_score || 0,
      }));
    } catch (error) {
      console.error('Tavily search error:', error);
      return [];
    }
  }
}
