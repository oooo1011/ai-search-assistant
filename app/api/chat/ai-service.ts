import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import MistralClient from '@mistralai/mistralai'
import { Groq } from 'groq-sdk'
import { aiConfig } from '@/config/ai'

export class AIService {
  private openai: OpenAI
  private anthropic: Anthropic
  private google: GoogleGenerativeAI
  private mistral: MistralClient
  private groq: Groq
  private deepseek: OpenAI

  constructor() {
    // 初始化各AI提供商的客户端
    this.openai = new OpenAI({
      apiKey: aiConfig.openai.apiKey,
    })

    this.anthropic = new Anthropic({
      apiKey: aiConfig.anthropic.apiKey,
    })

    this.google = new GoogleGenerativeAI(aiConfig.google.apiKey || '')

    this.mistral = new MistralClient(aiConfig.mistral.apiKey || '')

    this.groq = new Groq({
      apiKey: aiConfig.groq.apiKey,
    })

    // 初始化 DeepSeek 客户端（使用 OpenAI 兼容接口）
    this.deepseek = new OpenAI({
      apiKey: aiConfig.deepseek.apiKey,
      baseURL: aiConfig.deepseek.baseURL,
    })
  }

  async generateResponse(prompt: string, model: string = aiConfig.defaultModel) {
    try {
      // 根据模型选择对应的AI服务
      if (model.startsWith('gpt')) {
        return await this.generateOpenAIResponse(prompt, model)
      } else if (model.startsWith('claude')) {
        return await this.generateAnthropicResponse(prompt, model)
      } else if (model.startsWith('gemini')) {
        return await this.generateGoogleAIResponse(prompt, model)
      } else if (model.startsWith('mistral')) {
        return await this.generateMistralResponse(prompt, model)
      } else if (model.startsWith('mixtral') || model.startsWith('llama2')) {
        return await this.generateGroqResponse(prompt, model)
      } else if (model.startsWith('deepseek')) {
        return await this.generateDeepSeekResponse(prompt, model)
      } else {
        throw new Error('Unsupported model')
      }
    } catch (error) {
      console.error('AI generation error:', error)
      throw error
    }
  }

  private async generateOpenAIResponse(prompt: string, model: string) {
    const response = await this.openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: '你是一个专业的助手，负责分析文档内容或搜索结果，并提供准确的信息。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      stream: true,
    })
    return response
  }

  private async generateAnthropicResponse(prompt: string, model: string) {
    const response = await this.anthropic.messages.create({
      model: model,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
    })
    return response
  }

  private async generateGoogleAIResponse(prompt: string, model: string) {
    const genAI = this.google.getGenerativeModel({ model: model })
    const response = await genAI.generateContentStream(prompt)
    return response
  }

  private async generateMistralResponse(prompt: string, model: string) {
    const response = await this.mistral.chatStream({
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })
    return response
  }

  private async generateGroqResponse(prompt: string, model: string) {
    const response = await this.groq.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: '你是一个专业的助手，负责分析文档内容或搜索结果，并提供准确的信息。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      stream: true,
    })
    return response
  }

  private async generateDeepSeekResponse(prompt: string, model: string) {
    const response = await this.deepseek.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: '你是一个专业的助手，负责分析文档内容或搜索结果，并提供准确的信息。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      stream: true,
    })
    return response
  }

  // 获取支持的模型列表
  static getSupportedModels() {
    return {
      openai: Object.values(aiConfig.openai.models),
      anthropic: Object.values(aiConfig.anthropic.models),
      google: Object.values(aiConfig.google.models),
      mistral: Object.values(aiConfig.mistral.models),
      groq: Object.values(aiConfig.groq.models),
      deepseek: Object.values(aiConfig.deepseek.models),
    }
  }

  // 获取模型的上下文窗口大小
  static getModelContextWindow(model: string) {
    return aiConfig.contextWindows[model] || 4096
  }
}
