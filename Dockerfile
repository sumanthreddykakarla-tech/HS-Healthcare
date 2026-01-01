# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Take the API Key from Google Cloud Build and make it available
ARG SHOPIFY_API_KEY
# Write the key into .env.local so Vite can see it
RUN echo "VITE_SHOPIFY_API_KEY=$SHOPIFY_API_KEY" > .env.local

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built files from the first stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run uses port 8080 by default
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
server {
    listen 8080;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        # This line is key for React Router/Vite apps
        try_files $uri $uri/ /index.html;
    }
}
