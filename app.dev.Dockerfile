# The minimal baseline we need for Nodejs
FROM node:14.16.1-alpine

WORKDIR /app
#/usr/src/app
COPY package.json .

# bash for debugging with `docker exec`
RUN apk update && apk add bash 
RUN npm install && npm install nodemon -g

COPY . .

EXPOSE 3000

# ENTRYPOINT ["node"]

CMD ["nodemon", "App.js"]