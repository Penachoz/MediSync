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
    "!src/index.js",               // excluye index.js
    "!src/reportWebVitals.js",    // excluye métricas
    "!jest.config.js"             // por si Jest lo incluye desde src (aunque debería estar fuera)
  ],
  coveragePathIgnorePatterns: [   // asegura que se ignoren del coverage aunque estén importados
    "/node_modules/",
    "src/index.js",
    "src/reportWebVitals.js"
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  }
};
