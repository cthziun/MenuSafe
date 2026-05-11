import React from "react";
import ProfileButton from "../components/ProfileButton";
import { ALLERGENS, CONDITIONS, DIETARY } from "../data/dietaryRules";

export default function ProfileScreen({ profile, setProfile, toggleListValue, onContinue }) {
  return (
    <main className="space-y-4">
      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold">One-time health profile</h2>
            <p className="text-xs text-stone-500">Stored locally and reused for every scan.</p>
          </div>
          <select
            value={profile.severity}
            onChange={(event) => setProfile((current) => ({ ...current, severity: event.target.value }))}
            className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-2 text-xs font-semibold"
          >
            <option value="hard">Hard conflicts</option>
            <option value="soft">Soft caution</option>
          </select>
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Food allergies</p>
        <div className="grid grid-cols-3 gap-2">
          {ALLERGENS.map((item) => (
            <ProfileButton
              key={item.id}
              label={item.label}
              active={profile.allergens.includes(item.id)}
              onClick={() => toggleListValue("allergens", item.id)}
            />
          ))}
        </div>
        <input
          value={profile.customAllergens}
          onChange={(event) => setProfile((current) => ({ ...current, customAllergens: event.target.value }))}
          placeholder="Other allergies, comma separated"
          className="mt-3 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-teal-400"
        />
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Dietary requirements</p>
        <div className="grid grid-cols-2 gap-2">
          {DIETARY.map((item) => (
            <ProfileButton
              key={item.id}
              label={item.label}
              active={profile.dietary.includes(item.id)}
              onClick={() => toggleListValue("dietary", item.id)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Chronic condition</p>
        <div className="space-y-2">
          {CONDITIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setProfile((current) => ({ ...current, condition: item.id }))}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm font-semibold ${
                profile.condition === item.id
                  ? "border-teal-500 bg-teal-50 text-teal-800"
                  : "border-stone-200 bg-white text-stone-600"
              }`}
            >
              {item.label}
              {profile.condition === item.id && <span className="text-teal-600">✓</span>}
            </button>
          ))}
        </div>
        <textarea
          value={profile.conditionNote}
          onChange={(event) => setProfile((current) => ({ ...current, conditionNote: event.target.value }))}
          placeholder="Optional notes, e.g. low sodium, no raw food"
          className="mt-3 min-h-20 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-teal-400"
        />
      </section>

      <button type="button" onClick={onContinue} className="w-full rounded-2xl bg-teal-600 py-4 text-sm font-bold text-white shadow-sm">
        Continue to menu capture
      </button>
    </main>
  );
}
