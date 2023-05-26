const { defineConfig, config } = require("cypress");

const env = Object.assign(require('./cypress.env.json'), process.env)

const { CypressTestlink } = require('./testlinkAgent')
const testlinkEnabled = env.TESTLINK_ENABLED || process.env.TESTLINK_ENABLED
const jenkinsBuildId = env.BUILD_ID || process.env.BUILD
const testlink = new CypressTestlink(env);

async function retrieveTestCasesForTestPlan() {
    return testlink.retrieveTestCasesForTestPlan()
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
                if (testlinkEnabled === true){
                    const extracted = Object.values(testCases).map(result => result[0]['full_external_id']).join(' ')
                    config.env.grepTags = extracted
                    config.env.testlinkEnabled = testlinkEnabled
                }
                return config
            },
        },
    });
})

module.exports = resolvedConfig