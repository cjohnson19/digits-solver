// Sync object
const config = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['build'],
};
export default config;
