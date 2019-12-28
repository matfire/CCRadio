FROM node:lts

WORKDIR /app
COPY ./package.json .
RUN npm install
COPY index.js .
COPY ./src .
CMD [ "npm", "start" ]