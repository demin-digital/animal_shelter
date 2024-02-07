pipeline {
    agent any
    tools { 
        maven 'Maven-3.8.8' 
    }
    stages {
        stage('Build') {
            steps {
                echo "Build step"// Run Maven on a Unix agent.
                //sh 'mvn test'
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
                sh 'export JENKINS_NODE_COOKIE=dontKillMe && nohup mvn spring-boot:run &> ~/front.out &'
            }
            post {
                success {
                    echo "Successfully ran the Spring Boot servers. Check it at URL: http://195.2.92.56:8082. If you whant to stop server, pls use this 2 commands at servers: ps -ef |grep spring , kill (PID)"
                }
            }
        }
    }
}
