import { BreedSelectorSkeleton } from "@/components/breed-selector-skeleton";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BreedSelectorSkeleton />
      </main>
      <Footer />
    </div>
  );
}
