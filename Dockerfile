# ============================================
# GoRide Web App — Docker Image
# Multi-stage build untuk production
# ============================================

# Stage 1: BUILD
# Guna Node.js untuk compile React app
FROM node:20-alpine AS builder

# Set working directory dalam container
WORKDIR /app

# Copy package files dulu (untuk cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy semua source code
COPY . .

# Build production bundle
# Pass build args untuk Supabase credentials
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# ─────────────────────────────────────────
# Stage 2: PRODUCTION
# Guna nginx untuk serve static files
# Image size jauh lebih kecil dari node image
FROM nginx:alpine AS production

# Copy built files dari stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
