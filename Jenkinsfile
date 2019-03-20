node {
    /* Requires the Docker Pipeline plugin to be installed */
    parameters {
      booleanParam(name: 'items_copied', defaultValue: false, description: '')
    }
    cleanWs()
    docker.image('node:10-alpine').inside("-v $WORKSPACE:/output -u root") {
          stage('Checkout') {
          checkout([$class: 'GitSCM',
    			      branches: [[name: '*/master']],
    			      doGenerateSubmoduleConfigurations: false,
    			      extensions: [[$class: 'CleanCheckout']],
    			      submoduleCfg: [],
    			      userRemoteConfigs: [[credentialsId: 'github',
    			      url: 'https://github.com/adopt-a-pet/periodic.git']]])
        }
        
        stage('Build') {
          sh "npm install"
          sh "npm run build:docs"
        }

       
    }
    stage('Deploy') {
          def dist_dir = "${JENKINS_HOME}/workspace/development/periodic-deploy/dist/docs"
          def cli_cp = "aws s3 cp --recursive ${dist_dir} s3://test-periodic-copy-for-deploy/"
          def response
          // Provide credentials for aws cli and initiate check
          try {
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "MYCLI"]]) {
              response = sh(returnStdout: true, script: "${cli_cp}").trim()
            }
            items_copied = true
          } catch(Ex) {
            println "Unable to copy files to bucket: ${Ex.toString()}"
          }
    }
    stage('Post') {
         if(items_copied) {
           println "Successfully copied files to bucket"
         } 
    }
}