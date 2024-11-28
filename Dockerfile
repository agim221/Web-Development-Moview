FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

# Install bash
RUN apk add --no-cache bash

COPY . .

EXPOSE 3000

CMD ["npm", "start"]