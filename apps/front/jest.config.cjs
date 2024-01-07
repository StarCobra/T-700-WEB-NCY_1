module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
    },
    testMatch: ['**/__tests__/**/*-test.tsx'],
    moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/identity-obj-proxy.js',
        '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/identity-obj-proxy.js',
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/',
    ],
};
