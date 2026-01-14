export default [
  {
    id: 1,
    nr: {
      state: 'on',
      params: {
        0: 10, // threshold
      },
    },
    fx1: {
      state: 'on',
      params: {
        0: 10,
        1: 20,
      },
    },
    drive: {
      state: 'on',
      params: {
        1: 1, // type
        2: 50, // gain
        3: 70, // tone
        4: 60, // volume
      },
    },
    eq: {
      state: 'off',
    },
    fx2: {
      state: 'off',
    },
    delay: {
      state: 'off',
    },
    reverb: {
      state: 'off',
    },
    volume: 80,
  },
  {
    id: 2,
    nr: {
      state: 'off',
      params: {
        0: 20, // threshold
      },
    },
    fx1: {
      state: 'off',
      params: {
        0: 20,
        1: 30,
      },
    },
    drive: {
      state: 'on',
      params: {
        1: 1, // type
        2: 50, // gain
        3: 70, // tone
        4: 60, // volume
      },
    },
    eq: {
      state: 'off',
    },
    fx2: {
      state: 'off',
    },
    delay: {
      state: 'off',
    },
    reverb: {
      state: 'off',
    },
    volume: 80,
  },
];
