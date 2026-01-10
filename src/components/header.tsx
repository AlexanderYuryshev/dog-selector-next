"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="bg-card/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-primary-foreground h-6 w-6"
              >
                <path d="M4.5 9.75a.75.75 0 0 0-.75.75V15c0 .414.336.75.75.75h6.75A.75.75 0 0 0 12 15v-4.5a.75.75 0 0 0-.75-.75H4.5Z" />
                <path
                  fillRule="evenodd"
                  d="M3.75 6.75a3 3 0 0 1 3-3h10.5a3 3 0 0 1 3 3v10.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.75Zm3-1.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-foreground text-xl font-bold">ЛапаМатч</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
