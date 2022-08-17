# src : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
# Currently using node version 14.4.0
FROM node:16.9.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Bundle app source
COPY . .

# run the bot
CMD [ "node", "bot.js" ]
