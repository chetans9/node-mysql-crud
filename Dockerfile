FROM node:18-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install nodemon -g
COPY . /app
CMD ["npm","start"]
