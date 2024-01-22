FROM node:16.14-alpine
WORKDIR /app-backend
COPY package*.json ./
RUN npm install
COPY . .
COPY src/database/config/database.ts ./src/database/config/
EXPOSE 3001
ENTRYPOINT [ "npm", "run" ]
CMD ["dev"]