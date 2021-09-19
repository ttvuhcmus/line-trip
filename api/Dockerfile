
FROM node:12-alpine
WORKDIR /usr/src/app/api
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 1233 
CMD [ "npm", "start" ]
