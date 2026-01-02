# --- Stage 1: Build the React App ---
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Accept the API Key as a build argument
ARG GEMINI_API_KEY

# Create the .env.local file with the key inside
# Note: Vite requires variables to start with VITE_ to be visible in the browser
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

# Build the app (creates the 'dist' folder)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy the custom nginx config file we created
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from Stage 1 to the Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 (Google Cloud Run's default)
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
