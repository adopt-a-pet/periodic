###  AAP Periodic Application Docker image  ####
FROM adoptapetcom/aap_frontend_env:release

MAINTAINER Adopt-a-Pet

WORKDIR /opt/workspace/application_code/

# Argument for npm credential
ARG NPM_TOKEN

# Set environment for the node application
ENV NODE_ENV=production

### Copy the application code into the docker container ####
COPY . /opt/workspace/application_code/

### Install Node Package Manager ####
RUN npm install

# Remove Credentials [Post Build Action]
RUN rm -f .npmrc

### Expose view model layer at PORT 3000 ####
EXPOSE  3000

### Execute the nodejs application ####
CMD npm start