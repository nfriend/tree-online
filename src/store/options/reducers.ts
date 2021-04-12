import { getSavedState } from '../persistence/saved-state';
import {
  OptionActionTypes,
  OptionsState,
  UPDATE_FANCY,
  UPDATE_FULL_PATH,
  UPDATE_ROOT_DOT,
  UPDATE_TRAILING_SLASH,
} from './types';

const defaultState: OptionsState = {
  fancy: true,
  fullPath: false,
  trailingSlash: true,
  rootDot: true,
};

const savedState = getSavedState();

const initialState = savedState ? savedState.options : defaultState;

export function optionsReducer(
  state = initialState,
  action: OptionActionTypes,
): OptionsState {
  switch (action.type) {
    case UPDATE_FANCY:
      return {
        ...state,
        fancy: action.newValue,
      };
    case UPDATE_FULL_PATH:
      return {
        ...state,
        fullPath: action.newValue,
      };
    case UPDATE_TRAILING_SLASH:
      return {
        ...state,
        trailingSlash: action.newValue,
      };
    case UPDATE_ROOT_DOT:
      return {
        ...state,
        rootDot: action.newValue,
      };
    default:
      return state;
  }
}
