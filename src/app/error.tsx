"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="px-4 text-center">
          <div className="bg-destructive/10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-destructive h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mx-auto mb-6 max-w-md">
            {
              "We encountered an error while loading this page. Please try again."
            }
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium transition-opacity hover:opacity-90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-6 py-3 font-medium transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
