// Filter options derived from the breed data model
export const SIZE_OPTIONS = [
  { value: "small", label: "Маленький (до 10 кг)" },
  { value: "medium", label: "Средний (10-25 кг)" },
  { value: "large", label: "Большой (25-45 кг)" },
  { value: "giant", label: "Гигантский (45+ кг)" },
];

export const COAT_TYPE_OPTIONS = [
  { value: "Smooth", label: "Гладкая" },
  { value: "Wiry", label: "Жёсткая" },
  { value: "Double", label: "Двойная" },
  { value: "Curly", label: "Кудрявая" },
  { value: "Silky", label: "Шелковистая" },
  { value: "Rough", label: "Грубая" },
  { value: "Hairless", label: "Бесшёрстная" },
];

export const COAT_LENGTH_OPTIONS = [
  { value: "Short", label: "Короткая" },
  { value: "Medium", label: "Средняя" },
  { value: "Long", label: "Длинная" },
];

export const ENERGY_LEVEL_OPTIONS = [
  { value: "1", label: "Очень спокойный" },
  { value: "2", label: "Спокойный" },
  { value: "3", label: "Умеренный" },
  { value: "4", label: "Активный" },
  { value: "5", label: "Очень активный" },
];

export const SHEDDING_OPTIONS = [
  { value: "1", label: "Минимальная" },
  { value: "2", label: "Низкая" },
  { value: "3", label: "Сезонная" },
  { value: "4", label: "Регулярная" },
  { value: "5", label: "Интенсивная" },
];

export const TRAINABILITY_OPTIONS = [
  { value: "1", label: "Сложная" },
  { value: "2", label: "Умеренно сложная" },
  { value: "3", label: "Средняя" },
  { value: "4", label: "Лёгкая" },
  { value: "5", label: "Очень лёгкая" },
];

export const GROUP_OPTIONS = [
  { value: "Sporting Group", label: "Охотничьи" },
  { value: "Hound Group", label: "Гончие" },
  { value: "Working Group", label: "Рабочие" },
  { value: "Terrier Group", label: "Терьеры" },
  { value: "Toy Group", label: "Комнатно-декоративные" },
  { value: "Non-Sporting Group", label: "Неохотничьи " },
  { value: "Herding Group", label: "Пастушьи" },
  { value: "Foundation Stock Service", label: "Редкие породы" },
];

export interface BreedFilters {
  sizes: string[];
  coatTypes: string[];
  coatLengths: string[];
  energyLevels: string[];
  sheddingLevels: string[];
  trainabilityLevels: string[];
  groups: string[];
  goodWithChildren: boolean | null;
  goodWithOtherDogs: boolean | null;
}

export const DEFAULT_FILTERS: BreedFilters = {
  sizes: [],
  coatTypes: [],
  coatLengths: [],
  energyLevels: [],
  sheddingLevels: [],
  trainabilityLevels: [],
  groups: [],
  goodWithChildren: null,
  goodWithOtherDogs: null,
};

export function hasActiveFilters(filters: BreedFilters): boolean {
  return (
    filters.sizes.length > 0 ||
    filters.coatTypes.length > 0 ||
    filters.coatLengths.length > 0 ||
    filters.energyLevels.length > 0 ||
    filters.sheddingLevels.length > 0 ||
    filters.trainabilityLevels.length > 0 ||
    filters.groups.length > 0 ||
    filters.goodWithChildren !== null ||
    filters.goodWithOtherDogs !== null
  );
}
