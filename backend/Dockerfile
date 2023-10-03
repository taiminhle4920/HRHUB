FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install && npm uninstall bcrypt && npm install bcrypt

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
