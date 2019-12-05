import { TreeActionTypes, TreeState, UPDATE_SOURCE } from './types';

const initialState: TreeState = {
  source: `

Use indentation
  to indicate
    file
    and
    folder
    nesting
  - You can even
    - use
      - markdown
      - bullets!

`.trim(),
};

export function treeReducer(state = initialState, action: TreeActionTypes) {
  switch (action.type) {
    case UPDATE_SOURCE:
      return {
        source: action.source,
      };
    default:
      return state;
  }
}
