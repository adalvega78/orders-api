module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./src/tests/config/setEnvVars.js"]
};
