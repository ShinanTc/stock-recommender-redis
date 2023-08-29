# Use the specific Node.js version (18.16.1) as a parent image
FROM node:18.16.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your Express app is listening on (assuming it's 3000)
EXPOSE 3000

# Run Redis server in the background (daemonize yes)
CMD ["redis-server", "--daemonize", "yes"]

# Start your Node.js application
CMD ["npm", "start"]