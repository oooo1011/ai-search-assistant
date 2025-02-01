'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Send, Loader2 } from 'lucide-react'
import FileUpload from './file-upload'

export default function SearchDialog() {
  const [query, setQuery] = useState('')
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
  })

  const handleFileUpload = async (text: string) => {
    // 添加系统消息表示文件已上传
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: 'system',
        content: '文件已上传并解析完成。您可以询问关于文件内容的问题。',
      },
    ])

    // 将文件内容存储在会话存储中
    sessionStorage.setItem('uploadedContent', text)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
    setQuery('')
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4 border-b">
        <FileUpload onUploadComplete={handleFileUpload} />
      </div>
      <div className="h-[500px] overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.role === 'assistant'
                ? 'justify-start'
                : message.role === 'system'
                ? 'justify-center'
                : 'justify-end'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.role === 'assistant'
                  ? 'bg-gray-100'
                  : message.role === 'system'
                  ? 'bg-yellow-100'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </div>
      <form onSubmit={onSubmit} className="border-t p-4">
        <div className="flex gap-4">
          <input
            className="flex-1 rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="输入您的问题..."
          />
          <button
            type="submit"
            disabled={isLoading || !input}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
