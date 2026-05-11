import React from "react";
import { verdictStyles } from "../styles/verdictStyles";

export default function StaffCardOverlay({ profileNotice, selectedOrder, quantities, onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white px-5 py-7">
      <div className="mx-auto max-w-md space-y-4">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">請協助確認餐點</p>
          <h2 className="mt-1 text-2xl font-black text-stone-900">給餐廳人員看的點餐卡</h2>
          <p className="mt-1 text-xs text-stone-500">Show this screen directly to staff.</p>
        </div>

        <section className="rounded-2xl border-2 border-red-300 bg-red-50 p-4">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-red-700">重要飲食限制</p>
          <div className="space-y-2">
            {profileNotice.map((notice) => (
              <p key={notice} className="text-lg font-black leading-snug text-red-900">
                {notice}
              </p>
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold text-red-700">請確認食材、醬料、湯底、油品，以及是否可能交叉接觸。</p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-4">
          <p className="mb-3 text-xs font-black uppercase tracking-wider text-stone-400">想點的餐點</p>
          <div className="space-y-4">
            {selectedOrder.map((dish) => {
              const quantity = quantities[dish.id] || 1;
              const style = verdictStyles[dish.verdict];
              return (
                <div key={dish.id} className="border-b border-stone-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-xl font-black text-white">
                      x{quantity}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-3xl font-black leading-tight text-stone-900">{dish.localName}</p>
                      <p className="text-sm text-stone-400">{dish.name}</p>
                      <p className={`mt-2 rounded-xl border px-3 py-2 text-xs font-bold ${style.bg} ${style.text} ${style.card}`}>
                        {dish.verdict === "green"
                          ? "這道菜目前看起來符合我的飲食限制。"
                          : "這道菜可能有衝突，請先幫我確認後再製作。"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-black uppercase tracking-wider text-stone-400">Pronunciation guide</p>
          <p className="mt-2 text-sm font-bold text-stone-800">
            Qing bang wo que ren shi cai, jiang liao, tang di, hai you hui bu hui jiao cha jie chu.
          </p>
          <p className="mt-1 text-xs text-stone-500">Means: Please help me confirm ingredients, sauce, broth, and cross-contact.</p>
        </section>

        <button type="button" onClick={onClose} className="w-full rounded-2xl bg-stone-900 py-4 text-sm font-black text-white">
          Done
        </button>
      </div>
    </div>
  );
}
