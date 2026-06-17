FROM node:26

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN npm ci

RUN npm run build

WORKDIR /app/backend

RUN npm ci

EXPOSE 8080

CMD [ "npm", "start" ]