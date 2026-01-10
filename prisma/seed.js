import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
});
const prisma = new PrismaClient({ adapter });

function parseFloatOrNull(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

function parseStringOrNull(value) {
  return value === "" || value === "null" || value === "NULL" ? null : value;
}

async function importDogs() {
  const dogs = [];

  fs.createReadStream("prisma/breed_data.csv")
    .pipe(csv())
    .on("data", (row) => {
      dogs.push(row);
    })
    .on("end", async () => {
      console.log(`Прочитано ${dogs.length} записей из CSV файла`);

      try {
        console.log("Начинаем импорт в базу данных...");

        for (const dog of dogs) {
          const dogData = {
            breed: dog.breed,
            description: parseStringOrNull(dog.description),
            temperament: parseStringOrNull(dog.temperament),
            min_height: parseFloatOrNull(dog.min_height),
            max_height: parseFloatOrNull(dog.max_height),
            min_weight: parseFloatOrNull(dog.min_weight),
            max_weight: parseFloatOrNull(dog.max_weight),
            min_expectancy: parseFloatOrNull(dog.min_expectancy),
            max_expectancy: parseFloatOrNull(dog.max_expectancy),
            group: parseStringOrNull(dog.group),
            grooming_frequency_value: parseFloatOrNull(
              dog.grooming_frequency_value,
            ),
            grooming_frequency_category: parseStringOrNull(
              dog.grooming_frequency_category,
            ),
            shedding_value: parseFloatOrNull(dog.shedding_value),
            shedding_category: parseStringOrNull(dog.shedding_category),
            energy_level_value: parseFloatOrNull(dog.energy_level_value),
            energy_level_category: parseStringOrNull(dog.energy_level_category),
            trainability_value: parseFloatOrNull(dog.trainability_value),
            trainability_category: parseStringOrNull(dog.trainability_category),
            demeanor_value: parseFloatOrNull(dog.demeanor_value),
            demeanor_category: parseStringOrNull(dog.demeanor_category),
            affectionate_level: parseFloatOrNull(dog.affectionate_level),
            children_suitability: parseFloatOrNull(dog.children_suitability),
            good_with_other_dogs: parseFloatOrNull(dog.good_with_other_dogs),
            drooling_level: parseFloatOrNull(dog.drooling_level),
            coat_type: parseStringOrNull(dog.coat_type),
            coat_length: parseStringOrNull(dog.coat_length),
            playfulness_level: parseFloatOrNull(dog.playfulness_level),
            protective_level: parseFloatOrNull(dog.protective_level),
            adaptability_level: parseFloatOrNull(dog.adaptability_level),
            barking_level: parseFloatOrNull(dog.barking_level),
            mental_stimulation_needs: parseStringOrNull(
              dog.mental_stimulation_needs,
            ),
          };

          try {
            await prisma.breed.create({
              data: dogData,
            });
            console.log(`Импортирована порода: ${dog.breed}`);
          } catch (error) {
            console.error(`Ошибка при импорте породы ${dog.breed}:`, error);
          }
        }

        console.log("Импорт завершен успешно!");
      } catch (error) {
        console.error("Ошибка при импорте данных:", error);
      } finally {
        await prisma.$disconnect();
      }
    })
    .on("error", (error) => {
      console.error("Ошибка при чтении CSV файла:", error);
    });
}

importDogs().catch(console.error);
