# src : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
# Currently using Node LTS Hydrogen
FROM node:lts-hydrogen

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install npm@^9
# This should remove the outdated npm warning until v10
# RUN ["npm"] ["install"] ["-g"] ["npm@9"]

# Install production dependencies
#RUN ["if"] ["[["] ["-n"] ["'\$dev' ]]"] ["&&"] ["[["] ["'\$dev'"] ["="] ["'1'"] ["]]"] [";"] ["then"] ["npm"] ["ci"] [";"] ["else"] ["npm"] ["ci"] ["--omit=dev"] [";"] ["fi"]
RUN ["npm"] ["install"] ["--omit=dev"]

# Bundle app source
COPY . .

# Run the bot
# Use node for production
#CMD if [[ -n "\$dev" ]] && [[ "\$dev" = "1" ]] ; then npm run dev ; else node main.js ; fi
#CMD [ ["echo"] ["\"if"] ["[[ -n '\$dev' ]]"] ["&&"] ["[[ '\$dev' = '1' ]]"] [";"] ["then npm ci ;"] ["else npm ci --omit=dev ;"] ["fi\""] ["|"] ["bash"] ]
CMD [ "node", "main.js" ]
