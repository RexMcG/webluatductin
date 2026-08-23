import { apiClient } from '@/lib/api-client';

export interface FormItem {
  id: number;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  fileUrl?: string;
  createdAt: string;
}

export const formService = {
  getForms: async (query: string = '', limit: number = 50): Promise<FormItem[]> => {
    const res = await apiClient.get<FormItem[]>(`/forms/search?query=${encodeURIComponent(query)}&limit=${limit}`);
    return (res as any) || [];
  },
};
