import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import * as fs from 'fs/promises'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PPTXLoader } from "langchain/document_loaders/fs/pptx";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 创建临时文件夹（如果不存在）
    const tempDir = join(process.cwd(), 'tmp')
    try {
      await fs.access(tempDir)
    } catch {
      await fs.mkdir(tempDir)
    }

    // 保存文件
    const bytes = await file.arrayBuffer()
    const filePath = join(tempDir, file.name)
    await writeFile(filePath, Buffer.from(bytes))

    // 根据文件类型选择合适的加载器
    let text = ''
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    try {
      let loader
      switch (fileExtension) {
        case 'pdf':
          loader = new PDFLoader(filePath)
          break
        case 'docx':
          loader = new DocxLoader(filePath)
          break
        case 'csv':
        case 'xlsx':
          loader = new CSVLoader(filePath)
          break
        case 'pptx':
          loader = new PPTXLoader(filePath)
          break
        default:
          throw new Error('Unsupported file type')
      }

      const docs = await loader.load()
      text = docs.map(doc => doc.pageContent).join('\n')
    } catch (error) {
      console.error('Error processing file:', error)
      throw error
    } finally {
      // 清理临时文件
      try {
        await fs.unlink(filePath)
      } catch (error) {
        console.error('Error deleting temp file:', error)
      }
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'File upload/processing failed' },
      { status: 500 }
    )
  }
}
