FROM node:20-alpine as base

FROM base AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build
CMD ["npm", "start"]
