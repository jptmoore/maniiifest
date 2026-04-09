module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/specification.ts',
    '!src/iiif-types.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 90,
    },
  },
};
