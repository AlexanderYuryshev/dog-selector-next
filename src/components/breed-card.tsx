"use client";

import Link from "next/link";
import type { DogBreed } from "@/lib/models";
import { RatingStars } from "./rating-stars";
import { getBreedGroup, getBreedSize } from "@/lib/filter-breeds";
import { SIZE_OPTIONS } from "@/lib/filter-options";
import Image from "next/image";
import { toSnakeCase } from "@/lib/utils";

interface BreedCardProps {
  breed: DogBreed;
}

export function BreedCard({ breed }: BreedCardProps) {
  const lifespan =
    breed.min_expectancy && breed.max_expectancy
      ? `${breed.min_expectancy}–${breed.max_expectancy} лет`
      : "—";

  return (
    <article className="group bg-card border-border hover:border-primary/30 overflow-hidden rounded-xl border transition-all hover:shadow-lg">
      <Link href={`/breeds/${breed.id}`} className="block">
        {/* Image (placeholder пока нет image в модели) */}
        <div className="bg-muted relative aspect-square overflow-hidden">
          <Image
            src={`/images/${toSnakeCase(breed.breed)}.jpg`}
            alt={`Собака породы ${breed.breed}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes="100vw"
            width={0}
            height={0}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="bg-card/90 text-foreground rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
              {
                SIZE_OPTIONS.find((item) => item.value === getBreedSize(breed))
                  ?.label
              }
            </span>

            {breed.children_suitability != null &&
              breed.children_suitability >= 4 && (
                <span className="bg-primary text-muted rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
                  Подходит для детей
                </span>
              )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="group-hover:text-primary text-lg leading-tight font-semibold transition-colors">
              {breed.breed}
            </h3>

            <span className="text-muted-foreground text-xs whitespace-nowrap">
              {lifespan}
            </span>
          </div>

          {breed.group && (
            <p className="text-muted-foreground mb-3 text-sm">
              Группа: {getBreedGroup(breed)}
            </p>
          )}

          {/* Quick stats */}
          <div className="mb-3 space-y-2">
            {breed.affectionate_level != null && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">
                  Дружелюбие
                </span>
                <RatingStars rating={breed.affectionate_level} />
              </div>
            )}

            {breed.trainability_value != null && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">
                  Обучаемость
                </span>
                <RatingStars rating={breed.trainability_value} />
              </div>
            )}
            {breed.energy_level_value != null && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">
                  Энергичность
                </span>
                <RatingStars rating={breed.energy_level_value} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
