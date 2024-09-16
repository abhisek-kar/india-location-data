import { District } from "../../types";
import { validateString, logItemNotFound } from "../utils/errorHandler";

let districts: District[] = [];

// Initialize state data
export const init = (loadedDistricts: District[]) => {
  districts = loadedDistricts;
};

// Get districts by state ID
export const getDistrictsByStateId = (
  stateId: string
): Omit<District, "blockIds">[] => {
  try {
    validateString(stateId, "State ID");

    return districts
      .filter((district) => district.stateId === stateId)
      .map(({ blockIds, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving districts by state ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving districts by state ID."
      );
    }
    throw new Error("Failed to retrieve districts by state ID");
  }
};

// Get district by ID
export const getDistrictById = (
  id: string
): Omit<District, "blockIds"> | undefined => {
  try {
    validateString(id, "District ID");

    const district = districts.find((district) => district.id === id);
    if (district) {
      const { blockIds, ...rest } = district;
      return rest;
    }

    logItemNotFound(undefined, `District with ID ${id}`);
    return undefined;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving district by ID:", error.message);
    } else {
      console.error("Unknown error occurred while retrieving district by ID.");
    }
    throw new Error("Failed to retrieve district by ID");
  }
};
