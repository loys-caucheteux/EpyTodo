FROM node:13.12.0-alpine
 WORKDIR /server
 COPY . .
 RUN npm install
 EXPOSE 8080
 CMD ["node", "src/index.js"]