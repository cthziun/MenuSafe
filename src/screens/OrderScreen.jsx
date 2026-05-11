import React from "react";
import QuantityControl from "../components/QuantityControl";
import { verdictStyles } from "../styles/verdictStyles";

export default function OrderScreen({ selectedOrder, quantities, onBack, onSetQuantity, onShowStaffCard }) {
  return (
    <main className="space-y-4">
      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">Your order</h2>
            <p className="text-xs text-stone-500">Quantities and risks are shown before staff view.</p>
          </div>
          <button type="button" onClick={onBack} className="text-xs font-bold text-teal-700">
            Edit
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {selectedOrder.map((dish) => {
            const style = verdictStyles[dish.verdict];
            const quantity = quantities[dish.id] || 1;
            return (
              <div key={dish.id} className={`rounded-2xl border p-3 ${style.bg} ${style.card}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-stone-900">{dish.localName}</p>
                    <p className="text-xs text-stone-500">{dish.name}</p>
                    <p className={`mt-1 text-xs font-bold ${style.text}`}>
                      {dish.verdictLabel}: {dish.summary}
                    </p>
                  </div>
                  <QuantityControl value={quantity} onChange={(value) => onSetQuantity(dish.id, value)} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        disabled={!selectedOrder.length}
        onClick={onShowStaffCard}
        className="w-full rounded-2xl bg-stone-900 py-4 text-sm font-black text-white disabled:opacity-40"
      >
        Generate staff communication card
      </button>

      <button type="button" onClick={onBack} className="w-full py-2 text-sm font-semibold text-stone-400">
        Back to results
      </button>
    </main>
  );
}
