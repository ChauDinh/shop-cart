FROM node:10
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install 
ENV NODE_ENV production
COPY . .
COPY wait-for-it.sh .
CMD node ./dist/server.js
USER node