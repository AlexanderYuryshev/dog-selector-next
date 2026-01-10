import { Suspense } from "react";
import { Header } from "@/components/header";
import { BreedSelector } from "@/components/breed-selector";
import { Footer } from "@/components/footer";
import { BreedSelectorSkeleton } from "@/components/breed-selector-skeleton";
import { getBreeds } from "@/lib/server-actions";
import type { DogBreed } from "@/lib/models";

export default async function Home() {
  const breeds = await getBreeds();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<BreedSelectorSkeleton />}>
          <BreedSelector breeds={breeds as DogBreed[]} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
