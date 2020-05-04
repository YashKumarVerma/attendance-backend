FROM node:10.13.0-alpine

ENV SECRETKEY=1234567890
ENV CONNECTION_STRING=mongodb://127.0.0.1:27017/
ENV PORT=3000

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/app

# TypeScript
RUN npm run build

# run the server
CMD ["npm", "start"] 

EXPOSE 27017 27017
EXPOSE 3000 3000