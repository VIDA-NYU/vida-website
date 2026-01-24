"use client";

import { useEffect, useState } from "react";

export type CitationEntry = {
  style: string;
  text: string;
};

type Props = {
  cite: CitationEntry[];
  bibtex: string;
};

export function PublicationCiteActions({ cite, bibtex }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleCopy = async () => {
    if (!bibtex) return;
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const hasCite = cite.length > 0;
  const hasBibtex = bibtex.trim().length > 0;

  if (!hasCite && !hasBibtex) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {hasCite && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Cite
          </button>
        )}
        {hasBibtex && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400"
          >
            {copied ? "Copied!" : "Copy BibTeX"}
          </button>
        )}
      </div>

      {hasCite && isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label="Close cite dialog"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Cite</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-500 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {cite.map((entry) => (
                <div key={entry.style} className="grid gap-3 sm:grid-cols-[90px_1fr]">
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {entry.style}
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
