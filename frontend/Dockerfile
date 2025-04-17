FROM node:18-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build and start
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
