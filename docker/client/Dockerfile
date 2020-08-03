# pulling official node image
FROM node:12.16.1-alpine

# set workdir
WORKDIR /usr/src/app

# copy package.json & yarn.lock
COPY package.json .
COPY yarn.lock .

# install dependencies
RUN yarn

# copy other files/directories
COPY public .
COPY src .
COPY .env .