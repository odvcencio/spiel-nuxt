FROM node:alpine

RUN apk update && apk upgrade && apk add git && apk add curl
RUN curl -o- -L https://yarnpkg.com/install.sh

RUN mkdir -p /app
WORKDIR /app/

ADD ./package.json ./yarn.* /app/
RUN yarn

ADD . /app
RUN yarn run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "run", "start"]
