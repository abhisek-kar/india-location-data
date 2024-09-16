import { City } from "../../types";
import { validateString, logItemNotFound } from "../utils/errorHandler";

let cities: City[] = [];

// Initialize state data
export const init = (loadedCities: City[]) => {
  cities = loadedCities;
};

// Get cities by state ID
export const getCitiesByStateId = (stateId: string): City[] => {
  try {
    validateString(stateId, "State ID");

    return cities.filter((city) => city.stateId === stateId);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving cities by state ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving cities by state ID."
      );
    }
    throw new Error("Failed to retrieve cities by state ID");
  }
};

// Get city by ID
export const getCityById = (id: string): City | undefined => {
  try {
    validateString(id, "City ID");

    const city = cities.find((city) => city.id === id);
    logItemNotFound(city, `City with ID ${id}`);

    return city;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving city by ID:", error.message);
    } else {
      console.error("Unknown error occurred while retrieving city by ID.");
    }
    throw new Error("Failed to retrieve city by ID");
  }
};
