FROM node:18-slim

ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ARG DATABASE_URL

RUN apt-get update
RUN apt-get install -y openssl libssl-dev

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run db:generate

RUN chown -R node:node /app

USER node

CMD ["npm", "start"]