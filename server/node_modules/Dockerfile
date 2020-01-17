FROM node:12.13.1
WORKDIR /app
COPY ./package.json ./
RUN npm install --silent
COPY . .
CMD ["npm","run","start"]
