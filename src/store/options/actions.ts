import { UPDATE_FANCY, UPDATE_FULL_PATH, UPDATE_TRAILING_SLASH } from './types';

export function updateFancy(newValue: boolean) {
  return {
    type: UPDATE_FANCY,
    newValue,
  };
}

export function updateFullPath(newValue: boolean) {
  return {
    type: UPDATE_FULL_PATH,
    newValue,
  };
}

export function updateTrailingSlash(newValue: boolean) {
  return {
    type: UPDATE_TRAILING_SLASH,
    newValue,
  };
}
