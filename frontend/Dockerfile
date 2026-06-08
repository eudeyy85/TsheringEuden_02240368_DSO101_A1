# Use Node.js version 20 on Alpine Linux (small, lightweight base image)
FROM node:20-alpine

# Set the working directory inside the container — all commands run from here
WORKDIR /app

# Copy package.json (and package-lock.json if present) before other files
# This lets Docker cache the install step — only re-runs if dependencies change
COPY package*.json ./

# Download and install all Node.js dependencies listed in package.json
RUN npm install

# Copy the rest of the source code into the container's /app directory
COPY . .

# Document that the app listens on port 5173 (Vite's default dev server port)
EXPOSE 5173

# Command that runs when the container starts
# npm run dev   — starts the Vite development server
# --            — separates npm flags from the script's own flags
# --host 0.0.0.0 — makes the server accessible from outside the container
#                  (by default Vite only listens on localhost, which is unreachable from Docker)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]