FROM node:16

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --only=prod

COPY . .

EXPOSE ${EXPOSED_PORT}

CMD [ "node", "index.js" ]

