import React from "react";
import { DEMO_OCR_TEXT } from "../data/menuKnowledgeBase";

export default function CaptureScreen({
  files,
  ocrText,
  isAnalyzing,
  profileSummary,
  onBack,
  onFiles,
  onSetOcrText,
  onAnalyze,
}) {
  return (
    <main className="space-y-4">
      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="mb-3 rounded-xl bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-800">
          Active profile: {profileSummary}
        </div>
        <h2 className="text-sm font-bold">Menu capture</h2>
        <p className="mt-1 text-xs text-stone-500">
          Supports one photo, multiple pages, and screenshots. This prototype simulates OCR with auditable demo text.
        </p>

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 px-4 py-8 text-center hover:border-teal-400 hover:bg-teal-50">
          <span className="text-sm font-bold text-stone-700">Upload or photograph menu</span>
          <span className="mt-1 text-xs text-stone-400">JPG, PNG, or screenshot · multiple files allowed</span>
          <input type="file" accept="image/*" multiple capture="environment" onChange={onFiles} className="hidden" />
        </label>

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {files.map((file) => (
              <div key={file.url} className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                <img src={file.url} alt={file.name} className="h-24 w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">OCR text</p>
            <button type="button" onClick={() => onSetOcrText(DEMO_OCR_TEXT)} className="text-xs font-bold text-teal-700">
              Fill demo OCR
            </button>
          </div>
          <textarea
            value={ocrText}
            onChange={(event) => onSetOcrText(event.target.value)}
            placeholder="Extracted menu text appears here. You can paste menu text for testing."
            className="min-h-36 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-teal-400"
          />
        </div>
      </section>

      {isAnalyzing ? (
        <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5 text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
          <p className="text-sm font-bold text-teal-900">Running two-layer safety analysis</p>
          <p className="mt-1 text-xs text-teal-700">Layer 1 rules first, then AI reasoning for ambiguous ingredients.</p>
        </section>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAnalyze(false)}
            disabled={!ocrText.trim()}
            className="rounded-2xl bg-teal-600 py-4 text-sm font-bold text-white disabled:opacity-40"
          >
            Analyze menu
          </button>
          <button
            type="button"
            onClick={() => onAnalyze(true)}
            className="rounded-2xl border border-teal-200 bg-white py-4 text-sm font-bold text-teal-700"
          >
            Use demo menu
          </button>
        </div>
      )}

      <button type="button" onClick={onBack} className="w-full py-2 text-sm font-semibold text-stone-400">
        Back to profile
      </button>
    </main>
  );
}
