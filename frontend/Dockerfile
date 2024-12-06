FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

# Copier le build généré dans le répertoire où Nginx sert les fichiers
COPY --from=builder /app/build /usr/share/nginx/html

# Copier un fichier de configuration Nginx personnalisé si nécessaire (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
