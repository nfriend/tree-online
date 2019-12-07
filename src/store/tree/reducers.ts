import { generateTree } from '../../lib/generate-tree';
import { parseInput } from '../../lib/parse-input';
import { TreeActionTypes, TreeState, UPDATE_SOURCE } from './types';

const source = `

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

`.trim();

const tree = generateTree(parseInput(source));

const initialState: TreeState = {
  source,
  tree,
};

export function treeReducer(state = initialState, action: TreeActionTypes) {
  switch (action.type) {
    case UPDATE_SOURCE:
      return {
        source: action.source,
        tree: generateTree(parseInput(action.source)),
      };
    default:
      return state;
  }
}
