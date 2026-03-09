import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ApiPlayground } from "@/components/api-playground";

export const metadata: Metadata = {
  title: "API Документация",
  description: "Документация REST API для работы с данными о породах собак",
};

const endpoints = [
  {
    method: "GET",
    path: "/api/breeds",
    description: "Получить список всех пород собак с возможностью фильтрации",
    parameters: [
      { name: "search", type: "string", description: "Поиск по названию породы" },
      { name: "group", type: "string", description: "Фильтр по группе пород" },
      { name: "size", type: "string", description: "Фильтр по размеру (small, medium, large, giant)" },
      { name: "limit", type: "number", description: "Максимальное количество результатов (по умолчанию 100)" },
      { name: "offset", type: "number", description: "Смещение для пагинации" },
    ],
    response: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "breed": "Акита-ину",
      "description": "...",
      "group": "Working Group",
      ...
    }
  ],
  "pagination": {
    "total": 200,
    "limit": 100,
    "offset": 0,
    "hasMore": true
  }
}`,
  },
  {
    method: "GET",
    path: "/api/breeds/[id]",
    description: "Получить информацию о конкретной породе по ID",
    parameters: [
      { name: "id", type: "number", description: "ID породы (в URL пути)" },
    ],
    response: `{
  "success": true,
  "data": {
    "id": 1,
    "breed": "Акита-ину",
    "description": "Крупная собака с благородной осанкой...",
    "temperament": "Alert, Responsive, Dignified...",
    "group": "Working Group",
    "min_weight": 32,
    "max_weight": 45,
    "energy_level_value": 4,
    ...
  }
}`,
  },
  {
    method: "GET",
    path: "/api/breeds/search",
    description: "Расширенный поиск с множественными критериями",
    parameters: [
      { name: "q", type: "string", description: "Поисковый запрос" },
      { name: "children", type: "boolean", description: "Подходит для детей" },
      { name: "dogs", type: "boolean", description: "Ладит с другими собаками" },
      { name: "minEnergy", type: "number", description: "Минимальный уровень энергии (1-5)" },
      { name: "maxEnergy", type: "number", description: "Максимальный уровень энергии (1-5)" },
      { name: "trainability", type: "number", description: "Минимальная обучаемость (1-5)" },
    ],
    response: `{
  "success": true,
  "data": [...],
  "meta": {
    "query": "лабрадор",
    "filters": {
      "goodWithChildren": true,
      "goodWithDogs": true,
      "energyRange": [3, 5],
      "trainability": 4
    },
    "resultCount": 3
  }
}`,
  },
  {
    method: "GET",
    path: "/api/breeds/random",
    description: "Получить случайную породу собаки",
    parameters: [
      { name: "count", type: "number", description: "Количество случайных пород (макс. 10)" },
    ],
    response: `{
  "success": true,
  "data": {
    "id": 42,
    "breed": "Золотистый ретривер",
    ...
  },
  "meta": {
    "requestedCount": 1,
    "totalAvailable": 200
  }
}`,
  },
  {
    method: "GET",
    path: "/api/stats",
    description: "Статистика по базе данных пород",
    parameters: [],
    response: `{
  "success": true,
  "data": {
    "totalBreeds": 200,
    "averageLifespan": 11.5,
    "groupDistribution": [
      { "group": "Sporting Group", "count": 35 },
      { "group": "Working Group", "count": 30 },
      ...
    ],
    "sizeDistribution": [
      { "size": "medium", "count": 80 },
      { "size": "large", "count": 60 },
      ...
    ]
  },
  "generatedAt": "2026-03-08T12:00:00.000Z"
}`,
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Проверка состояния API и подключения к базе данных",
    parameters: [],
    response: `{
  "status": "healthy",
  "timestamp": "2026-03-08T12:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "checks": {
    "database": {
      "status": "connected",
      "latency": "5ms"
    }
  },
  "uptime": 3600
}`,
  },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-primary/10 text-primary",
    POST: "bg-accent/10 text-accent",
    PUT: "bg-chart-4/20 text-chart-4",
    DELETE: "bg-destructive/10 text-destructive",
  };
  
  return (
    <span className={`rounded-md px-2 py-1 text-xs font-mono font-semibold ${colors[method] || "bg-secondary text-foreground"}`}>
      {method}
    </span>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-secondary/50 to-background px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clipRule="evenodd" />
              </svg>
              REST API
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              API Документация
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              REST API для доступа к данным о породах собак. 
              Все эндпоинты возвращают JSON и поддерживают фильтрацию и пагинацию.
            </p>
          </div>
        </section>

        {/* Base URL */}
        <section className="border-b border-border px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Base URL</h2>
                <p className="text-sm text-muted-foreground">Все запросы к API начинаются с этого URL</p>
              </div>
              <code className="rounded-lg bg-secondary px-4 py-2 font-mono text-sm">
                {typeof window !== "undefined" ? window.location.origin : ""}/api
              </code>
            </div>
          </div>
        </section>

        {/* Rate Limiting Info */}
        <section className="border-b border-border bg-secondary/30 px-4 py-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
              <div className="rounded-lg bg-accent/10 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-accent">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Rate Limiting</h3>
                <p className="text-sm text-muted-foreground">
                  API ограничен до 100 запросов в минуту на IP-адрес. Заголовки ответа включают 
                  <code className="mx-1 rounded bg-secondary px-1">X-RateLimit-Limit</code> и 
                  <code className="mx-1 rounded bg-secondary px-1">X-RateLimit-Remaining</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* API Playground */}
        <section className="border-b border-border px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold">API Playground</h2>
              <p className="text-muted-foreground">Попробуйте API прямо в браузере</p>
            </div>
            <ApiPlayground />
          </div>
        </section>

        {/* Endpoints */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-bold">Эндпоинты</h2>
            <div className="space-y-8">
              {endpoints.map((endpoint, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                  id={endpoint.path.replace(/[\[\]\/]/g, "-")}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b border-border bg-secondary/30 px-6 py-4">
                    <MethodBadge method={endpoint.method} />
                    <code className="font-mono text-sm font-medium">{endpoint.path}</code>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="mb-6 text-muted-foreground">{endpoint.description}</p>

                    {/* Parameters */}
                    {endpoint.parameters.length > 0 && (
                      <div className="mb-6">
                        <h4 className="mb-3 font-semibold">Параметры</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="pb-2 text-left font-medium text-muted-foreground">Имя</th>
                                <th className="pb-2 text-left font-medium text-muted-foreground">Тип</th>
                                <th className="pb-2 text-left font-medium text-muted-foreground">Описание</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param) => (
                                <tr key={param.name} className="border-b border-border/50 last:border-0">
                                  <td className="py-2 font-mono text-primary">{param.name}</td>
                                  <td className="py-2 text-muted-foreground">{param.type}</td>
                                  <td className="py-2">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Response */}
                    <div>
                      <h4 className="mb-3 font-semibold">Пример ответа</h4>
                      <div className="overflow-hidden rounded-lg border border-border bg-secondary/30">
                        <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span className="text-xs text-muted-foreground">200 OK</span>
                        </div>
                        <pre className="overflow-x-auto p-4 text-xs">
                          <code className="text-foreground">{endpoint.response}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
