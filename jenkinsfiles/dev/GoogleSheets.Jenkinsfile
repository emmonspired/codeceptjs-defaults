pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'qa_google_sheets_dev'
        CONTAINER_NAME = 'qa_google_sheets_dev';
        SELENOID = 'selenoid'
        QA_ENV = 'dev'
        QA_OVERRIDE_ENV_PROMPT = 'true'
        TAGS = '\\@SanityCheck|\\@Inject_GoogleSheetsData'
        // Slack configuration
        SLACK_COLOR_DANGER  = '#E01563'
        SLACK_COLOR_INFO    = '#6ECADC'
        SLACK_COLOR_WARNING = '#FFC300'
        SLACK_COLOR_GOOD    = '#3EB991'
        SLACK_CHANNEL_1 = '#qa-ci'  
        SLACK_CHANNEL_2 = '#qa-ci'  
        SLACK_TEAM_DOMAIN = 'slack-team-domain'
        SLACK_TOKEN = 'slack-token'
    }

    options {         
        buildDiscarder(logRotator(numToKeepStr: '5')) 
        disableConcurrentBuilds()
    }
    
    triggers {
        cron('H 7-16/4 * * 1-5')
    }

    stages {        
        stage('Print ENV') { steps { sh 'printenv' } }
        
        stage('Build') { steps { script { docker.build('$IMAGE_NAME:$BRANCH_NAME') } } }

        stage('Selenoid') { steps { catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') { sh './config/selenoid-check.sh' } } }
        
        stage('Test') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                sh 'docker run -t -e QA_ENV=$QA_ENV -e QA_OVERRIDE_ENV_PROMPT=true --link $SELENOID --name $CONTAINER_NAME-$BRANCH_NAME $IMAGE_NAME:$BRANCH_NAME $TAGS'
            }
            sh 'docker cp $CONTAINER_NAME-$BRANCH_NAME:/app/output .'
            echo '** Cleaning up in declarative block **'
            echo 'docker stop $CONTAINER_NAME-$BRANCH_NAME'
            echo 'docker rm $CONTAINER_NAME-$BRANCH_NAME'
            echo 'docker image rm $IMAGE_NAME:$BRANCH_NAME'            
          }
        }
        
        stage('Report') {
            steps {
                archiveArtifacts artifacts: 'output/**/*.*', fingerprint: false            
                junit 'output/**/*.xml'                
                publishHTML (target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'output', reportFiles: 'index.html', reportName: "Reports"])            
            }
        }
    }    

    post {
        always {
            echo 'Stop & remove docker container and image in the case of failure at any step. Catch all errors.'
            deleteDir() /* clean up our workspace */
            catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') { sh 'docker stop $CONTAINER_NAME-$BRANCH_NAME' }
            catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') { sh 'docker rm $CONTAINER_NAME-$BRANCH_NAME' }
            catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') { sh 'docker image rm $IMAGE_NAME:$BRANCH_NAME' }            
        }
        // success {
        //     echo "Sending message to Slack"
        //     slackSend (color: "${env.SLACK_COLOR_GOOD}",
        //          teamDomain: "${env.SLACK_TEAM_DOMAIN}",
        //          token: "${env.SLACK_TOKEN}",
        //          channel: "${params.SLACK_CHANNEL_1}",
        //          message: "*SUCCESS:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        // }
        // unstable {
        //     echo "Sending message to Slack"
        //     slackSend (color: "${env.SLACK_COLOR_DANGER}",
        //          teamDomain: "${env.SLACK_TEAM_DOMAIN}",
        //          token: "${env.SLACK_TOKEN}",
        //          channel: "${params.SLACK_CHANNEL_2}",
        //          message: "*UNSTABLE:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        // }
        // failure {
        //     echo "Sending message to Slack"
        //     slackSend (color: "${env.SLACK_COLOR_DANGER}",
        //          teamDomain: "${env.SLACK_TEAM_DOMAIN}",
        //          token: "${env.SLACK_TOKEN}",
        //          channel: "${params.SLACK_CHANNEL_2}",
        //          message: "*FAILED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        // }
        // changed {
        //     slackSend (color: "${env.SLACK_COLOR_INFO}",
        //            teamDomain: "${env.SLACK_TEAM_DOMAIN}",
        //            token: "${env.SLACK_TOKEN}",
        //            channel: "${params.SLACK_CHANNEL_1}",
        //            message: "*CHANGED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        // }
        regression {
            echo "Sending message to Slack"
            slackSend (color: "${env.SLACK_COLOR_DANGER}",
                 teamDomain: "${env.SLACK_TEAM_DOMAIN}",
                 token: "${env.SLACK_TOKEN}",
                 channel: "${params.SLACK_CHANNEL_2}",
                 message: "*REGRESSION:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        }
        fixed {
            echo "Sending message to Slack"
            slackSend (color: "${env.SLACK_COLOR_GOOD}",
                 teamDomain: "${env.SLACK_TEAM_DOMAIN}",
                 token: "${env.SLACK_TOKEN}",
                 channel: "${params.SLACK_CHANNEL_1}",
                 message: "*FIXED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        }
        aborted {
            echo "Sending message to Slack"
            slackSend (color: "${env.SLACK_COLOR_INFO}",
                   teamDomain: "${env.SLACK_TEAM_DOMAIN}",
                   token: "${env.SLACK_TOKEN}",
                   channel: "${params.SLACK_CHANNEL_1}",
                   message: "*ABORTED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.RUN_DISPLAY_URL}")
        }        
    }
}