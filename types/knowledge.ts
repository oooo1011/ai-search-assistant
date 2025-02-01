export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  files: KnowledgeFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeFile {
  id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  content: string;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  knowledgeBaseId?: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
