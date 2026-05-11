import React from "react";
import DishCard from "../components/DishCard";
import { verdictStyles } from "../styles/verdictStyles";

export default function ResultsScreen({
  results,
  profileSummary,
  expandedDish,
  selectedDishes,
  onSetExpandedDish,
  onToggleDish,
  onReviewOrder,
}) {
  return (
    <main className="space-y-3 pb-24">
      <section className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Applied profile</p>
        <p className="mt-1 text-sm font-bold text-stone-800">{profileSummary}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["green", "yellow", "red"].map((verdict) => {
            const style = verdictStyles[verdict];
            const count = results.filter((dish) => dish.verdict === verdict).length;
            return (
              <div key={verdict} className={`rounded-xl border px-3 py-2 ${style.bg} ${style.card}`}>
                <div className={`mb-1 h-2 w-2 rounded-full ${style.dot}`} />
                <p className={`text-xs font-bold capitalize ${style.text}`}>{verdict}</p>
                <p className="text-lg font-black">{count}</p>
              </div>
            );
          })}
        </div>
      </section>

      {results.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          expanded={expandedDish === dish.id}
          selected={selectedDishes.includes(dish.id)}
          onToggleExpanded={() => onSetExpandedDish(expandedDish === dish.id ? null : dish.id)}
          onToggleSelected={() => onToggleDish(dish.id)}
        />
      ))}

      {selectedDishes.length > 0 && (
        <div className="fixed inset-x-0 bottom-5 z-30 flex justify-center px-4">
          <button
            type="button"
            onClick={onReviewOrder}
            className="w-full max-w-md rounded-2xl bg-stone-900 px-5 py-4 text-sm font-black text-white shadow-xl"
          >
            Review order and staff card ({selectedDishes.length})
          </button>
        </div>
      )}
    </main>
  );
}
