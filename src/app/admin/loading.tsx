import React from "react";

export default function AdminLoading() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-64 bg-slate-300 rounded-xl" />
          <div className="h-4 w-96 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-12 w-28 bg-slate-100 rounded-2xl" />
          <div className="h-12 w-28 bg-slate-100 rounded-2xl" />
        </div>
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
        <div className="h-10 w-96 bg-slate-100 rounded-xl" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="h-8 w-full bg-slate-100 rounded-xl" />
        {[1, 2, 3, 4, 5, 6].map((row) => (
          <div key={row} className="flex items-center justify-between gap-4 py-3 border-b border-slate-100">
            <div className="h-5 w-40 bg-slate-200 rounded" />
            <div className="h-5 w-32 bg-slate-200 rounded" />
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-5 w-64 bg-slate-200 rounded" />
            <div className="h-6 w-24 bg-amber-100 rounded-xl" />
            <div className="h-8 w-20 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
