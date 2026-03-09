import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Возможности",
  description: "Изучите все возможности Next.js 16, демонстрируемые в проекте ЛапаМатч",
};

const featureCategories = [
  {
    title: "Маршрутизация",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z" clipRule="evenodd" />
      </svg>
    ),
    features: [
      { name: "App Router", description: "Современная система маршрутизации с поддержкой вложенных макетов" },
      { name: "Динамические маршруты", description: "Параметризованные пути вроде /breeds/[id]" },
      { name: "Route Groups", description: "Организация маршрутов без влияния на URL" },
      { name: "Параллельные маршруты", description: "Одновременный рендеринг нескольких страниц" },
    ],
  },
  {
    title: "Рендеринг",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
      </svg>
    ),
    features: [
      { name: "Server Components", description: "Компоненты, выполняющиеся на сервере для лучшей производительности" },
      { name: "Client Components", description: "Интерактивные компоненты с 'use client'" },
      { name: "Streaming", description: "Прогрессивный рендеринг с Suspense" },
      { name: "Static Generation", description: "Предварительная генерация страниц при сборке" },
    ],
  },
  {
    title: "Data Fetching",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" />
      </svg>
    ),
    features: [
      { name: "Server Actions", description: "Серверные функции, вызываемые из клиента" },
      { name: "Route Handlers", description: "API эндпоинты в app/api директории" },
      { name: "Кэширование", description: "Автоматическое кэширование fetch запросов" },
      { name: "Ревалидация", description: "On-demand и time-based обновление кэша" },
    ],
  },
  {
    title: "Оптимизации",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
      </svg>
    ),
    features: [
      { name: "Image Optimization", description: "Автоматическая оптимизация изображений с next/image" },
      { name: "Font Optimization", description: "Оптимизация шрифтов с next/font" },
      { name: "Script Optimization", description: "Умная загрузка скриптов с next/script" },
      { name: "Metadata API", description: "SEO оптимизация через метаданные" },
    ],
  },
  {
    title: "Middleware",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
      </svg>
    ),
    features: [
      { name: "Request Middleware", description: "Обработка запросов перед рендерингом" },
      { name: "Rate Limiting", description: "Ограничение количества запросов" },
      { name: "Security Headers", description: "Добавление заголовков безопасности" },
      { name: "Request Logging", description: "Логирование и аналитика запросов" },
    ],
  },
  {
    title: "Стилизация",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.5-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
      </svg>
    ),
    features: [
      { name: "Tailwind CSS", description: "Utility-first CSS фреймворк" },
      { name: "CSS Modules", description: "Модульные стили с локальной областью видимости" },
      { name: "Dark Mode", description: "Поддержка тёмной темы" },
      { name: "Responsive Design", description: "Адаптивный дизайн для всех устройств" },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-secondary/50 to-background px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Возможности Next.js 16
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Полный обзор функций фреймворка, демонстрируемых в этом проекте. 
              От серверных компонентов до middleware — всё в одном месте.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featureCategories.map((category) => (
                <div
                  key={category.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      {category.icon}
                    </div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {category.features.map((feature) => (
                      <li key={feature.name} className="group">
                        <div className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="mt-1 h-4 w-4 flex-shrink-0 text-primary"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <span className="font-medium group-hover:text-primary transition-colors">
                              {feature.name}
                            </span>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="border-t border-border bg-secondary/30 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">Пример Route Handler</h2>
              <p className="text-muted-foreground">
                Создание API эндпоинтов с помощью Route Handlers
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/50"></div>
                  <div className="h-3 w-3 rounded-full bg-accent/50"></div>
                  <div className="h-3 w-3 rounded-full bg-primary/50"></div>
                </div>
                <span className="text-sm text-muted-foreground">app/api/breeds/route.ts</span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm">
                <code className="text-foreground">{`import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  
  const breeds = await db.breed.findMany({
    where: search ? {
      breed: { contains: search, mode: "insensitive" }
    } : undefined,
    orderBy: { breed: "asc" }
  });

  return NextResponse.json({
    success: true,
    data: breeds
  });
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Попробуйте API</h2>
            <p className="mb-8 text-muted-foreground">
              Изучите документацию API и начните использовать данные о породах собак
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/api-docs"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                API Документация
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium transition-colors hover:bg-secondary"
              >
                Каталог пород
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
