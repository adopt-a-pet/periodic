### Setup AAP Periodic container image  ####
FROM adoptapetcom/aap_frontend_env:v2
MAINTAINER TRESELLE

WORKDIR /opt/workspace/application_code/

# Argument for npm credential
ARG NPM_TOKEN

# Environment variable
ENV NODE_ENV=production

### Copy the package.json files ####
COPY package.json /opt/workspace/application_code/

RUN cd $(npm root -g)/npm && npm install fs-extra && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

### Install Node Package Manager ####
RUN npm install

# Remove Credentials
RUN rm -f .npmrc

COPY . /opt/workspace/application_code/

### Gulp Build ####
RUN npm run build

### EXPOSE view model layer PORT 3000 ####
EXPOSE  3000

### Execute the nodejs application ####
CMD npm start