import React from "react";

export default function AIFormLibraryLoading() {
  return (
    <div className="min-h-screen bg-surface-main py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-pulse">
          <div className="h-4 w-32 bg-amber-200/50 rounded-full mx-auto mb-3" />
          <div className="h-10 w-3/4 bg-slate-300 rounded-2xl mx-auto mb-4" />
          <div className="h-4 w-2/3 bg-slate-200 rounded mx-auto mb-8" />

          {/* Search Bar Skeleton */}
          <div className="h-14 w-full max-w-2xl bg-white border border-slate-200 rounded-2xl mx-auto shadow-xs" />
        </div>

        {/* Categories Bar Skeleton */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-10 w-32 bg-slate-200 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Forms Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-24 bg-amber-100 rounded-lg" />
                  <div className="h-6 w-16 bg-slate-100 rounded-lg" />
                </div>
                <div className="h-6 w-full bg-slate-300 rounded mb-2" />
                <div className="h-6 w-4/5 bg-slate-300 rounded mb-4" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-3/4 bg-slate-200 rounded mb-6" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="h-4 w-20 bg-slate-200 rounded" />
                <div className="h-10 w-28 bg-slate-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
