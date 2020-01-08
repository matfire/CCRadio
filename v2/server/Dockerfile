FROM node:11

WORKDIR /app
COPY ./package.json .
RUN apt-get update
RUN apt-get install libshout-dev -y
RUN npm install
COPY index.js .
COPY ./src ./src
COPY ./music ./music
CMD [ "node", "index.js" ]