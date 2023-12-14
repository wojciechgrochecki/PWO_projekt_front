FROM node:alpine

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 5173

CMD ["npm", "run", "dev"]