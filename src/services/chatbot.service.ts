import { apiClient } from '@/lib/api-client';

export interface ChatMessageRequest {
  sessionId?: number;
  message: string;
}

export interface LawyerInfo {
  name: string;
  role: string;
  phone: string;
  phoneClean: string;
  zaloUrl: string;
  avatar: string;
  experience: string;
  firm: string;
}

export interface SuggestedForm {
  id: number;
  title: string;
  category?: string;
  fileUrl?: string;
}

export interface QuickAction {
  label: string;
  action: string;
  icon: string;
  type: string;
}

export interface ChatMessageResponse {
  sessionId: number;
  reply: string;
  lawyer?: LawyerInfo;
  suggestedForms?: SuggestedForm[];
  quickActions?: QuickAction[];
}

export interface ChatSessionSummary {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessage: string;
  firstUserQuery: string;
}

export interface ChatSessionDetailResponse {
  success: boolean;
  data: {
    session: {
      id: number;
      title: string;
      createdAt: string;
      updatedAt: string;
    };
    messages: {
      id: number;
      sessionId: number;
      role: 'user' | 'assistant' | 'system' | 'ai';
      content: string;
      createdAt: string;
    }[];
  };
}

export const chatbotService = {
  sendMessage: (data: ChatMessageRequest): Promise<ChatMessageResponse> => {
    return apiClient.post('/chatbot/message', data);
  },
  getSessions: (page = 1, limit = 50): Promise<{ success: boolean; data: { sessions: ChatSessionSummary[]; total: number; page: number; totalPages: number } }> => {
    return apiClient.get(`/chatbot/sessions?page=${page}&limit=${limit}`);
  },
  getSessionDetail: (id: number): Promise<ChatSessionDetailResponse> => {
    return apiClient.get(`/chatbot/sessions/${id}`);
  },
  exportDataset: (): Promise<{ success: boolean; count: number; data: any[] }> => {
    return apiClient.get('/chatbot/dataset');
  },
  deleteSession: (id: number): Promise<{ success: boolean }> => {
    return apiClient.delete(`/chatbot/sessions/${id}`);
  },
};

