# Stage 1
FROM node:14 as build-stage

WORKDIR /usr/share/nginx/html
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=http://127.0.0.1:8888
ARG VITE_API_KEY
ENV VITE_API_KEY=$VITE_API_KEY

RUN npm run build

# Stage 2
FROM nginx:alpine

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /usr/share/nginx/html /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]