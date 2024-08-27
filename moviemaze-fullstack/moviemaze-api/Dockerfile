# Stage 1: Build the application
FROM node:14

WORKDIR /moviemaze-api

COPY package*.json .

RUN npm install

COPY . .

CMD npm start