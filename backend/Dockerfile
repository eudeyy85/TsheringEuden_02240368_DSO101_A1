# Use Node.js version 18 on Alpine Linux (small, lightweight base image)
FROM node:18-alpine

# Set the working directory inside the container — all commands run from here
WORKDIR /app

# Copy package.json (and package-lock.json if present) before other files
# This lets Docker cache the install step — only re-runs if dependencies change
COPY package*.json ./

# Download and install all Node.js dependencies listed in package.json
RUN npm install

# Copy the rest of the source code into the container's /app directory
COPY . .

# Document that the app listens on port 5000 (informational — does not open the port)
EXPOSE 5000

# Command that runs when the container starts — launches the backend server
CMD ["node", "server.js"]