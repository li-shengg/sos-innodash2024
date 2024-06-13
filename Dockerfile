FROM node:18.18.2

# Set the working directory inside the container
WORKDIR /usr/src/app/sos-innodash2024

# Install build tools and dependencies for node-gyp
RUN apt-get update \
    && apt-get install -y build-essential python3

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire sos-innnodash2024 directory to the working directory
COPY . .

# Change working directory to the Database folder
WORKDIR /usr/src/app/sos-innodash2024/Database

# Run prisma generate to generate Prisma client
RUN npx prisma generate

# Change working directory back to the main app directory
WORKDIR /usr/src/app/sos-innodash2024

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
