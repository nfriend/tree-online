export interface TreeState {
  source: string;
}

export const UPDATE_SOURCE = 'UPDATE_SOURCE';

interface UpdateSourceAction {
  type: typeof UPDATE_SOURCE;
  source: string;
}

export type TreeActionTypes = UpdateSourceAction;
