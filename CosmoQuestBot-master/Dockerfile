# src : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
# Currently using Node LTS Gallium
FROM node:lts-gallium

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
CMD [ "npm", "start" ]
