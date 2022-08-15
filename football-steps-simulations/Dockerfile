FROM node:16-alpine
USER node

RUN mkdir -p /home/node/app
WORKDIR '/home/node/app'

COPY --chown=node:node package.json .
RUN npm install
RUN npm install express --save

COPY --chown=node:node . .

CMD ["npm", "run", "dev"]
