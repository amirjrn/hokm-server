FROM node:alpine

WORKDIR "/app/hokm"

COPY . .
RUN npm install

CMD ["node","index.js"]