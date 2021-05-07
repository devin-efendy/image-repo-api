# image-repo-shopify-f2021

## Running the application locally

Pre-requisite: you need to have Node and Docker installed on your machine

Run `npm install` 

To start the application
```
docker-compose up -d
```
> `-d`: is for running the container in detached mode

To stop all containers:
```
docker-compose stop
```

To remove all containers:
```
docker-compose down -v
```
> `-v`: delete all named volumes