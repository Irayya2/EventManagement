# Phase 4 Frontend Dockerization
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies strictly 
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the Next.js files and build
COPY . .
RUN npm run build

# Create production runner image
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy only the built production files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
