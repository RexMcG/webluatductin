import { apiClient } from '@/lib/api-client';

export interface NewsSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  category?: string;
  thumbnailUrl: string | null;
  summary?: string;
  content: string;
  diagramType?: 'mindmap' | 'flowchart' | 'none';
  mindmap?: string;
  flowchart?: string;
  sections?: NewsSection[];
  layoutStyle?: 'cards' | 'word-headings' | 'word-navigation';
  status: 'draft' | 'published';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateNewsRequest = {
  title: string;
  slug?: string;
  category?: string;
  thumbnailUrl?: string | null;
  summary?: string;
  content?: string;
  diagramType?: 'mindmap' | 'flowchart' | 'none';
  mindmap?: string;
  flowchart?: string;
  sections?: NewsSection[];
  layoutStyle?: 'cards' | 'word-headings' | 'word-navigation';
  status?: 'draft' | 'published';
};

export const newsService = {
  getNewsList: async (): Promise<NewsArticle[]> => {
    const res = await apiClient.get<{ data: NewsArticle[] }>('/news');
    return (res as any).data || res;
  },

  getNewsById: async (id: number): Promise<NewsArticle> => {
    const res = await apiClient.get<{ data: NewsArticle }>(`/news/id/${id}`);
    return (res as any).data || res;
  },

  getNewsBySlug: async (slug: string): Promise<NewsArticle> => {
    const res = await apiClient.get<{ data: NewsArticle }>(`/news/${slug}`);
    return (res as any).data || res;
  },

  createNews: async (data: CreateNewsRequest): Promise<NewsArticle> => {
    const res = await apiClient.post<{ data: NewsArticle }>('/news', data);
    return (res as any).data || res;
  },

  updateNews: async (id: number, data: Partial<CreateNewsRequest>): Promise<NewsArticle> => {
    const res = await apiClient.put<{ data: NewsArticle }>(`/news/${id}`, data);
    return (res as any).data || res;
  },

  deleteNews: async (id: number): Promise<boolean> => {
    const res = await apiClient.delete<{ success: boolean }>(`/news/${id}`);
    return (res as any).success || true;
  },
};
