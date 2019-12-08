import { AppState } from '..';
import { AppStatePlusVersion } from './AppStatePlusVersion';

/**
 * Retrieves the most recent saved state from the query param.
 * If unsuccessful, returns `undefined`.
 */
export function getSavedStateFromQueryParam(): AppStatePlusVersion | undefined {
  // TODO
  return undefined;
}

/**
 * Updates the query param with the provided state
 * @param state The state to save
 */
export const saveStateToQueryParam = (state: AppState): void => {
  // TODO
};
