import React from "react";
import PipelineStep from "./PipelineStep";

export default function AppHeader({ screen, onReset }) {
  return (
    <header className="mb-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">MENUsafe</p>
          <h1 className="text-xl font-bold tracking-normal">Profile-driven menu safety</h1>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-500"
        >
          Reset
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-stone-200 bg-white p-3">
        <PipelineStep number="1" title="Profile" active={screen === 1} done={screen > 1} />
        <PipelineStep number="2" title="Capture" active={screen === 2} done={screen > 2} />
        <PipelineStep number="3" title="Decide" active={screen >= 3} done={false} />
      </div>
    </header>
  );
}
