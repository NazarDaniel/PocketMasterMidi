export class nr {
  states = [
    {
      state: 'on',
      sysex_identifier: 1,
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
