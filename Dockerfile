# Use official Node.js image
FROM node:20.10.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]