import localforage from 'localforage';
import { ChatHistory, ChatMessage, KnowledgeBase } from '@/types/knowledge';

export class LocalStorageService {
  private chatStorage: LocalForage;
  private knowledgeStorage: LocalForage;
  private messageStorage: LocalForage;

  constructor() {
    // 初始化聊天历史存储
    this.chatStorage = localforage.createInstance({
      name: 'chat-history',
      description: '存储聊天历史记录'
    });

    // 初始化知识库存储
    this.knowledgeStorage = localforage.createInstance({
      name: 'knowledge-base',
      description: '存储知识库数据'
    });

    // 初始化消息存储
    this.messageStorage = localforage.createInstance({
      name: 'messages',
      description: '存储单条消息'
    });
  }

  // 聊天历史相关方法
  async saveChatHistory(history: ChatHistory): Promise<void> {
    await this.chatStorage.setItem(history.id, history);
  }

  async getChatHistory(id: string): Promise<ChatHistory | null> {
    return await this.chatStorage.getItem(id);
  }

  async listChatHistories(): Promise<ChatHistory[]> {
    const histories: ChatHistory[] = [];
    await this.chatStorage.iterate((value: ChatHistory) => {
      histories.push(value);
    });
    return histories.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async deleteChatHistory(id: string): Promise<void> {
    await this.chatStorage.removeItem(id);
  }

  // 知识库相关方法
  async saveKnowledgeBase(kb: KnowledgeBase): Promise<void> {
    await this.knowledgeStorage.setItem(kb.id, kb);
  }

  async getKnowledgeBase(id: string): Promise<KnowledgeBase | null> {
    return await this.knowledgeStorage.getItem(id);
  }

  async listKnowledgeBases(): Promise<KnowledgeBase[]> {
    const bases: KnowledgeBase[] = [];
    await this.knowledgeStorage.iterate((value: KnowledgeBase) => {
      bases.push(value);
    });
    return bases.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async deleteKnowledgeBase(id: string): Promise<void> {
    await this.knowledgeStorage.removeItem(id);
  }

  // 消息相关方法
  async saveMessage(message: ChatMessage): Promise<void> {
    await this.messageStorage.setItem(message.id, message);
  }

  async getMessage(id: string): Promise<ChatMessage | null> {
    return await this.messageStorage.getItem(id);
  }

  async getMessagesByChat(chatId: string): Promise<ChatMessage[]> {
    const messages: ChatMessage[] = [];
    await this.messageStorage.iterate((value: ChatMessage) => {
      if (value.id.startsWith(chatId)) {
        messages.push(value);
      }
    });
    return messages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }

  // 导出数据
  async exportData(): Promise<{
    chatHistories: ChatHistory[];
    knowledgeBases: KnowledgeBase[];
    messages: ChatMessage[];
  }> {
    const chatHistories = await this.listChatHistories();
    const knowledgeBases = await this.listKnowledgeBases();
    const messages: ChatMessage[] = [];
    await this.messageStorage.iterate((value: ChatMessage) => {
      messages.push(value);
    });

    return {
      chatHistories,
      knowledgeBases,
      messages
    };
  }

  // 导入数据
  async importData(data: {
    chatHistories?: ChatHistory[];
    knowledgeBases?: KnowledgeBase[];
    messages?: ChatMessage[];
  }): Promise<void> {
    if (data.chatHistories) {
      for (const history of data.chatHistories) {
        await this.saveChatHistory(history);
      }
    }

    if (data.knowledgeBases) {
      for (const kb of data.knowledgeBases) {
        await this.saveKnowledgeBase(kb);
      }
    }

    if (data.messages) {
      for (const message of data.messages) {
        await this.saveMessage(message);
      }
    }
  }

  // 清除所有数据
  async clearAll(): Promise<void> {
    await Promise.all([
      this.chatStorage.clear(),
      this.knowledgeStorage.clear(),
      this.messageStorage.clear()
    ]);
  }
}
