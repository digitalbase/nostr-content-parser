export default {
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$', // Tests pattern
    moduleFileExtensions: ['ts', 'tsx', 'js'],
};
