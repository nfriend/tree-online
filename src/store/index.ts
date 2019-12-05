import { combineReducers, createStore } from 'redux';

import { optionsReducer } from './options/reducers';
import { treeReducer } from './tree/reducers';

const rootReducer = combineReducers({
  options: optionsReducer,
  tree: treeReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const store = createStore(rootReducer);

  return store;
};
