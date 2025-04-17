FROM node:18-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build and expose
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
