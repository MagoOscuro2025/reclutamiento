
# Dockerfile de Desarrollo
FROM node:18-alpine AS backend-dev

WORKDIR /app

# Copia solo los archivos de dependencias
COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Copia el resto del código
COPY . .


EXPOSE 3005

# Usa el script de desarrollo
CMD ["npm", "run", "dev"]
