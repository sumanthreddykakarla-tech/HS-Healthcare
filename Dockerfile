# 1. Use the [BASE IMAGE] (e.g., node:20-slim or python:3.11-slim)
FROM [BASE IMAGE]

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Take the API Key as a 'Build Argument'
# This ensures it isn't saved permanently in your source code
ARG [API_KEY_NAME]

# 4. Write the key into your [CONFIG FILE] (e.g., .env or config.json)
# This line creates the file and adds the key right before building
RUN echo "[API_KEY_NAME]=${[API_KEY_NAME]}" > [CONFIG FILE]

# 5. Copy your code and build the app
COPY . .
RUN [BUILD COMMAND] (e.g., npm install or pip install)

# 6. Expose the [PORT NUMBER] (Cloud Run usually prefers 8080)
EXPOSE [PORT NUMBER]

# 7. Start the [SERVER] in the foreground
# This keeps the container running so the website stays live
CMD ["[SERVER]", "[START_ARGUMENTS]"]
