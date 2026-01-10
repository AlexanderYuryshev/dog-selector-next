import type { DogBreed } from "@/lib/models";
import { RatingStars } from "./rating-stars";
import { getBreedGroup } from "@/lib/filter-breeds";
import Image from "next/image";
import { toSnakeCase } from "@/lib/utils";

interface BreedDetailProps {
  breed: DogBreed;
}

export function BreedDetail({ breed }: BreedDetailProps) {
  return (
    <article>
      {/* Hero */}
      <div className="bg-muted relative mb-6 aspect-video overflow-hidden rounded-xl">
        <Image
          src={`/images/${toSnakeCase(breed.breed)}.jpg`}
          alt={`Собака породы ${breed.breed}`}
          className="h-full w-full object-cover"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>

      {/* Title */}
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">{breed.breed}</h1>

        {breed.group && (
          <p className="text-muted-foreground">
            Группа: {getBreedGroup(breed)}
          </p>
        )}
      </header>

      {/* Description */}
      {breed.description && (
        <p className="mb-8 text-lg leading-relaxed">{breed.description}</p>
      )}

      {/* Temperament */}
      {breed.temperament && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Темперамент</h2>

          <div className="flex flex-wrap gap-2">
            {breed.temperament.split(",").map((trait) => (
              <span
                key={trait}
                className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm"
              >
                {trait.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Physical data */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Section title="Размер и физические данные">
          <Row label="Рост">
            {range(breed.min_height, breed.max_height, "см")}
          </Row>
          <Row label="Вес">
            {range(breed.min_weight, breed.max_weight, "кг")}
          </Row>
          <Row label="Продолжительность жизни">
            {range(breed.min_expectancy, breed.max_expectancy, "лет")}
          </Row>
        </Section>

        <Section title="Шерсть и уход">
          <Row label="Тип шерсти">{breed.coat_type ?? "—"}</Row>
          <Row label="Длина шерсти">{breed.coat_length ?? "—"}</Row>
          <Row label="Линька">{breed.shedding_category ?? "—"}</Row>
          <Row label="Уход">{breed.grooming_frequency_category ?? "—"}</Row>
        </Section>
      </div>

      {/* StatComponent */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Характер и поведение</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <StatComponent label="Дружелюбие" value={breed.affectionate_level} />
          <StatComponent label="Обучаемость" value={breed.trainability_value} />
          <StatComponent label="Игривость" value={breed.playfulness_level} />
          <StatComponent
            label="Охранные качества"
            value={breed.protective_level}
          />
          <StatComponent
            label="Отношение к незнакомым людям"
            value={breed.demeanor_value}
          />
          <StatComponent label="Лай" value={breed.barking_level} />
        </div>
      </section>

      {/* Activity */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Активность</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <StatComponent label="Энергия" value={breed.energy_level_value} />
          <StatComponent
            label="Адаптивность"
            value={breed.adaptability_level}
          />
          <StatComponent label="Слюнотечение" value={breed.drooling_level} />
        </div>
      </section>

      {/* Suitability */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Подходит для</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <StatComponent label="Детей" value={breed.children_suitability} />
          <StatComponent
            label="Других собак"
            value={breed.good_with_other_dogs}
          />
        </div>
      </section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-xl border p-6">
      <h3 className="mb-4 font-semibold">{title}</h3>
      <dl className="space-y-3">{children}</dl>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

function StatComponent({
  label,
  value,
}: {
  label: string;
  value?: number | null;
}) {
  if (value == null) return null;
  return (
    <div className="bg-secondary/50 rounded-lg p-4">
      <p className="text-muted-foreground mb-2 text-sm">{label}</p>
      <RatingStars rating={value} />
    </div>
  );
}

function range(min?: number | null, max?: number | null, unit?: string) {
  if (min == null || max == null) return "—";
  if (min === max) return `~${min.toFixed(1)} ${unit}`;
  return `${min.toFixed(1)} - ${max.toFixed(1)} ${unit}`;
}
