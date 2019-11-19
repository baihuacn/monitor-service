#Dockerfile
FROM node:10.17.0-alpine
MAINTAINER renjunlin
EXPOSE 7001
COPY . .
RUN npm install --production
CMD npm start
