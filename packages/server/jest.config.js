module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/test/firestore.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'rules'],
  testEnvironment: 'jest-environment-uint8array',
  moduleNameMapper: {
    '^~mock/(.*)$': '<rootDir>/../share/__mock__/'
  }
}
