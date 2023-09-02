# Use the specific Node.js version (18.16.1) as a parent image
FROM node:18.16.1

# Install required libraries for launching browser
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libgtk-3-0 \
    libgtk2.0-0 \
    libgbm-dev \
    libfontconfig1 \
    libx11-xcb1 \
    libxcb-dri2-0 \
    libxcb-glx0 \
    libgl1-mesa-glx \
    libasound2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev

# Install Redis server
RUN apt-get install -y redis-server

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your Express app is listening on (assuming it's 3000)
EXPOSE 3000

# Use an entrypoint script to start both Redis and your Node.js app
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]
