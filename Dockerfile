# Use the specified version of the official Node.js image as the base image
FROM node:18.17.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]