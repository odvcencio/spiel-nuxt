FROM node:alpine
RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN apk update && apk upgrade && apk add git
COPY package.json /app
RUN npm install

ENV NODE_ENV=production

COPY . /app
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
