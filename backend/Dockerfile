FROM node:20-alpine

# Install bash and necessary dependencies
RUN apk add --no-cache bash

# Create application user
RUN mkdir /opt/server 
RUN adduser -D -h /opt/server crud
RUN chown crud:crud -R /opt/server

# Set working directory
WORKDIR /opt/server

# Copy files
COPY package.json ./ 
COPY *.js ./ 
COPY .env ./
RUN npm install --production --legacy-peer-deps
USER crud
EXPOSE 8080
CMD ["node", "index.js"]
