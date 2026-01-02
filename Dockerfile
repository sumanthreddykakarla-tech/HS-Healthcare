# --- Stage 1: Build the React App ---
FROM node:20-alpine AS build
WORKDIR /app

# Accept the API key as a build argument
ARG GEMINI_API_KEY

COPY package*.json ./
RUN npm install

COPY . .

# Create the .env.local file using the build argument
# Note: Vite requires variables to start with VITE_ to be public
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine
# Copy the custom config we made
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the final build files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
