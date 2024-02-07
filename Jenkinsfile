pipeline {
    agent any
    tools { 
        maven 'Maven-3.8.8' 
    }
    stages {
        stage('Build') {
            steps {
                echo "Build step"// Run Maven on a Unix agent.
                sh 'mvn test'
            }
            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    echo "Build Success Postaction "
                }
            }
        }
        stage('Deploy') {
            steps {
                // Run Spring on a Unix agent.
                sh 'nohup JENKINS_NODE_COOKIE=dontKillMe mvn spring-boot:run &'
            }
        }
    }
}
