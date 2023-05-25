/* groovylint-disable DuplicateStringLiteral, NoDef */

def suiteMap = [
    "Smoke Suite": '3',
    "Sanity Suite": '70',
    "Regression Suite": '71'
]
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

def secrets = [
    string(
        credentialsId: 'TESTLINK_TOKEN',
        variable: 'TESTLINK_TOKEN'),
    string(
        credentialsId: 'DISCORD_WEBHOOK',
        variable: 'DISCORD_WEBHOOK'),
    string(
        credentialsId: 'CLICKUP_TOKEN',
        variable: 'CLICKUP_TOKEN')
]

def plansList = getPlansNames(suiteMap)

pipeline {
    agent any
    environment {
        DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

    }
    parameters {
        booleanParam(name: 'TESTLINK_ENABLED', defaultValue: true, description: 'whether to use testlink')
        editableChoice(
             name: 'TESTLINK_PLAN_NAME',
            choices: plansList,
        )
        editableChoice(
            name: 'TESTLINK_SUITE_NAME',
            choices: getHashmapKeys(suiteMap),
        )

        string(name: 'TESTLINK_PROJECT_ID', defaultValue: '1',     description: 'testlink project id')
        string(name: 'TESTLINK_FORCED_BUILD_ID', defaultValue: '',     description: 'if any number identifier given then tests would be executed over this build')
    }

    stages {
        stage('Build App') {
            steps {
                dir('docker_introduction/docker-compose/') {
                    script {
                        sh "docker-compose build --build-arg DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG} "
                    }
                }
            }
        }
        stage('Launch App') {
            steps {
                dir('docker_introduction/docker-compose/') {
                    script {
                        sh 'docker-compose up -d'
                    }
                }
            }
        }
        stage('Run tests') {
        agent       {
        docker {
            image 'cypress/included:12.2.0'
            args '--network host --entrypoint=\'\''
        }
    }
                steps {
                    dir('pipeline_ex') {
                        withCredentials(secrets) {
                                script {
                                    // ENVIRONMENT VARIABLES BLOCK
                                    env.TESTLINK_SUITE_ID = suiteMap."${params.TESTLINK_SUITE_NAME}"
                                    env.TESTLINK_ENABLED = params.TESTLINK_ENABLED
                                   
                                    env.TESTLINK_PROJECT_NAME = "TestProject"
                                    env.TESTLINK_PLAN_NAME = params.TESTLINK_PLAN_NAME
                                   

                                    // INSTALL JS DEPENDENCIES
                                    sh 'npm install'

                                    // CREATE CYPRESS.ENV.JSON FOR TESTLINK BUILD
                                    def testlinkConfig = ''
                                    
                                    if (params.TESTLINK_FORCED_BUILD_ID != '') {
                                testlinkConfig = sh(
                                            script: """#!/bin/bash
                                            npx run-func testlinkAgent.js \
                                                makeTestlinkConfigForExistingBuild \
                                                \"${TESTLINK_PLAN_NAME}\" \
                                                \"${params.TESTLINK_FORCED_BUILD_ID}\"
                                            """,label: "Prepare Config", returnStdout: true)
                                        env.REPORT_ID = BUILD_ID
                                    }
                                    else {
                                testlinkConfig = sh(
                                            script: """#!/bin/bash
                                            npx run-func testlinkAgent.js \
                                                makeTestlinkBuildForGivenSuites \
                                                \"${TESTLINK_PLAN_NAME}\" \
                                                \"BUILD${BUILD_ID}\"
                                            """,label: "Prepare Config", returnStdout: true)
                                            env.REPORT_ID = BUILD_ID
                                    }

                                    writeJSON file: 'cypress.env.json', json: "${testlinkConfig}"
                                    println("Running tests for given config ${testlinkConfig}")
                                    // EXECUTE CYPRESS TESTS

                                    try {
                                sh(
                                            script: "cypress run")
                                            
                                    }
                                    catch (err) {
                                // IN CASE OF ERRORS SEND NOTIFICATION
                                def summary = getTestsSummary()
                                discordSend(
                                                            description: "Jenkins Pipeline Build for ${params.TESTLINK_PLAN_NAME}",
                                                            footer: "\
                                                                Total tests: ${summary.totalCount} \
                                                                Failures: ${summary.failuresCount} \
                                                                Passed: ${summary.passedCount}",
                                                            link:   BUILD_URL,
                                                            result: currentBuild.currentResult,
                                                            title:  JOB_NAME,
                                                            webhookURL: "${DISCORD_WEBHOOK}")
                                    }
                                }
                        }
                    }
                }
        }
    }
    post {
        always {
            dir('docker_introduction/docker-compose/') {
                    script {
                        sh 'docker-compose down'
                    }
            }
        }
    }
}
