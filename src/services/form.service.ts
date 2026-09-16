import { apiClient } from '@/lib/api-client';
import { POPULAR_FORMS } from '@/data/popular-forms';

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
  getForms: async (query: string = '', limit: number = 100): Promise<FormItem[]> => {
    try {
      const res = await apiClient.get<FormItem[]>(`/forms/search?query=${encodeURIComponent(query)}&limit=${limit}`);
      const list = (res as any) || [];
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    } catch (e) {
      console.warn('Backend /forms/search failed, falling back to standard forms catalog:', e);
    }

    // High-availability fallback to curated standard legal templates
    const normalizedQuery = (query || '').trim().toLowerCase();
    const fallbackList = POPULAR_FORMS.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description,
      content: f.content,
      category: f.category,
      fileUrl: f.fileUrl,
      createdAt: f.createdAt || new Date().toISOString(),
    }));

    if (!normalizedQuery) {
      return fallbackList;
    }

    return fallbackList.filter(
      (f) =>
        f.title.toLowerCase().includes(normalizedQuery) ||
        (f.description && f.description.toLowerCase().includes(normalizedQuery)) ||
        (f.category && f.category.toLowerCase().includes(normalizedQuery))
    );
  },
};
