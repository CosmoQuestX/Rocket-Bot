# src : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
# Currently using Node LTS Gallium
FROM node:lts-gallium

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install npm@^8
# This should remove the outdated npm warning until v9
RUN npm install -g npm@8

# Install production dependencies
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Run the bot
# Use node for production
CMD [ "node", "main.js" ]
