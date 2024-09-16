import * as fs from "fs";
import * as path from "path";
import { Block, City, District, State, Village } from "../../types";

// Asynchronous data loading with error handling
export const loadData = async () => {
  try {
    const [statesData, districtsData, blocksData, villagesData, citiesData] =
      await Promise.all([
        fs.promises.readFile(
          path.resolve(__dirname, "../data/states.json"),
          "utf-8"
        ),
        fs.promises.readFile(
          path.resolve(__dirname, "../data/districts.json"),
          "utf-8"
        ),
        fs.promises.readFile(
          path.resolve(__dirname, "../data/blocks.json"),
          "utf-8"
        ),
        fs.promises.readFile(
          path.resolve(__dirname, "../data/villages.json"),
          "utf-8"
        ),
        fs.promises.readFile(
          path.resolve(__dirname, "../data/cities.json"),
          "utf-8"
        ),
      ]);

    return {
      States: JSON.parse(statesData) as State[],
      Districts: JSON.parse(districtsData) as District[],
      Blocks: JSON.parse(blocksData) as Block[],
      Villages: JSON.parse(villagesData) as Village[],
      Cities: JSON.parse(citiesData) as City[],
    };
  } catch (error) {
    console.error(
      "Error loading data:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw new Error("Failed to load data");
  }
};

// const States = readData("../data/states.json");
// const Districts = readData("../data/districts.json");
// const Blocks = readData("../data/blocks.json");
// const Villages = readData("../data/villages.json");
// const Cities = readData("../data/cities.json");
