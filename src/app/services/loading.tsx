import React from "react";

export default function ServicesLoading() {
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

      {/* Grid 9 Cards Skeleton */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-5" />
                <div className="h-6 w-3/4 bg-slate-300 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-5/6 bg-slate-200 rounded mb-6" />
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 flex-1 bg-slate-200 rounded-xl" />
                <div className="h-10 flex-1 bg-slate-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
