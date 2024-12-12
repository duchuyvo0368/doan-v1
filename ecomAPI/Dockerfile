FROM node:14
WORKDIR /ecomAPI
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run start
