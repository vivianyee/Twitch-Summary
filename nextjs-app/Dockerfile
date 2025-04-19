# Use the official Node.js image from Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port that Next.js will run on (3000)
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]