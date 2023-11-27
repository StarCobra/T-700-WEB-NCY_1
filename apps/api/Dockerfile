# Dockerfile API
ARG NODE_VERSION=20
ARG NODE_ENV=development
FROM node:${NODE_VERSION}-alpine

RUN apk update \
    && apk add --no-cache mysql-client bash

# Supprimer le cache npm
RUN rm -rf /root/.npm

WORKDIR /var/www/apps/api

COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer nodemon de manière globale
RUN npm install -g nodemon

# Define environment variables
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_HOST=count-of-money-mariadb
ENV MARIADB_ROOT_USER=root
ENV MARIADB_ROOT_PASSWORD=root

# Exposer le port sur lequel l'API va écouter
EXPOSE 3005

# CMD avec nodemon
CMD ["npm", "run", "start:watch"]