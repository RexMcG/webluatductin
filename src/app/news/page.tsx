"use client";

import { useQuery } from '@tanstack/react-query';
import { newsService, NewsArticle } from '@/services/news.service';
import Link from 'next/link';

export default function NewsPage() {
  const { data: newsList, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: () => newsService.getNewsList(),
  });

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          Cập nhật pháp luật mới nhất
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight tracking-tight uppercase text-center mb-3">
          Bảng Tin & Sự Kiện Pháp Luật
        </h1>
        <div className="text-amber-600 flex items-center justify-center mt-1">
          <span className="tracking-widest font-bold text-lg">— ⚖️ —</span>
        </div>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl text-center mt-2">
          Tổng hợp thông tin pháp luật, phân tích vụ án và quy định pháp lý mới nhất từ Công ty Luật TNHH Đức Tín và Cộng sự.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          <p>Không thể tải dữ liệu tin tức. Vui lòng thử lại sau.</p>
        </div>
      ) : newsList && newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <Link href={`/news/${news.slug}`} key={news.id} className="group flex flex-col bg-surface-main border border-border-neutral rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-surface-alt relative overflow-hidden">
                {news.thumbnailUrl ? (
                  <img src={news.thumbnailUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary bg-gray-100">
                    <span className="material-symbols-outlined text-4xl">newspaper</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-text-secondary mb-2 uppercase font-semibold">
                  {new Date(news.publishedAt).toLocaleDateString('vi-VN')}
                </div>
                <h3 className="font-bold text-lg text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {news.title}
                </h3>
                <div 
                  className="text-text-secondary line-clamp-3 text-sm flex-grow"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
                <div className="mt-4 text-primary text-sm font-semibold flex items-center gap-1 group-hover:text-accent transition-colors">
                  Đọc tiếp <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-text-secondary">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-50">article</span>
          <p>Hiện chưa có bài viết nào.</p>
        </div>
      )}
    </div>
  );
}
