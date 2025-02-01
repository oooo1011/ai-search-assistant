import { ChatHistory, ChatMessage } from '@/types/knowledge';
import { createClient } from '@supabase/supabase-js';
import localforage from 'localforage';

export class ChatHistoryService {
  private supabase;
  private storage: LocalForage;
  private useLocalStorage: boolean;

  constructor(useLocalStorage: boolean = false) {
    this.useLocalStorage = useLocalStorage;

    if (!useLocalStorage) {
      this.supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
      );
    } else {
      this.storage = localforage.createInstance({
        name: 'chat-history',
      });
    }
  }

  async saveChatHistory(history: ChatHistory): Promise<void> {
    if (this.useLocalStorage) {
      await this.storage.setItem(history.id, history);
    } else {
      const { error } = await this.supabase
        .from('chat_histories')
        .upsert(history);

      if (error) throw error;
    }
  }

  async getChatHistory(id: string): Promise<ChatHistory | null> {
    if (this.useLocalStorage) {
      return await this.storage.getItem(id);
    } else {
      const { data, error } = await this.supabase
        .from('chat_histories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  }

  async listChatHistories(): Promise<ChatHistory[]> {
    if (this.useLocalStorage) {
      const histories: ChatHistory[] = [];
      await this.storage.iterate((value: ChatHistory) => {
        histories.push(value);
      });
      return histories;
    } else {
      const { data, error } = await this.supabase
        .from('chat_histories')
        .select('*')
        .order('updatedAt', { ascending: false });

      if (error) throw error;
      return data;
    }
  }

  async deleteChatHistory(id: string): Promise<void> {
    if (this.useLocalStorage) {
      await this.storage.removeItem(id);
    } else {
      const { error } = await this.supabase
        .from('chat_histories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  }

  async addMessage(historyId: string, message: ChatMessage): Promise<void> {
    if (this.useLocalStorage) {
      const history = await this.getChatHistory(historyId);
      if (history) {
        history.messages.push(message);
        history.updatedAt = new Date();
        await this.saveChatHistory(history);
      }
    } else {
      const { error } = await this.supabase
        .from('chat_messages')
        .insert([{ ...message, chat_history_id: historyId }]);

      if (error) throw error;
    }
  }
}
