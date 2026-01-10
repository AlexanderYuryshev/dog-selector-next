import type { DogBreed } from "./models";
import { GROUP_OPTIONS, type BreedFilters } from "./filter-options";

export function filterBreeds(
  breeds: DogBreed[],
  filters: BreedFilters,
): DogBreed[] {
  return breeds?.filter((breed) => {
    // Size filter
    if (filters.sizes.length > 0) {
      const size = getBreedSize(breed);
      if (!filters.sizes.includes(size)) return false;
    }

    // Group filter
    if (filters.groups.length > 0) {
      if (!breed.group || !filters.groups.includes(breed.group)) return false;
    }

    // Coat type filter
    if (filters.coatTypes.length > 0) {
      if (!breed.coat_type || !filters.coatTypes.includes(breed.coat_type))
        return false;
    }

    // Coat length filter
    if (filters.coatLengths.length > 0) {
      if (
        !breed.coat_length ||
        !filters.coatLengths.includes(breed.coat_length)
      )
        return false;
    }

    // Energy level filter
    if (filters.energyLevels.length > 0) {
      if (breed.energy_level_value == null) return false;
      if (!filters.energyLevels.includes(String(breed.energy_level_value)))
        return false;
    }

    // Shedding filter
    if (filters.sheddingLevels.length > 0) {
      if (breed.shedding_value == null) return false;
      if (!filters.sheddingLevels.includes(String(breed.shedding_value)))
        return false;
    }

    // Trainability filter
    if (filters.trainabilityLevels.length > 0) {
      if (breed.trainability_value == null) return false;
      if (
        !filters.trainabilityLevels.includes(String(breed.trainability_value))
      )
        return false;
    }

    // Good with children filter
    if (filters.goodWithChildren !== null) {
      const childrenScore = breed.children_suitability ?? null;
      if (filters.goodWithChildren) {
        if (childrenScore == null || childrenScore < 4) return false;
      } else {
        if (childrenScore != null && childrenScore >= 4) return false;
      }
    }

    // Good with other dogs filter
    if (filters.goodWithOtherDogs !== null) {
      const dogsScore = breed.good_with_other_dogs ?? null;
      if (filters.goodWithOtherDogs) {
        if (dogsScore == null || dogsScore < 4) return false;
      } else {
        if (dogsScore != null && dogsScore >= 4) return false;
      }
    }

    return true;
  });
}

export function getBreedSize(breed: DogBreed): string {
  // Use average weight to determine size
  const avgWeight =
    breed.min_weight != null && breed.max_weight != null
      ? (breed.min_weight + breed.max_weight) / 2
      : (breed.min_weight ?? breed.max_weight ?? 0);

  if (avgWeight < 10) return "small";
  if (avgWeight < 25) return "medium";
  if (avgWeight < 45) return "large";
  return "giant";
}

export function getBreedGroup(breed: DogBreed): string {
  return GROUP_OPTIONS.find((item) => item.value === breed.group)?.label ?? "";
}
