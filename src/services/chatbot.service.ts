import { apiClient } from '@/lib/api-client';

export interface ChatMessageRequest {
  sessionId?: number;
  message: string;
}

export interface ChatMessageResponse {
  sessionId: number;
  reply: string;
}

export const chatbotService = {
  sendMessage: (data: ChatMessageRequest): Promise<ChatMessageResponse> => {
    return apiClient.post('/chatbot/message', data);
  },
};
