const { TestLink } = require("testlink-xmlrpc");
const { ExecutionType } = require("testlink-xmlrpc/build/constants");

const env = Object.assign(require('./cypress.env.json'), process.env)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

/**
 * Creates json ready to write to the cypress.env.json file
 * with testlink related configuration
 * @param {string} planName name of plan to execute
 * @param {string} buildName name of build that should be created
 * @return {string} json ready to write to cypress.env.json file with testlink configuration
 */
async function makeTestlinkBuildForGivenSuites(planName = "New Plan", buildName = `Build${getRandomInt(1, 2000)}`) {
    // create test plan
    const testlink = new CypressTestlink(env)
    testPlanId = await testlink.createTestPlan(planName)

    // create build under test plan
    buildId = await testlink.createBuild(testPlanId,buildName)

    // retrieve test cases for given suites
    testCases = await testlink.getTestCasesInSuite()
    // assign test cases to plan
    await testlink.addTestCaseToTestPlan(testPlanId,testCases)
        // return config data for cypress
    return JSON.stringify({
        "TESTLINK_PROJECT_ID": testlink.projectId,
        "TESTLINK_ENABLED": true,
        "TESTLINK_PLAN_ID": testPlanId,
        "TESTLINK_BUILD_ID": buildId
    })
}

/**
 * Creates json ready to write to the cypress.env.json file
 * with testlink related configuration
 * @param {string} planName name of plan to execute
 * @param {number} buildId id of build you would like to execute
 * @return {string} json ready to write to cypress.env.json file with testlink configuration
 */
async function makeTestlinkConfigForExistingBuild(planName, buildId) {
    // get plan id
    const testlink = new CypressTestlink(env)
    testPlanId = await testlink.createTestPlan(planName)
    return JSON.stringify({
        "TESTLINK_PROJECT_ID": testlink.projectId,
        "TESTLINK_ENABLED": true,
        "TESTLINK_PLAN_ID": testPlanId,
        "TESTLINK_BUILD_ID": buildId
    })
}



class CypressTestlink {
    constructor(tenv) {
        this.projectName = tenv.TESTLINK_PROJECT_NAME
        this.projectId = tenv.TESTLINK_PROJECT_ID
        this.suiteId = tenv.TESTLINK_SUITE_ID
        this.buildId = tenv.TESTLINK_BUILD_ID
        this.testPlanId = tenv.TESTLINK_PLAN_ID
        this.testCases = tenv.TESTLINK_TEST_CASES
        this.testPlanName = tenv.TESTLINK_PLAN_NAME

        this.prefix = tenv.PREFIX
        this.notes = tenv.NOTES
        this.apiKey = tenv.TESTLINK_TOKEN
        this.port = tenv.TESTLINK_PORT
        this.host = tenv.TESTLINK_HOST

        //
        this.testPlanDefaults = {
            testplanname: this.testPlanName,
            testprojectname: this.projectName,
            prefix: this.prefix,
            notes: this.notes,
            active: true,
            public: true
        }

        this.buildDefaults = {
                testplanid: this.testPlanId,
                buildname: "example build name",
                buildnotes: "",
                active: true,
                open: true,
                releasedate: "September",
                //copytestersfrombuild?: number
            }
            //
        this.testlink = new TestLink({
            host: this.host,
            port: this.port,
            secure: false,
            apiKey: this.apiKey, // The API KEY from TestLink. Get it from user profile.
        });
    }

    async setTestCaseExecutionResult(testcaseexternalid, executionStatus, notes) {
        await this.testlink.setTestCaseExecutionResult({
            testcaseexternalid: testcaseexternalid,
            testplanid: this.testPlanId,
            status: executionStatus,
            steps: [],
            buildid: this.buildId,
            overwrite: true,
            notes: notes
        })
    }

    async setTestCaseExecutionType(testcaseexternalid, executionType = ExecutionType.AUTOMATED) {
            await this.testlink.setTestCaseExecutionType({
                testcaseexternalid: testcaseexternalid,
                testprojectid: this.projectId,
                executiontype: executionType,
                version: 1,
            })
        }
        /**
         * Creates test plan in testlink
         * If plan exists it just returns its id
         * @param {string} planName name of plan to create
         * @return {number} id of test plan
         */
    async createTestPlan(planName) {
            const planData = Object.assign(this.testPlanDefaults, { testplanname: planName });
            const result = await this.testlink.createTestPlan(planData).then((testPlanData) => {
                    return testPlanData[0][`id`]
                },
                async(error) => {
                    const existingPlan = await this.testlink.getTestPlanByName({ testprojectname: planData.testprojectname, testplanname: planData.testplanname })
                    return existingPlan[0]['id']

                })
            return new Promise(async(resolve) => {
                resolve(result)

            })
        }
        /**
         * Creates test build in testlink
         * @param {number} testPlanId
         * @param {string} buildName
         * @return {number} id of build
         */
    async createBuild(testPlanId, buildName) {
        const buildDetails = Object.assign(this.buildDefaults, { testplanid: testPlanId, buildname: buildName })
        const build = await this.testlink.createBuild(buildDetails)

        return build[0][`id`]


    }

    async addTestCaseToTestPlan(testPlanId, tcs = testCases) {
        await Promise.all(tcs.map((testCaseId) => this.testlink.addTestCaseToTestPlan({
            testprojectid: this.projectId,
            testplanid: testPlanId,
            testcaseexternalid: testCaseId,
            version: 1,
        })))
    }
    async getTestSuites() {
        await this.testlink.getFirstLevelTestSuitesForTestProject({ testprojectid: this.projectId }).then((suites) => {
            const testSuites = suites.map(x => ({ name: x['name'], id: x['id'] }))
            return testSuites
        })
    }

    async getTestCasesInSuite() {
        const suiteData = await this.testlink.getTestCasesForTestSuite({ testsuiteid: this.suiteId })
        const testCases = suiteData.map(x => x['external_id'])
        return testCases

    }

    async retrieveTestCasesForTestPlan() {
        return await this.testlink.getTestCasesForTestPlan({
            testplanid: this.testPlanId,
            buildid: this.buildId
        })
    }

}



// exporting is crucial
module.exports = { CypressTestlink, makeTestlinkBuildForGivenSuites, makeTestlinkConfigForExistingBuild }