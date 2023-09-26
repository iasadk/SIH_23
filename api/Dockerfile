FROM node:18-alpine as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm install
RUN npm install pm2 -g

EXPOSE 5509

CMD ["pm2-runtime","start","./src/app.js"]
