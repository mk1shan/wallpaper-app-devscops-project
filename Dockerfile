# Build Stage
FROM node:22-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Accept API key as a build argument
ARG VITE_PEXELS_API_KEY
ENV VITE_PEXELS_API_KEY=${VITE_PEXELS_API_KEY}

RUN npm run build

# Production Stage
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
