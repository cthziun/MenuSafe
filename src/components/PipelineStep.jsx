import React from "react";

export default function PipelineStep({ number, title, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
          active ? "bg-teal-600 text-white" : done ? "bg-teal-100 text-teal-700" : "bg-stone-200 text-stone-500"
        }`}
      >
        {done ? "✓" : number}
      </div>
      <span className={`text-xs font-medium ${active ? "text-stone-800" : "text-stone-400"}`}>{title}</span>
    </div>
  );
}
