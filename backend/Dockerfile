FROM node:23-alpine

WORKDIR /backend

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]