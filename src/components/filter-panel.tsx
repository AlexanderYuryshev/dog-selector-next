"use client";

import { CheckboxGroup } from "./checkbox-group";
import { ToggleFilter } from "./toggle-filter";
import {
  SIZE_OPTIONS,
  COAT_TYPE_OPTIONS,
  COAT_LENGTH_OPTIONS,
  ENERGY_LEVEL_OPTIONS,
  SHEDDING_OPTIONS,
  TRAINABILITY_OPTIONS,
  GROUP_OPTIONS,
  type BreedFilters,
  hasActiveFilters,
} from "@/lib/filter-options";

interface FilterPanelProps {
  filters: BreedFilters;
  onFilterChange: <K extends keyof BreedFilters>(
    key: K,
    value: BreedFilters[K],
  ) => void;
  onReset: () => void;
  onClose: () => void;
}

export function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  onClose,
}: FilterPanelProps) {
  const activeFiltersCount = countActiveFilters(filters);

  return (
    <div className="border-border bg-card animate-in slide-in-from-top-2 mb-8 overflow-hidden rounded-xl border duration-200">
      {/* Header */}
      <div className="border-border bg-secondary/30 flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Фильтры</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters(filters) && (
            <button
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg px-3 py-1.5 text-sm transition-colors"
              type="button"
            >
              Сбросить всё
            </button>
          )}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg p-2 transition-colors"
            type="button"
            aria-label="Закрыть фильтры"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Size */}
          <FilterSection title="Размер">
            <CheckboxGroup
              label=""
              options={SIZE_OPTIONS}
              value={filters.sizes}
              onChange={(value) => onFilterChange("sizes", value)}
            />
          </FilterSection>

          {/* Breed Group */}
          <FilterSection title="Группа пород">
            <CheckboxGroup
              label=""
              options={GROUP_OPTIONS}
              value={filters.groups}
              onChange={(value) => onFilterChange("groups", value)}
            />
          </FilterSection>

          {/* Coat Type */}
          <FilterSection title="Тип шерсти">
            <CheckboxGroup
              label=""
              options={COAT_TYPE_OPTIONS}
              value={filters.coatTypes}
              onChange={(value) => onFilterChange("coatTypes", value)}
            />
          </FilterSection>

          {/* Coat Length */}
          <FilterSection title="Длина шерсти">
            <CheckboxGroup
              label=""
              options={COAT_LENGTH_OPTIONS}
              value={filters.coatLengths}
              onChange={(value) => onFilterChange("coatLengths", value)}
            />
          </FilterSection>

          {/* Energy Level */}
          <FilterSection title="Уровень активности">
            <CheckboxGroup
              label=""
              options={ENERGY_LEVEL_OPTIONS}
              value={filters.energyLevels}
              onChange={(value) => onFilterChange("energyLevels", value)}
            />
          </FilterSection>

          {/* Trainability */}
          <FilterSection title="Обучаемость">
            <CheckboxGroup
              label=""
              options={TRAINABILITY_OPTIONS}
              value={filters.trainabilityLevels}
              onChange={(value) => onFilterChange("trainabilityLevels", value)}
            />
          </FilterSection>

          {/* Shedding */}
          <FilterSection title="Линька">
            <CheckboxGroup
              label=""
              options={SHEDDING_OPTIONS}
              value={filters.sheddingLevels}
              onChange={(value) => onFilterChange("sheddingLevels", value)}
            />
          </FilterSection>

          {/* Suitability */}
          <FilterSection title="Совместимость">
            <div className="space-y-2">
              <ToggleFilter
                label="Подходит для детей"
                value={filters.goodWithChildren}
                onChange={(value) => onFilterChange("goodWithChildren", value)}
              />
              <ToggleFilter
                label="Ладит с другими собаками"
                value={filters.goodWithOtherDogs}
                onChange={(value) => onFilterChange("goodWithOtherDogs", value)}
              />
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Footer - Mobile Apply Button */}
      <div className="border-border bg-secondary/30 flex items-center justify-between border-t px-6 py-4 md:hidden">
        <span className="text-muted-foreground text-sm">
          {activeFiltersCount > 0
            ? `Выбрано фильтров: ${activeFiltersCount}`
            : "Фильтры не выбраны"}
        </span>
        <button
          onClick={onClose}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          type="button"
        >
          Применить
        </button>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="text-foreground flex items-center gap-2 text-sm font-medium">
        {title}
      </div>
      <div className="scrollbar-thin max-h-48 overflow-y-auto pr-2">
        {children}
      </div>
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
