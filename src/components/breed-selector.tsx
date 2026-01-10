"use client";

import { useState, useTransition, useMemo } from "react";
import { FilterPanel } from "./filter-panel";
import { BreedGrid } from "./breed-grid";
import type { DogBreed } from "@/lib/models";
import {
  DEFAULT_FILTERS,
  hasActiveFilters,
  type BreedFilters,
} from "@/lib/filter-options";
import { filterBreeds } from "@/lib/filter-breeds";

interface Props {
  breeds: DogBreed[];
}

export function BreedSelector({ breeds }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<BreedFilters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");

  const [isPending] = useTransition();

  const filteredBreeds = useMemo(() => {
    if (!breeds) {
      return;
    }
    let result = filterBreeds(breeds, filters);

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (breed) =>
          breed.breed.toLowerCase().includes(query) ??
          breed.temperament?.toLowerCase().includes(query) ??
          breed.group?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [breeds, filters, searchQuery]);

  const handleFilterChange = <K extends keyof BreedFilters>(
    key: K,
    value: BreedFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const activeFiltersExist = hasActiveFilters(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-balance">
          Найдите идеального компаньона
        </h1>
        <p className="text-muted-foreground">
          Подбор породы с учётом образа жизни и условий проживания
        </p>
      </section>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Найти породу"
            className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border py-3 pr-4 pl-12 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setIsFilterOpen((v) => !v)}
          className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
            isFilterOpen || activeFiltersExist
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              : "bg-primary text-primary-foreground"
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Фильтры</span>
          {activeFiltersExist && (
            <span className="bg-primary-foreground/20 ml-1 rounded px-1.5 py-0.5 text-xs">
              {countActiveFilters(filters)}
            </span>
          )}
        </button>
      </div>

      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {/* Results count */}
      <div className="text-muted-foreground mb-6 flex items-center justify-between">
        <span>
          {filteredBreeds
            ? `Найдено пород: ${filteredBreeds?.length}`
            : "Загрузка..."}
        </span>
        {activeFiltersExist && !isFilterOpen && (
          <button
            onClick={handleResetFilters}
            className="text-primary text-sm hover:underline"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {filteredBreeds ? (
        <BreedGrid breeds={filteredBreeds} isLoading={isPending} />
      ) : null}
    </div>
  );
}

function countActiveFilters(filters: BreedFilters): number {
  let count = 0;
  count += filters.sizes.length;
  count += filters.coatTypes.length;
  count += filters.coatLengths.length;
  count += filters.energyLevels.length;
  count += filters.sheddingLevels.length;
  count += filters.trainabilityLevels.length;
  count += filters.groups.length;
  if (filters.goodWithChildren !== null) count++;
  if (filters.goodWithOtherDogs !== null) count++;
  return count;
}
