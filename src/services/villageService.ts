import { Block, District, Village } from "../../types";
import { validateString, logItemNotFound } from "../utils/errorHandler";

let villages: Village[] = [];
let blocks: Block[] = [];
let districts: District[] = [];

// Initialize the service with required data
export const init = (
  loadedVillages: Village[],
  loadedBlocks: Block[],
  loadedDistricts: District[]
) => {
  villages = loadedVillages;
  blocks = loadedBlocks;
  districts = loadedDistricts;
};

// Get villages by block ID
export const getVillagesByBlockId = (
  blockId: string
): Omit<Village, "blockId">[] => {
  try {
    validateString(blockId, "Block ID");

    return villages
      .filter((village) => village.blockId === blockId)
      .map(({ blockId, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving villages by block ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving villages by block ID."
      );
    }
    throw new Error("Failed to retrieve villages by block ID");
  }
};

// Get villages by state ID
export const getVillagesByStateId = (
  stateId: string
): Omit<Village, "blockId">[] => {
  try {
    validateString(stateId, "State ID");

    const districtIds = districts
      .filter((district) => district.stateId === stateId)
      .flatMap((district) => district.blockIds);

    const blockIds = blocks
      .filter((block) => districtIds.includes(block.id))
      .map((block) => block.id);

    return villages
      .filter((village) => blockIds.includes(village.blockId))
      .map(({ blockId, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving villages by state ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving villages by state ID."
      );
    }
    throw new Error("Failed to retrieve villages by state ID");
  }
};

// Get villages by district ID
export const getVillagesByDistrictId = (
  districtId: string
): Omit<Village, "blockId">[] => {
  try {
    validateString(districtId, "District ID");

    const districtIds = districts
      .filter((district) => district.id === districtId)
      .flatMap((district) => district.blockIds);

    const blockIds = blocks
      .filter((block) => districtIds.includes(block.id))
      .map((block) => block.id);

    return villages
      .filter((village) => blockIds.includes(village.blockId))
      .map(({ blockId, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving villages by district ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving villages by district ID."
      );
    }
    throw new Error("Failed to retrieve villages by district ID");
  }
};

// Get village by ID
export const getVillageById = (
  id: string
): Omit<Village, "blockId"> | undefined => {
  try {
    validateString(id, "Village ID");

    const village = villages.find((village) => village.id === id);
    logItemNotFound(village, `Village with ID ${id}`);

    if (village) {
      const { blockId, ...rest } = village;
      return rest;
    }
    return undefined;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving village by ID:", error.message);
    } else {
      console.error("Unknown error occurred while retrieving village by ID.");
    }
    throw new Error("Failed to retrieve village by ID");
  }
};
