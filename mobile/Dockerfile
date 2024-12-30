FROM node:18

WORKDIR /mobile


COPY package*.json ./

RUN npm install -g expo-cli

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 19000 19001 19002 8081


CMD ["npm", "start"]
