"use client";

import { useState } from "react";

const presetEndpoints = [
  { label: "Все породы", path: "/api/breeds" },
  { label: "Поиск: Хаски", path: "/api/breeds?search=хаски" },
  { label: "Маленькие породы", path: "/api/breeds?size=small" },
  { label: "Случайная порода", path: "/api/breeds/random" },
  { label: "Статистика", path: "/api/stats" },
  { label: "Здоровье API", path: "/api/health" },
];

export function ApiPlayground() {
  const [endpoint, setEndpoint] = useState("/api/breeds?limit=5");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timing, setTiming] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setTiming(null);

    const startTime = performance.now();

    try {
      const res = await fetch(endpoint);
      const endTime = performance.now();
      setTiming(Math.round(endTime - startTime));

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (path: string) => {
    setEndpoint(path);
  };

  return (
    <div className="space-y-4">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {presetEndpoints.map((preset) => (
          <button
            key={preset.path}
            onClick={() => handlePreset(preset.path)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            GET
          </span>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-12 pr-4 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="/api/breeds"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Загрузка...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z" />
                <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z" />
                <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z" />
              </svg>
              Отправить
            </>
          )}
        </button>
      </form>

      {/* Response */}
      {(response || error) && (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${error ? "bg-destructive" : "bg-primary"}`}></div>
              <span className="text-sm font-medium">
                {error ? "Ошибка" : "Ответ"}
              </span>
            </div>
            {timing && (
              <span className="text-xs text-muted-foreground">
                {timing}ms
              </span>
            )}
          </div>
          <div className="max-h-96 overflow-auto p-4">
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <pre className="text-xs font-mono text-foreground">
                <code>{response}</code>
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
