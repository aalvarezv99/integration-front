# Etapa de compilación
FROM node:16 AS builder

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración y dependencias del proyecto
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación Angular
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados de Angular a la imagen de Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx (si es necesario)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto en el que se ejecutará el servidor Nginx
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
