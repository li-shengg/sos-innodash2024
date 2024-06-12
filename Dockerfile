# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY src /app

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "index.js"]