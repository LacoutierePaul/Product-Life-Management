# Étape 1 : Build de l'application
FROM node:18 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Construire l'application pour un environnement de production
RUN npm run build

# Étape 2 : Serveur de production avec Nginx
FROM nginx:alpine

# Copier le build généré dans le répertoire où Nginx sert les fichiers
COPY --from=builder /app/build /usr/share/nginx/html

# Copier un fichier de configuration Nginx personnalisé si nécessaire (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
