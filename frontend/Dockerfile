# Stage 1: Build React App (Minification)
FROM node:20-alpine as minify

WORKDIR /opt/server

# Copy package.json and install dependencies
COPY package.json ./
COPY src ./src
COPY public ./public

RUN npm install --production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/* \
    && rm -rf /etc/nginx/nginx.conf \
    && rm -rf /etc/nginx/conf.d/default.conf

# Copy the build directory from the minify stage to the Nginx HTML directory
COPY --from=minify /opt/server/build /usr/share/nginx/html/

