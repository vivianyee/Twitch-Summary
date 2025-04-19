# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Install ffmpeg and yt-dlp
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && npm install -g yt-dlp \
    && apt-get clean

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app's code to the container
COPY . .

# Expose the port the app will run on (default is 3000 for Next.js)
EXPOSE 3000

# Command to run the app (use npm run dev for development mode)
CMD ["npm", "run", "dev"]