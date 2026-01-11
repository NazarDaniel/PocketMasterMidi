export default [
  {
    id: 1,
    nr: {
      state: 'on',
      threshold: 10,
    },
    fx1: {
      state: 'off',
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
    },
    fx1: {
      state: 'off',
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
