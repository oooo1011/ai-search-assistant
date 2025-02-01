'use client'

import { useState } from 'react'
import { Upload, File, Loader2 } from 'lucide-react'

export default function FileUpload({ onUploadComplete }: { onUploadComplete: (text: string) => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedFile(file)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onUploadComplete(data.text)
    } catch (error) {
      console.error('Upload error:', error)
      alert('文件上传失败，请重试')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">点击上传</span> 或拖拽文件至此处
                </p>
                <p className="text-xs text-gray-500">
                  支持 PDF, Word, Excel, PowerPoint 文件
                </p>
              </>
            )}
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      {uploadedFile && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-2">
          <File className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-700">{uploadedFile.name}</span>
        </div>
      )}
    </div>
  )
}
