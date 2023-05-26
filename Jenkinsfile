/* groovylint-disable DuplicateStringLiteral, NoDef */

pipeline {
    agent any
    environment {
        DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }
    stages {
        stage('build app'){
            steps {
                script {
                    echo 1

                }

            }
        }
        stage('launch app'){
            steps {
                  script {
                    echo 2
                }

                
            }
        }
        stage('ru tests') {
            steps {
                  script {
                      echo 3
                    
                }

                
            }
        }
    }
    post {
        always {
              script {
                    echo 4
                }


        }

    }
}
