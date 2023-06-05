/* groovylint-disable DuplicateStringLiteral, NoDef */
// HELPERS AND CONSTANTS
/*def suiteMap = []
def getHashmapKeys(map) {
    def list = []
    map.keySet().each {
        list << it
    }
    return list
}

def getPlansNames(map) {
    def list = []
    map.keySet().each {
        list << "${it} Automation"
    }
    return list
}
def getTestsSummary(file="results/${REPORT_ID}-test-output.xml") {
    def awkCommand = { position -> "awk -F \'\"\' \'NR==2 {print \$${position}}\' ${file}" }
    def failuresCount = sh(script:"${awkCommand(8)}", returnStdout:true)
    def totalCount = sh(script:"${awkCommand(6)}", returnStdout:true)
    def passedCount = sh(script:"echo \$((${totalCount}-${failuresCount}))", returnStdout:true)
    return [totalCount: totalCount, failuresCount: failuresCount, passedCount: passedCount]
}

def secrets = []

def plansList = getPlansNames(suiteMap)

// ENVIRONMENT VARIABLES BLOCK FOR TESTRAIL
    env.TESTLINK_SUITE_ID = suiteMap."${params.TESTLINK_SUITE_NAME}"
    env.TESTLINK_ENABLED = params.TESTLINK_ENABLED
    env.TESTLINK_PROJECT_NAME = "TestProject"
    env.TESTLINK_PLAN_NAME = params.TESTLINK_PLAN_NAME
*/
//


pipeline {
    agent any
    environment {
        DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }
    stages {
        stage('Initial stage') {
            steps {
                script {
                    sh("echo 'hello'")

                }

            }
        }
    }
}
