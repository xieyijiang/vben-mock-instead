FROM node:22-slim

RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]