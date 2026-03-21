# Etapa 1: build
FROM node:20-alpine AS build

RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: outro servidor
FROM nginx:alpine

RUN apk update && apk upgrade --no-cache

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia config SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta que Easypanel vai usar

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]