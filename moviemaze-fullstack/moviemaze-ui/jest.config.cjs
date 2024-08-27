module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage", // Vores tests bliver logget til dette folder
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
  },
};
