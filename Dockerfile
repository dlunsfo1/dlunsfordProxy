# installs latest node
FROM node:latest
# create and set app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
# install app dependencies
# this is done before the following COPY command to take advantage of layer caching
COPY package.json . 
# remember the working directory is '/usr/src/app/''
RUN npm install
COPY . .
EXPOSE 3030
CMD npm start