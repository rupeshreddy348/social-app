pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                // Replace with your repository URL
                git url: 'https://github.com/your_username/social-media-app.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                echo 'Building and deploying the application...'
                // Navigate to the directory if needed
                // sh 'cd /var/lib/jenkins/workspace/social-media-app && npm install'
                
                // If you need to run your app, you can do it like this
                sh 'node app.js &'
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed.'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
