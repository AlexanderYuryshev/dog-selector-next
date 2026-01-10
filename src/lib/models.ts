export interface DogBreed {
  id: number;
  breed: string;
  description?: string | null;
  temperament?: string | null;
  group?: string | null;

  min_height?: number | null;
  max_height?: number | null;
  min_weight?: number | null;
  max_weight?: number | null;
  min_expectancy?: number | null;
  max_expectancy?: number | null;

  coat_type?: string | null;
  coat_length?: string | null;
  grooming_frequency_value?: number | null;
  grooming_frequency_category?: string | null;
  shedding_value?: number | null;
  shedding_category?: string | null;

  energy_level_value?: number | null;
  energy_level_category?: string | null;
  trainability_value?: number | null;
  trainability_category?: string | null;
  demeanor_value?: number | null;
  demeanor_category?: string | null;

  affectionate_level?: number | null;
  children_suitability?: number | null;
  good_with_other_dogs?: number | null;
  drooling_level?: number | null;
  playfulness_level?: number | null;
  protective_level?: number | null;
  adaptability_level?: number | null;
  barking_level?: number | null;
  mental_stimulation_needs?: number | null;
  image?: string | null;
}
