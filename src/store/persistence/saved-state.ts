import { AppState } from '../index';
import { AppStatePlusVersion } from './AppStatePlusVersion';
import {
  getSavedStateFromLocalStorage,
  saveStateToLocalStorage,
} from './local-storage';
import {
  getSavedStateFromQueryParam,
  saveStateToQueryParam,
} from './query-param';

/**
 * Retrieves the most recent saved state
 * If unsuccessful (or no saved state found), returns undefined
 */
export function getSavedState(): AppStatePlusVersion | undefined {
  const localStorageState = getSavedStateFromLocalStorage();
  const queryParamState = getSavedStateFromQueryParam();

  return queryParamState || localStorageState;
}

/**
 * Saves the provided state
 * @param state The state to save
 */
export const saveState = (state: AppState): void => {
  saveStateToQueryParam(state);
  saveStateToLocalStorage(state);
};
