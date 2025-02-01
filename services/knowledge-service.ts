import { KnowledgeBase, KnowledgeFile } from '@/types/knowledge';
import { createClient } from '@supabase/supabase-js';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { TextLoader } from 'langchain/document_loaders/fs/text';

export class KnowledgeService {
  private supabase;
  private embeddings;
  private vectorStore;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    this.vectorStore = new SupabaseVectorStore(this.embeddings, {
      client: this.supabase,
      tableName: 'documents',
    });
  }

  async createKnowledgeBase(name: string, description: string): Promise<KnowledgeBase> {
    const { data, error } = await this.supabase
      .from('knowledge_bases')
      .insert([{ name, description }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addFileToKnowledgeBase(
    knowledgeBaseId: string,
    file: Express.Multer.File
  ): Promise<KnowledgeFile> {
    // 1. 保存文件到存储
    const { data: fileData, error: fileError } = await this.supabase.storage
      .from('knowledge_files')
      .upload(`${knowledgeBaseId}/${file.originalname}`, file.buffer);

    if (fileError) throw fileError;

    // 2. 加载文件内容
    let documents: Document[] = [];
    switch (file.mimetype) {
      case 'application/pdf':
        const pdfLoader = new PDFLoader(file.buffer);
        documents = await pdfLoader.load();
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docxLoader = new DocxLoader(file.buffer);
        documents = await docxLoader.load();
        break;
      default:
        const textLoader = new TextLoader(file.buffer);
        documents = await textLoader.load();
    }

    // 3. 创建向量嵌入并存储
    await this.vectorStore.addDocuments(documents);

    // 4. 保存文件记录
    const { data: knowledgeFile, error } = await this.supabase
      .from('knowledge_files')
      .insert([
        {
          knowledge_base_id: knowledgeBaseId,
          name: file.originalname,
          path: fileData.path,
          type: file.mimetype,
          size: file.size,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return knowledgeFile;
  }

  async searchKnowledgeBase(
    knowledgeBaseId: string,
    query: string,
    limit: number = 5
  ): Promise<Document[]> {
    const results = await this.vectorStore.similaritySearch(query, limit, {
      knowledge_base_id: knowledgeBaseId,
    });
    return results;
  }

  async listKnowledgeBases(): Promise<KnowledgeBase[]> {
    const { data, error } = await this.supabase
      .from('knowledge_bases')
      .select('*');

    if (error) throw error;
    return data;
  }

  async getKnowledgeBase(id: string): Promise<KnowledgeBase> {
    const { data, error } = await this.supabase
      .from('knowledge_bases')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
