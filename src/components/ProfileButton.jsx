import React from "react";

export default function ProfileButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
        active
          ? "border-teal-600 bg-teal-600 text-white"
          : "border-stone-200 bg-white text-stone-600 hover:border-teal-300 hover:bg-teal-50"
      }`}
    >
      {label}
    </button>
  );
}
