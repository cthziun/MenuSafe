import React from "react";

export default function QuantityControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="h-8 w-8 rounded-lg bg-stone-100 text-stone-700 font-bold"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        max="99"
        value={value}
        onChange={(event) => onChange(Math.max(1, Math.min(99, Number(event.target.value) || 1)))}
        className="h-8 w-12 rounded-lg border border-stone-200 text-center text-sm font-bold"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="h-8 w-8 rounded-lg bg-stone-100 text-stone-700 font-bold"
      >
        +
      </button>
    </div>
  );
}
