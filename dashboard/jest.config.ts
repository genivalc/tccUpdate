export default {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: [
        '**/*.spec.js'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest'
    }
}
