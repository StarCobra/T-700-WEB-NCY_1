module.exports = {
    verbose: false,
    notify: false,

    testEnvironment: "node",

    testMatch: ['**/__tests__/**/*-test.tsx'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        "\\.(css|scss)$": '<rootDir>/identity-obj-proxy.js',
        "\\.(png|jpg|jpeg|gif|svg)$": '<rootDir>/identity-obj-proxy.js',
    },
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
        '<rootDir>/build/',
    ]
};
