FROM node:18-slim

ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

USER node

COPY --chown=node:node / .

CMD ["npm", "start"]