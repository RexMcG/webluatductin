import React from "react";

export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-surface-main">
      {/* Header Skeleton */}
      <section className="bg-surface-alt border-b border-border-neutral py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center animate-pulse">
          <div className="h-4 w-32 bg-amber-200/50 rounded-full mx-auto mb-3" />
          <div className="h-9 md:h-12 w-3/4 max-w-lg bg-slate-300 rounded-2xl mx-auto mb-4" />
          <div className="h-4 w-2/3 max-w-md bg-slate-200 rounded-lg mx-auto" />
        </div>
      </section>

      {/* Articles Grid Skeleton */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Category Filter Pills Skeleton */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-28 bg-slate-200/80 rounded-full animate-pulse shrink-0" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs animate-pulse flex flex-col"
            >
              {/* Thumbnail */}
              <div className="w-full h-52 bg-slate-200" />

              <div className="p-6 flex flex-col flex-grow">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="h-5 w-24 bg-amber-100 rounded-full" />
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                </div>

                {/* Title */}
                <div className="h-6 w-full bg-slate-300 rounded-md mb-2" />
                <div className="h-6 w-4/5 bg-slate-300 rounded-md mb-4" />

                {/* Excerpt */}
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-slate-200 rounded mb-6" />

                {/* Author / Footer */}
                <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
