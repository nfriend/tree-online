import { combineReducers, createStore } from 'redux';
import { createSelector } from 'reselect';
import { generateTree } from '../lib/generate-tree';
import { parseInput } from '../lib/parse-input';
import { optionsReducer } from './options/reducers';
import { OptionsState } from './options/types';
import { saveState } from './persistence/saved-state';
import { sourceReducer } from './source/reducers';
import { SourceState } from './source/types';

const rootReducer = combineReducers({
  options: optionsReducer,
  source: sourceReducer,
});

export interface AppState {
  options: OptionsState;
  source: SourceState;
}

const getSource = (state: AppState) => state.source.source;
const getOptions = (state: AppState) => state.options;

export const getTree = createSelector(
  [getSource, getOptions],
  (source, options) =>
    generateTree(parseInput(source), {
      charset: options.fancy ? 'utf-8' : 'ascii',
      fullPath: options.fullPath,
      trailingDirSlash: options.trailingSlash,
      rootDot: options.rootDot,
    }),
);

export const configureStore = () => {
  const store = createStore(rootReducer);

  let currentState: AppState;
  function onStateUpdated() {
    const previousState = currentState;
    currentState = store.getState();

    if (previousState !== currentState) {
      saveState(currentState);
    }
  }

  store.subscribe(onStateUpdated);

  return store;
};
