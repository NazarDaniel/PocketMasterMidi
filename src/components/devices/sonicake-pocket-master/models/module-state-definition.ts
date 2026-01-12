import type { bytesDefinition } from './bytes-definition';

export interface moduleStateDefinition {
  state: string;
  sysex_identifier: number;
  bytes: bytesDefinition;
}
