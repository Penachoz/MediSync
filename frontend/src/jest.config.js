module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)"
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy"
    }
  };
  