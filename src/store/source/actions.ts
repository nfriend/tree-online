import { UPDATE_SOURCE } from './types';

export function updateSource(newSource: string) {
  return {
    type: UPDATE_SOURCE,
    source: newSource,
  };
}
