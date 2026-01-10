import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ЛапаМатч - Найдите Идеальную Породу Собаки",
    template: "%s | ЛапаМатч",
  },
  description:
    "Откройте для себя идеальную породу собаки для вашего образа жизни с нашим комплексным инструментом выбора породы. Фильтруйте по размеру, уровню активности, пригодности и многому другому.",
  keywords: [
    "породы собак",
    "поиск питомца",
    "выбор собаки",
    "сравнение пород",
    "усыновление питомца",
  ],
  authors: [{ name: "ЛапаМатч" }],
  openGraph: {
    title: "ЛапаМатч - Найдите Идеальную Породу Собаки",
    description:
      "Откройте для себя идеальную породу собаки для вашего образа жизни",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ЛапаМатч - Найдите Идеальную Породу Собаки",
    description:
      "Откройте для себя идеальную породу собаки для вашего образа жизни",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1918" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
