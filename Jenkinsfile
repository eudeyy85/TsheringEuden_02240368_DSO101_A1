pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    environment {
        DOCKER_IMAGE = '02240368/todo-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/eudeyy85/TsheringEuden_02240368_DSO101_A1.git',
                    credentialsId: 'github-creds'
            }
        }
        stage('Install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Build done'
            }
        }
        stage('Test') {
            steps {
                dir('TsheringEuden_02240368_DSO101_A1/backend') {
                    bat 'npm test'
                }
            }
            post {
                always {
                    junit 'TsheringEuden_02240368_DSO101_A1/backend/junit.xml'
                }
            }
        }
        stage('Docker Build & Push') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_TOKEN')]) {
                     dir('TsheringEuden_02240368_DSO101_A1/backend') {
                         bat "docker login -u 02240368 -p %DOCKER_TOKEN%"
                         bat "docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
                         bat "docker push %DOCKER_IMAGE%:%DOCKER_TAG%"
                         bat "docker tag %DOCKER_IMAGE%:%DOCKER_TAG% %DOCKER_IMAGE%:latest"
                         bat "docker push %DOCKER_IMAGE%:latest"
                     }
                }
            }
        }
    
        post {
            success {
                echo 'Pipeline completed successfully!'
            }
            failure {
                echo 'Pipeline failed. Check the logs.'
            }
        }
    }
}
