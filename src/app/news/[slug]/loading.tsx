import React from "react";

export default function ArticleDetailLoading() {
  return (
    <div className="min-h-screen bg-surface-main py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content Skeleton (8 cols) */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-4 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-4 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>

            {/* Category Tag */}
            <div className="h-6 w-32 bg-amber-100 rounded-full mb-4" />

            {/* Article Title Skeleton */}
            <div className="h-9 md:h-12 w-full bg-slate-300 rounded-xl mb-3" />
            <div className="h-9 md:h-12 w-4/5 bg-slate-300 rounded-xl mb-6" />

            {/* Author / Date Meta */}
            <div className="flex items-center gap-4 pb-6 mb-8 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-36 bg-slate-300 rounded" />
                <div className="h-3 w-28 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Cover Image Skeleton */}
            <div className="w-full h-72 md:h-96 bg-slate-200 rounded-2xl mb-8" />

            {/* Content Paragraph Skeletons */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              
              <div className="h-7 w-1/2 bg-slate-300 rounded-lg mt-8 mb-4" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-4/5 bg-slate-200 rounded" />
            </div>
          </main>

          {/* Sidebar Skeleton (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs animate-pulse">
              <div className="h-6 w-40 bg-slate-300 rounded mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-slate-200 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-full bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
