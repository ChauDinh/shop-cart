FROM node:10
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install 
COPY . .
COPY wait-for-it.sh .
CMD node ./dist/server.js