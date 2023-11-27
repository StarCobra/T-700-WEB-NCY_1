# Dockerfile pour l'application front-end
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
