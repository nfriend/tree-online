import { AppState } from '..';

/** An interface that adds the "version" property to the AppState interface */
export interface AppStatePlusVersion extends AppState {
  version: string;
}
