module.exports = {
  testTimeout: 30000,

  setupFiles: ["<rootDir>/test/jest.setup.js"],

  setupFilesAfterEnv: ['<rootDir>/test/setupAfterEnv.ts'],

  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    "<rootDir>/src/**/**/*.{js,ts}"
  ],

  coverageDirectory: "<rootDir>/test/coverage",

  coverageProvider: "v8",

  coverageReporters: ["text-summary", "lcov"],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },

  modulePathIgnorePatterns: ["providers"],

  preset: "ts-jest",

  testEnvironment: "node",

  testMatch: ["**/?(*.)(spec|test).ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
    ],
  },
};
