# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json file into the container at /app
COPY package.json /app

COPY index.js /app

# Install any dependencies in package.json
RUN npm install

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]