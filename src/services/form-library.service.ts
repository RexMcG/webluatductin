import { apiClient } from '@/lib/api-client';
import { sanitizeFormItem } from '@/utils/form-brand-cleaner';

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
  searchForms: async (query: string, limit: number = 10): Promise<FormItem[]> => {
    const rawItems: FormItem[] = await apiClient.get('/forms/search', { params: { query, limit } });
    if (!Array.isArray(rawItems)) return [];
    return rawItems.map(sanitizeFormItem);
  },
  createForm: (data: { title: string; content: string; category?: string }): Promise<FormItem> => {
    return apiClient.post('/forms', data);
  },
  downloadForm: (data: { name: string; phone: string; formId: number }): Promise<{ fileUrl: string }> => {
    return apiClient.post('/forms/download', data);
  }
};
