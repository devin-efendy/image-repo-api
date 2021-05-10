# image-repo-shopify-f2021

The purpose of this application to store images inside a _repository_. User can also search all images that are uploaded.

**Postman** is recommended to test the application. There is a Postman requests collection and test images inside `/Postman`.

## Endpoint

`/search` - return all images inside the repository

`/add` - upload an image into the repository


## Running the application locally

---

### **Pre-requisite: you need to have Node and Docker installed on your machine**

Once you have Node instaleed run `npm install`

Then, to start the application

```
docker-compose up -d
```

> `-d`: is for running the container in detached mode

Executing `docker ps -a` should give you this output:

```
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS                      NAMES
06510035597b   image-repo-app   "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:3000->3000/tcp     image-repo
6af9478e55aa   mongo            "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:27017->27017/tcp   image-repo-db
97959ea21cdd   mongo            "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:27018->27017/tcp   image-repo-test-db
```

To stop all containers:

```
docker-compose stop
```

To stop and remove all containers:

```
docker-compose down -v
```

> `-v`: delete all named volumes

## Running the test

---

You need to have the containers running (You don't need this command if you already have all the containers running)

```
docker-compose up -d
```

> `-d`: is for running the container in detached mode

Then, to run the test

```
npm test
```

## Others

---

To remove all uploaded images run:

```
npm run rmuploads
```

This command will delete all the files inside `public/uploads`
