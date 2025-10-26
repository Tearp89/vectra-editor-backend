FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN mkdir -p uploads
RUN chmod -R 777 uploads

EXPOSE 3003

CMD ["node", "index.js"]