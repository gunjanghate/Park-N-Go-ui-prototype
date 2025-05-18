# Use official Node.js image as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code into the container
COPY . .

# Expose the Vite default port (5173)
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev"]
