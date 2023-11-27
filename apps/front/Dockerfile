# Dockerfile pour l'application front-end
<<<<<<< HEAD
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
=======
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

# Deuxième étape pour utiliser une image plus légère
#FROM nginx:alpine as dev
#
#COPY --from=builder /app/build /usr/share/nginx/html
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]
>>>>>>> feat/signUpBasic
