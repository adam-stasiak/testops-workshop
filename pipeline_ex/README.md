# Pipeline exercices

## Stages

```

docker-compose up -d: launches application built with multiple containers. -d Flag prevents it from blocking context and runs it in background.
docker-compose build --build-arg DOCKER_IMAGE_TAG=<> : builds docker images defined in docker compose file with given name.
docker-compose down: shutdown containers
```

Exercises:

- [ ] Define declarative pipeline with main stages block and within include: - stage('Build App') - stage('Launch App') - stage('Run tests').Please place steps block with at least one print inside – jenkins requires that.
      Please Add post action.<details>

      pipeline {
        agent any
        stages {
        stage('Build App') {
            steps {
                        sh 'echo to_implement'
                    }
                }
                stage('Launch App') {
                    steps {
                        sh 'echo to_implement'
                    }
                }
                stage('Run tests') {
                    steps {
                        sh 'echo to_implement'
                    }

                }
            }
            post {
                always {
                    steps {
                        sh 'echo to_implement'
                    }
                }
            }

        }

  </details>

  Then it would require adding some build actions. We would use Docker for that. Just below `agent any` code define environment section and define variable DOCKER_IMAGE_TAG build from environment variables BRANCH_NAME and BUILD_NUMBER
    <details>

        ````environment {
            DOCKER_IMAGE_TAG = "${BRANCH_NAME}-${BUILD_NUMBER}"
        }
        ````

    </details>

  Another step is to specify steps under _Build app_ stage. Docker compose file is specified under docker_introduction/docker-compose folder. You have to use `dir(<>)` block and insude use proper docker-compose command. Hint you can find it in top section of this readme ;)
    <details>

       stage('Build App') {
            steps {
                dir('docker_introduction/docker-compose/') {
                    script {
                        sh "docker-compose build --build-arg DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG} "
                    }
                }
            }
        }

    </details>

  OK now we have docker images but what next? Inside `Launch app stage` we need to launch our application. This time we should use docker compose up under the same directory. Remember to add `-d` to this command to run this in detached mode and don't block pipeline.

    <details>

            stage('Launch App') {
                steps {
                    dir('docker_introduction/docker-compose/') {
                        script {
                            sh 'docker-compose up -d'
                        }
                    }
                }
            }

    </details>

  Finally we should be able to launch our application on jenkins :) BUT please remember to define cleanup action in `post` block. Use for that method that would turn off running containers with our app.
    <details>

        post {
            always {
                dir('docker_introduction/docker-compose/') {
                        script {
                            sh 'docker-compose down'
                        }
                }
            }
        }

    </details>

  Now you can try our pipeline on jenkins :) in case of any troubles there below you can find example for this stage.
    <details>

        pipeline {
        agent any
        environment {
            DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_URL}"
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
                steps {
                    sh 'echo no_tests_yet'
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
    </details>
    Congrats! You did it.

## Use Docker

- [] Add tests stage logic. First thing before we go is to configure docker for that. As a base for this exercise you can use pipeline from previous exercise if something went wrong :)
  In order to use specific docker image you have to put `agent` section under stage and under this sections specify docker section with given parameters:
  `image 'cypress/included:12.2.0'` and `args '--network host --entrypoint=\'\''`. Without network host we would have a problem to reach localhost.
    <details>

          agent {
              docker {
                  image 'cypress/included:12.2.0'
                  args '--network host --entrypoint=\'\''
              }
          }

    </details>

  As we have valid docker image specified we can start to add required cypress stuff :) Remember to use valid dir block.
  Let's start with dependencies install. sh 'npm install'
    <details>

        stage('Run tests') {
            agent       {
                docker {
                    image 'cypress/included:12.2.0'
                    args '--network host --entrypoint=\'\''
                }
            }
            steps {
                dir('pipeline_ex') {
                            script {
                                sh 'npm install'
                            }

                }
            }
        }

    </details>
      The same way add sh 'cypress run'
      <details>
          script {
              sh 'npm install'
              sh 'cypress run
          }
      </details>
      OK you for sure observed that pipeline failed. In this exercise let's assume we always want to have green pipeline even when some tests failed. Let's just add inside simple try catch block
      <details>

        stage('Run tests') {
              agent       {
                  docker {
                      image 'cypress/included:12.2.0'
                      args '--network host --entrypoint=\'\''
                  }
              }
              steps {
                  dir('pipeline_ex') {
                              script {
                                  sh 'npm install'
                                  try {
                                      sh 'cypress run'
                                  }
                                  catch (error){
                                      println(error)
                                  }

                              }

                  }
              }
          }
      </details>

      Now we are ready for next exercise with parametrized builds:)

## Parameters

- [ ] Jenkins allows for creating parametrized builds what means we can set whatever we want on input and control behavior of pipeline like change environment for tests or specify some testing details. First please add parameters block on top of the pipeline block just after environment block `parameters {}`. For our pipeline we would need these parameters:

  - TESTLINK_ENABLED of type booleanParam with default value false(for now)
  - TESTLINK_PLAN_NAME of type editableChoice with default value [](for now)
  - TESTLINK_SUITE_NAME of type editable choice with default value [](for now)
  - TESTLINK_PROJECT_ID of type string with default value '1'(it should match your testlink project id)
  - TESTLINK_FORCED_NUILD_ID of type string with default value \'\'
    <details>

            parameters {
                booleanParam(name: 'TESTLINK_ENABLED', defaultValue: false, description: 'whether to use testlink')
                editableChoice(
                    name: 'TESTLINK_PLAN_NAME',
                    choices: [],
                )
                editableChoice(
                    name: 'TESTLINK_SUITE_NAME',
                    choices: [],
                )

                string(name: 'TESTLINK_PROJECT_ID', defaultValue: '1',     description: 'testlink project id')
                string(name: 'TESTLINK_FORCED_BUILD_ID', defaultValue: '',     description: 'if any number identifier given then tests would be executed over this build')
                }

    </details>

    You can verify now jenkins pipeline. After first execution you should see Build with parameters button on main branch view.
    Let's make these parameters more usable with giving editableChoices real values. Let's define map of suites with syntax
    `def suiteMap = [key: value, key:value]`
    on top of the file. Please define Regression Suite, Smoke Suite, Sanity Suite with ids matching your testlink setup.
    <details>

        def suiteMap = [
            "Smoke Suite": '2',
            "Sanity Suite": '70',
            "Regression Suite": '71'
        ]

    </details>
    Unfortunetly editableChoice does not take map easily. Let's define this helper method on top of the file:

  ```
   def getHashmapKeys(map) {
       def list = []
       map.keySet().each {
           list << it
       }
       return list
   }
  ```

Now let's update editableChoices with real values:

<details>

    editableChoice(
        name: 'TESTLINK_SUITE_NAME',
        choices: getHashmapKeys(suiteMap),
    )

</details>

But we still have to update TESTLINK_PLAN_NAME. Let's make agreement that for our automation framework we would get naming convention "TestsuiteName Automation". For that we would specify helper function:

```
def getPlansNames(map) {
    def list = []
    map.keySet().each {
        list << "${it} Automation"
    }
    return list
}
```

And then it is possible to make parameter TESTLINK_PLAN_NAME alive:)

Let's specify variable on top of file:

```
def plansList = getPlansNames(suiteMap)

and then place plansList inside parameter.

editableChoice(
    name: 'TESTLINK_PLAN_NAME',
    choices: plansList,
)
```

Whole parameters sections should look like:

<details>

    parameters {
        booleanParam(name: 'TESTLINK_ENABLED', defaultValue: false, description: 'whether to use testlink')
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

</details

## Credentials

- [ ] Let's continue core configuration for turning on integrations step by step. Now we need to use some secret credentials. Let's define list of required credentials with syntax: def secrets = [ string(credentialsId: 'id',variable: 'expectedVariableName)]. Let's make variables the same name as credential ids.

</details>

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

</details>

Now inside stage('Run tests') block please wrap script{} block with 'withCredentials(secrets){}' block. We should be sure that all test related actions has an access to required passwords/tokens.

    withCredentials(secrets) {
        script {}
    }

Time to check whether access to credentials works. For that we would configure discord notification using secret webhook.

In catch block in case of error (let's assume we would like to send notification only on errors) use discord command:

      discordSend(
        description: "Jenkins Pipeline Build",
        footer: "example footer",
        link:   BUILD_URL,
        result: currentBuild.currentResult,
        title:  JOB_NAME,
        webhookURL: DISCORD_WEBHOOK)

Run pipeline with discord notification added and check your configured channel.

## Testlink

- [ ] Let's enable testlink integration. All code in cypress project should be capable with this instruction and soon we should see our results in testlink :)

  First thing in this scope is to make proper environments variables set.  
   Let's make them like below:

```
  env.TESTLINK_SUITE_ID = suiteMap."${params.TESTLINK_SUITE_NAME}"
  env.TESTLINK_ENABLED = params.TESTLINK_ENABLED

  env.TESTLINK_PROJECT_NAME = "TestProject"
  env.TESTLINK_PLAN_NAME = params.TESTLINK_PLAN_NAME
```

You can now set default value for TESTLINK_ENABLED parameter true.

This project requires having some Testlink configuration stored in cypress.env.json. In order to do that we have to call testlinkAgent.js function `makeTestlinkBuildForGivenSuites` with proper parameters. In this testlinkAgent.js we can also find function `makeTestlinkConfigForExistingBuild` – this is helpful when we want to execute tests on already create build. So your exercise is now to define variable testlinkConfig first and then depending on TESTLINK_FORCED_BUILD_ID value create proper configuration. Additionally for each way update env variable REPORT_ID with valid build value (for newly created build it would be jenkins build id and for existing build it would be TESTLINK_FORCED_BUILD_ID). Store testlinkConfig in cypress.env.json using jenkins method writeJson.

<details>

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
    env.REPORT_ID = params.TESTLINK_FORCED_BUILD_ID
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

</details>

Now you can check whether cypress results would be set on matching testlink build.
Please check notes on failed test. You should be able to see clickup ticket url there :)

## Clickup

- [ ] Last exercise in this scope is to tweak discord notification. in e2e.js file we have defined path to report. Let's read some data from that report and make it part of discord notification.

Please prepare method getTestsSummary in our Jenkinsfile which take as argument file with default value file="results/${REPORT_ID}-test-output.xml". We would use simple awk command to not introduce another tools –
```awk -F \'\"\' \'NR==2 {print \$${position}}\' ${file}```
Please make lambda function with syntax def awkCommand = { position -> "awk...." }
and extract failuresCount(for this position would be 8),totalCount,passedCount(for this position would be 6) and return as map (syntax [key:value,key:value]).

<details>
   
    
    def getTestsSummary(file="results/${REPORT_ID}-test-output.xml") {
        def awkCommand = { position -> "awk -F \'\"\' \'NR==2 {print \$${position}}\' ${file}" }
        def failuresCount = sh(script:"${awkCommand(8)}", returnStdout:true)
        def totalCount = sh(script:"${awkCommand(6)}", returnStdout:true)
        def passedCount = totalCount - failuresCount
        return [totalCount: totalCount, failuresCount: failuresCount, passedCount: passedCount]
    }
    
</details>

Just before discord notification please call getTestsSummary() and modify discord notification to include interesting information that you like.

<details>

    def summary = getTestsSummary()
    discordSend(
    description: "Jenkins Pipeline Build for ${params.TESTLINK_PLAN_NAME}",
        footer: "\
            Total tests: ${summary.totalCount} \
            Failures: ${summary.failures} \
            Passed: ${summary.passedCount}",
        link:   BUILD_URL,
        result: currentBuild.currentResult,
        title:  JOB_NAME,
        webhookURL: "${DISCORD_WEBHOOK}")

</details>

## Final pipeline

<details>
    
    /_ groovylint-disable DuplicateStringLiteral, NoDef _/

    def suiteMap = [
    "Smoke Suite": '2',
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
    def passedCount = totalCount - failuresCount
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
                                            env.REPORT_ID = params.TESTLINK_FORCED_BUILD_ID
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
                                                                    Failures: ${summary.failures} \
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

</details>
