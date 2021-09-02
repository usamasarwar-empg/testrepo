FROM node:lts
WORKDIR /phantom/server
COPY server/package.json server/package-lock.json /phantom/server/
RUN yarn install --silent
COPY . /phantom/server

WORKDIR /phantom/client
COPY client/package.json client/package-lock.json /phantom/client/
RUN yarn install --silent
COPY . /phantom/client

CMD ["yarn","start"]