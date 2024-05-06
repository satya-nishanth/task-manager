const tsconfig = require("./tsconfig.json")
const tsconfigpaths = require("tsconfig-paths")
tsconfigpaths.register()

const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)

module.exports = {
  preset: 'ts-jest',
    testEnvironment: 'node',
  setupFiles: ["./src/test/env-setup.ts"],
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    moduleDirectories: ['node_modules', 'src'],
};