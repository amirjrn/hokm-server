FROM node:alpine

WORKDIR "/app/hokm"

COPY package.json .
RUN yarn install
COPY . . 

CMD ["node","index.js"]