# Dockerfile pour l'application front-end
ARG NODE_VERSION=20
ARG NODE_ENV=development
FROM node:${NODE_VERSION}-alpine

RUN apk update \
    && apk add --no-cache bash

# Supprimer le cache npm
RUN rm -rf /root/.npm

WORKDIR /var/www/apps/front

COPY package*.json ./

# Installer les dépendances
RUN npm install

# Define environment variables
ENV NODE_ENV=${NODE_ENV}

# Exposer le port sur lequel l'API va écouter
EXPOSE 3000

CMD ["npm", "start"]