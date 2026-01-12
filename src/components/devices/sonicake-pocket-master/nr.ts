import type { bytesDefinition } from './models/bytes-definition';
import type { moduleStateDefinition } from './models/module-state-definition';

export class nr {
  states: moduleStateDefinition[] = [
    {
      state: 'on',
      sysex_identifier: 1,
      bytes: {
        0: 12,
        2: 1,
        6: 10,
        7: 1,
        8: 1,
        9: 4,
        10: 9,
        20: 1,
        26: 0,
      },
      // [12, 0, 1, 0, 0, 0, 10, 1, 1, 4, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
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
        26: 0,
      },
    },
  ];
}
