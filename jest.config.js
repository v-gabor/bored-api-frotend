module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setup.ts"],
  // transform: { "^.*\\.js$": "babel-jest" },
  // transformIgnorePatterns: ["node_modules/(?!vue-router|@babel|vuetify)"],
};
