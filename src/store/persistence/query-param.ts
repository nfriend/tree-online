import { AppState } from '..';
import { getParameterByName } from '../../third-party/get-parameter-by-name';
import { JSONCrush, JSONUncrush } from '../../third-party/JSONCrush';
import { AppStatePlusVersion } from './AppStatePlusVersion';
import { CURRENT_SAVED_STATE_SCHEMA_VERSION, QUERY_KEY } from './constants';

/**
 * Retrieves the most recent saved state from the query param.
 * If unsuccessful, returns `undefined`.
 */
export function getSavedStateFromQueryParam(): AppStatePlusVersion | undefined {
  const rawSavedState = getParameterByName(QUERY_KEY);

  if (!rawSavedState) {
    return undefined;
  }

  try {
    const uncrushedState = JSONUncrush(rawSavedState);
    const savedState = JSON.parse(uncrushedState) as AppStatePlusVersion;
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
 * Updates the query param with the provided state
 * @param state The state to save
 */
export const saveStateToQueryParam = (state: AppState): void => {
  const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  const crushedState = JSONCrush(
    JSON.stringify({ ...state, version: CURRENT_SAVED_STATE_SCHEMA_VERSION }),
  );
  const queryString = `${QUERY_KEY}=${crushedState}`;
  window.history.replaceState(state, '', `${baseUrl}?${queryString}`);
};
