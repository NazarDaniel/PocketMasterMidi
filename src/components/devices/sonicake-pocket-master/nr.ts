import type { bytesDefinition } from './models/bytes-definition';

export class nr {
  states: moduleStateDefinitions[] = [
    {
      state: 'on',
      sysex_identifier: 1,
      bytes: {},
    },
    {
      state: 'off',
      sysex_identifier: 0,
      bytes: {
        0: 10,
        2: 1,
        6: 10,
        7: 1,
        8: 1,
        9: 4,
        10: 9,
      },
    },
  ];
}

interface moduleStateDefinitions {
  state: string;
  sysex_identifier: number;
  bytes: bytesDefinition;
}
