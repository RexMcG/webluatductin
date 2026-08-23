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

export const chatbotService = {
  sendMessage: (data: ChatMessageRequest): Promise<ChatMessageResponse> => {
    return apiClient.post('/chatbot/message', data);
  },
};

