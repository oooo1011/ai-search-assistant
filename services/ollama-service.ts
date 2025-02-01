import { ollamaConfig } from '@/config/ai';

export class OllamaService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = ollamaConfig.baseUrl;
  }

  async generateCompletion(
    model: string,
    prompt: string,
    options: {
      temperature?: number;
      maxTokens?: number;
      stream?: boolean;
    } = {}
  ) {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens,
        stream: options.stream ?? false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    if (options.stream) {
      return response.body;
    } else {
      const data = await response.json();
      return data.response;
    }
  }

  async listModels() {
    const response = await fetch(`${this.baseUrl}/api/tags`);
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.models;
  }

  async pullModel(model: string) {
    const response = await fetch(`${this.baseUrl}/api/pull`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: model,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
  }
}
