import { apiClient } from '@/lib/api-client';

export interface FormItem {
  id: number;
  title: string;
  description?: string;
  content: string;
  category?: string;
  distance?: number;
  score?: number;
  matchPercent?: number;
  fileUrl?: string;
}

export const formLibraryService = {
  searchForms: (query: string, limit: number = 10): Promise<FormItem[]> => {
    return apiClient.get('/forms/search', { params: { query, limit } });
  },
  createForm: (data: { title: string; content: string; category?: string }): Promise<FormItem> => {
    return apiClient.post('/forms', data);
  },
  downloadForm: (data: { name: string; phone: string; formId: number }): Promise<{ fileUrl: string }> => {
    return apiClient.post('/forms/download', data);
  }
};
