FROM node:20-alpine3.20

COPY package.json package-lock.json /app/
WORKDIR /app

RUN npm ci

COPY . /app/

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]
