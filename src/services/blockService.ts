import { Block, District } from "../../types";
import { validateString, logItemNotFound } from "../utils/errorHandler";

let districts: District[] = [];
let blocks: Block[] = [];

// Initialize state data
export const init = (loadedDistricts: District[], loadedBlocks: Block[]) => {
  districts = loadedDistricts;
  blocks = loadedBlocks;
};

// Get blocks by district ID
export const getBlocksByDistrictId = (
  districtId: string
): Omit<Block, "districtId" | "villageIds">[] => {
  try {
    validateString(districtId, "District ID");

    return blocks
      .filter((block) => block.districtId === districtId)
      .map(({ districtId, villageIds, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving blocks by district ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving blocks by district ID."
      );
    }
    throw new Error("Failed to retrieve blocks by district ID");
  }
};

// Get blocks by state ID
export const getBlocksByStateId = (
  stateId: string
): Omit<Block, "districtId" | "villageIds">[] => {
  try {
    validateString(stateId, "State ID");

    const districtIds = districts
      .filter((district) => district.stateId === stateId)
      .flatMap((district) => district.blockIds);

    return blocks
      .filter((block) => districtIds.includes(block.id))
      .map(({ districtId, villageIds, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving blocks by state ID:", error.message);
    } else {
      console.error(
        "Unknown error occurred while retrieving blocks by state ID."
      );
    }
    throw new Error("Failed to retrieve blocks by state ID");
  }
};

// Get block by ID
export const getBlockById = (
  id: string
): Omit<Block, "districtId" | "villageIds"> | undefined => {
  try {
    validateString(id, "Block ID");

    const block = blocks.find((block) => block.id === id);
    if (block) {
      const { districtId, villageIds, ...rest } = block;
      return rest;
    }

    logItemNotFound(undefined, `Block with ID ${id}`);
    return undefined;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving block by ID:", error.message);
    } else {
      console.error("Unknown error occurred while retrieving block by ID.");
    }
    throw new Error("Failed to retrieve block by ID");
  }
};
