module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!jest.config.js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/index.js",
    "src/reportWebVitals.js"
  ],
  coverageReporters: ["lcov", "text", "json-summary"], // 👈 nuevo
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  }
};
