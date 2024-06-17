FROM node:20.12.2-bookworm-slim

# Create app directory
COPY . /app

WORKDIR /app

RUN npm install -g @nestjs/cli

EXPOSE 3000

CMD ["npm", "run", "start:dev"]