import { State } from "../../types";
import { validateString, logItemNotFound } from "../utils/errorHandler";

let states: State[] = [];

// Initialize state data
export const init = (loadedStates: State[]) => {
  states = loadedStates;
};

// Get all states
export const getStates = (): Omit<State, "districtIds">[] => {
  try {
    return states.map(({ districtIds, ...rest }) => rest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving states:", error.message);
    } else {
      console.error("Unknown error occurred while retrieving states.");
    }
    throw new Error("Failed to retrieve states");
  }
};

// Get state by ID
export const getStateById = (
  id: string
): Omit<State, "districtIds"> | undefined => {
  try {
    validateString(id, "State ID");
    const state = states.find((state) => state.id === id);
    logItemNotFound(state, "State");
    if (state) {
      const { districtIds, ...rest } = state;
      return rest;
    }
    return undefined;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error retrieving state by ID:", error.message);
    } else {
      console.error("Unknown error occurred while retrieving state by ID.");
    }
    throw new Error("Failed to retrieve state by ID");
  }
};
