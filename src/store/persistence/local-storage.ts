import { AppState } from '../index';
import { AppStatePlusVersion } from './AppStatePlusVersion';
import { CURRENT_SAVED_STATE_SCHEMA_VERSION, LS_KEY } from './constants';

/**
 * Retrieves the most recent saved state from localStorage.
 * If unsuccessful, returns `undefined`.
 */
export function getSavedStateFromLocalStorage():
  | AppStatePlusVersion
  | undefined {
  const rawSavedState = localStorage.getItem(LS_KEY);

  if (!rawSavedState) {
    return undefined;
  }

  try {
    const savedState = JSON.parse(rawSavedState) as AppStatePlusVersion;
    if (savedState.version !== CURRENT_SAVED_STATE_SCHEMA_VERSION) {
      return undefined;
    }

    delete savedState.version;

    return savedState;
  } catch (e) {
    return undefined;
  }
}

/**
 * Saves the provided state to localStorage
 * @param state The state to save
 */
export const saveStateToLocalStorage = (state: AppState): void => {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify({ ...state, version: CURRENT_SAVED_STATE_SCHEMA_VERSION }),
  );
};
