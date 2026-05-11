import React from "react";
import { verdictStyles } from "../styles/verdictStyles";

export default function DishCard({ dish, expanded, selected, onToggleExpanded, onToggleSelected }) {
  const style = verdictStyles[dish.verdict];
  const isMustTryConflict = dish.mustTry && dish.verdict !== "green";

  return (
    <article
      className={`overflow-hidden rounded-2xl border-2 bg-white shadow-sm ${
        isMustTryConflict ? "border-red-400" : selected ? "border-teal-500" : style.card
      }`}
    >
      <div className="flex gap-3 p-4">
        <button
          type="button"
          onClick={onToggleSelected}
          className={`mt-1 h-6 w-6 rounded-lg border-2 text-xs font-black ${
            selected ? "border-teal-600 bg-teal-600 text-white" : "border-stone-300 bg-white text-transparent"
          }`}
          aria-label={`Select ${dish.name}`}
        >
          ✓
        </button>
        <button type="button" onClick={onToggleExpanded} className="min-w-0 flex-1 text-left">
          <div className="flex flex-wrap items-start gap-2">
            <h2 className="text-base font-black leading-tight text-stone-900">{dish.localName}</h2>
            <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${style.bg} ${style.text} ${style.card}`}>
              {dish.verdictLabel}
            </span>
            {dish.mustTry && (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
                Must Try
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-stone-400">{dish.name}</p>
          {isMustTryConflict ? (
            <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
              Must Try × Conflict: popular dish, but it clashes with your profile.
            </p>
          ) : (
            <p className="mt-2 text-xs leading-relaxed text-stone-600">{dish.summary}</p>
          )}
        </button>
        <div className="text-right">
          <p className={`text-lg font-black ${style.text}`}>{dish.confidence}%</p>
          <p className="text-[10px] font-semibold uppercase text-stone-400">confidence</p>
        </div>
      </div>

      {expanded && (
        <div className={`mx-3 mb-3 rounded-2xl border p-3 ${style.bg} ${style.card}`}>
          <p className={`text-xs font-bold ${style.text}`}>{dish.source}</p>
          <p className="mt-1 text-xs leading-relaxed text-stone-700">{dish.recommendation}</p>

          <div className="mt-3">
            <p className="mb-1 text-xs font-bold text-stone-600">Detected ingredients</p>
            <div className="flex flex-wrap gap-1">
              {dish.ingredients.map((ingredient) => (
                <span key={ingredient} className="rounded-full border border-white/70 bg-white px-2 py-1 text-xs text-stone-700">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1 text-xs font-bold text-stone-600">Evidence</p>
            {dish.findings.length ? (
              <div className="space-y-2">
                {dish.findings.map((finding, index) => (
                  <div key={`${finding.ingredient}-${index}`} className="rounded-xl bg-white px-3 py-2 text-xs text-stone-700">
                    <p className="font-bold">
                      Layer {finding.layer}: {finding.ingredient}
                    </p>
                    <p>{finding.reason}</p>
                    <p className="mt-1 text-stone-400">
                      {finding.source} · {Math.round(finding.confidence * 100)}%
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-white px-3 py-2 text-xs text-stone-600">
                No direct conflict found in the structured rule base.
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
