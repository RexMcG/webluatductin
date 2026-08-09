import { apiClient } from '@/lib/api-client';

export interface FormItem {
  id: number;
  title: string;
  content: string;
  category?: string;
  distance?: number;
}

export const formLibraryService = {
  searchForms: (query: string, limit: number = 10): Promise<FormItem[]> => {
    return apiClient.get('/forms/search', { params: { query, limit } });
  },
  createForm: (data: { title: string; content: string; category?: string }): Promise<FormItem> => {
    return apiClient.post('/forms', data);
  },
};
