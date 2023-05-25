const { defineConfig, config } = require("cypress");

const env = Object.assign(require('./cypress.env.json'), process.env)

const { CypressTestlink } = require('./testlinkAgent')
const testlinkEnabled = env.TESTLINK_ENABLED || process.env.TESTLINK_ENABLED
const jenkinsBuildId = env.BUILD_ID || process.env.BUILD
const testlink = new CypressTestlink(env);

async function retrieveTestCasesForTestPlan() {
    return 'tbd'
}

const resolvedConfig = retrieveTestCasesForTestPlan().then((testCases) => {
    return defineConfig({
        retries: 2,
        reporter: 'junit',
        reporterOptions: {
            mochaFile: `results/${jenkinsBuildId}-test-output.xml`,
            toConsole: false,
        },
        chromeWebSecurity: false,
        screenshotOnRunFailure: true,
        e2e: {
            setupNodeEvents(on, config) {
                return config
            },
        },
    });
})

module.exports = resolvedConfig