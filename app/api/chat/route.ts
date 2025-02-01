import { OpenAIStream, StreamingTextResponse } from 'ai'
import { searchWeb } from './search'
import { AIService } from './ai-service'
import { aiConfig } from '@/config/ai'

const aiService = new AIService()

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, model = aiConfig.defaultModel } = await req.json()
  const lastMessage = messages[messages.length - 1]

  // 获取上传的文件内容（如果有）
  const uploadedContent = req.headers.get('x-uploaded-content')

  let contextContent = ''
  let searchResults = ''

  if (uploadedContent) {
    contextContent = `已上传文件内容：\n${uploadedContent}\n\n`
  } else {
    // 如果没有上传文件，则使用搜索API获取结果
    searchResults = await searchWeb(lastMessage.content)
    contextContent = `搜索结果：\n${searchResults}\n\n`
  }

  // 构建 prompt
  const prompt = `
作为一个AI助手，请基于以下内容回答用户的问题。
用户问题: ${lastMessage.content}

${contextContent}

请提供一个清晰、准确和有见地的回答。回答应该：
1. 总结关键信息
2. 保持客观性
3. 如果信息不足或不确定，请说明
4. 如果可能，提供信息来源

请用中文回答。
`

  try {
    // 使用选定的模型生成回答
    const response = await aiService.generateResponse(prompt, model)
    
    // 创建流式响应
    let stream
    if (model.startsWith('gpt')) {
      stream = OpenAIStream(response)
    } else {
      // 处理其他模型的流式响应
      stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of response) {
            controller.enqueue(chunk)
          }
          controller.close()
        },
      })
    }

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('AI response error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500 }
    )
  }
}
